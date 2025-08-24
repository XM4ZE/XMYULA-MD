process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import "./config.js";
import { createRequire as createRequire } from "module";
import path, { join as pathJoin } from "path";
import { fileURLToPath as fileURLToPath, pathToFileURL as pathToFileURL } from "url";
import { platform as processPlatform } from "process";
import * as WebSocket from "ws";
import { 
  readdirSync as readDirSync, 
  statSync as statSync, 
  unlinkSync as unlinkSync, 
  existsSync as existsSync, 
  readFileSync as readFileSync, 
  watch as watchFile 
} from "fs";
import yargs from "yargs";
import { spawn as spawnProcess } from "child_process";
import _ from "lodash";
import { clear as clearConsole } from "console";
import cfonts from "cfonts";
import syntaxError from "syntax-error";
import * as os from "os";
import chalk from "chalk";
import { format as formatUtil } from "util";
import { makeWASocket as makeWASocket, protoType as protoType, serialize as serialize } from "./lib/simple.js";
import { Low as LowDB, JSONFile as JSONFile } from "lowdb";
import pino from "pino";
import { 
  clearsession, 
  connectionUpdate, 
  createConnection,
  handlePairing,
  messageTemplates
} from "./lib/connection.js";

global.__filename = function filename(url = import.meta.url, isWindows = "win32" !== processPlatform) {
  return isWindows 
    ? /file:\/\/\//.test(url) 
      ? fileURLToPath(url) 
      : url 
    : pathToFileURL(url).toString();
};

global.__dirname = function dirname(url) {
  return path.dirname(global.__filename(url, true));
};

global.__require = function require(url = import.meta.url) {
  return createRequire(url);
};

const { CONNECTING: WS_CONNECTING } = WebSocket;
const { chain: lodashChain } = _;

process.env.PORT || process.env.SERVER_PORT;

protoType();
serialize();

global.API = (apiName, endpoint = "/", query = {}, apiKeyName) => {
  const baseUrl = apiName in global.APIs ? global.APIs[apiName] : apiName;
  const queryString = query || apiKeyName 
    ? "?" + new URLSearchParams({
        ...query,
        ...(apiKeyName ? { [apiKeyName]: global.APIKeys[apiName in global.APIs ? global.APIs[apiName] : apiName] } : {})
      })
    : "";
  return baseUrl + endpoint + queryString;
};

global.timestamp = { start: new Date() };
const currentDir = global.__dirname(import.meta.url);

global.opts = new Object(
  yargs(process.argv.slice(2))
    .exitProcess(false)
    .parse()
);

global.prefix = new RegExp(
  "^[" + 
  (opts.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-")
    .replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + 
  "]"
);

global.db = new LowDB(
  /https?:\/\//.test(opts.db || "") 
    ? new cloudDBAdapter(opts.db)
    : /mongodb(\+srv)?:\/\//i.test(opts.db)
      ? opts.mongodbv2
        ? new mongoDBV2(opts.db)
        : new mongoDB(opts.db)
      : new JSONFile((opts._[0] ? opts._[0] + "_" : "") + "database.json")
);

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(resolve => {
      const interval = setInterval(async () => {
        if (!global.db.READ) {
          clearInterval(interval);
          resolve(global.db.data == null ? await global.loadDatabase() : global.db.data);
        }
      }, 1000);
    });
  }

  if (global.db.data === null) {
    global.db.READ = true;
    await global.db.read().catch(console.error);
    global.db.READ = null;
    
    global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      banned: {},
      sticker: {},
      settings: {},
      ...(global.db.data || {})
    };
    
    global.db.chain = lodashChain(global.db.data);
  }
};

await loadDatabase();
global.authFile = `${opts._[0] || "sessions"}`;
console.log(`Load AuthFile from ${global.authFile}`);

const { 
  connectionOptions: connectionOptions, 
  state: connectionState, 
  saveCreds: saveCredentials 
} = await createConnection(global.authFile, global.opts);

global.conn = await makeWASocket(connectionOptions);
conn.isInit = false;

// Apply message templates
Object.assign(conn, {
  welcome: messageTemplates.welcome,
  bye: messageTemplates.bye,
  spromote: messageTemplates.promote,
  sdemote: messageTemplates.demote,
  sDesc: messageTemplates.desc,
  sSubject: messageTemplates.subject,
  sIcon: messageTemplates.icon,
  sRevoke: messageTemplates.revoke
});

if (!opts.test) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write().catch(console.error);
    }
  }, 60000);
}

process.on("uncaughtException", console.error);

let isHandlerInitializing = true;
let handlerModule = await import("./handler.js");

global.reloadHandler = async function reloadHandler(restartConn) {
  try {
    const newHandler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (newHandler && Object.keys(newHandler).length) {
      handlerModule = newHandler;
    }
  } catch (error) {
    console.error(error);
  }

  if (restartConn) {
    const currentChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: currentChats });
    isHandlerInitializing = true;
  }

  if (!isHandlerInitializing) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }

  conn.handler = handlerModule.handler.bind(global.conn);
  conn.participantsUpdate = handlerModule.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handlerModule.groupsUpdate.bind(global.conn);
  conn.onDelete = handlerModule.deleteUpdate.bind(global.conn);
  conn.connectionUpdate = (update) => connectionUpdate(update, conn);
  conn.credsUpdate = saveCredentials.bind(global.conn);

  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);

  isHandlerInitializing = false;
  return true;
};

const pluginsDir = global.__dirname(pathJoin(currentDir, "./plugins/index"));
const isPluginFile = (filename) => /\.js$/.test(filename);

global.plugins = {};

async function loadPlugins() {
  for (let filename of readDirSync(pluginsDir).filter(isPluginFile)) {
    try {
      let filePath = global.__filename(pathJoin(pluginsDir, filename));
      const plugin = await import(filePath);
      global.plugins[filename] = plugin.default || plugin;
    } catch (error) {
      conn.logger.error(error);
      delete global.plugins[filename];
    }
  }
}

loadPlugins()
  .then(() => {
    const pluginCount = Object.keys(global.plugins).length;
    console.log(chalk.bold.green(`Plugins Total : ${pluginCount} Plugins`));
  })
  .catch(console.error);

global.reload = async function reloadPlugin(event, filename) {
  if (isPluginFile(filename)) {
    let filePath = global.__filename(pathJoin(pluginsDir, filename), true);
    
    if (filename in global.plugins) {
      if (!existsSync(filePath)) {
        conn.logger.warn(`Deleted plugin '${filename}'`);
        return delete global.plugins[filename];
      }
      conn.logger.info(`Reloading plugin '${filename}'`);
    } else {
      conn.logger.info(`Loading new plugin '${filename}'`);
    }
    
    const errorCheck = syntaxError(readFileSync(filePath), filename, {
      sourceType: "module",
      allowAwaitOutsideFunction: true
    });
    
    if (errorCheck) {
      conn.logger.error(`Syntax error while loading '${filename}'\n${formatUtil(errorCheck)}`);
      return;
    }
    
    try {
      const plugin = await import(`${global.__filename(filePath)}?update=${Date.now()}`);
      global.plugins[filename] = plugin.default || plugin;
    } catch (error) {
      conn.logger.error(`Error loading plugin '${filename}'\n${formatUtil(error)}`);
    } finally {
      global.plugins = Object.fromEntries(
        Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
      );
    }
  }
};

Object.freeze(global.reload);
watchFile(pluginsDir, global.reload);
await global.reloadHandler();
await handlePairing(conn, opts);

(async function quickTest() {
  const testResults = await Promise.all([
    spawnProcess("ffmpeg"),
    spawnProcess("ffprobe"),
    spawnProcess("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]),
    spawnProcess("convert"),
    spawnProcess("magick"),
    spawnProcess("gm"),
    spawnProcess("find", ["--version"])
  ].map(cmd => Promise.race([
    new Promise(resolve => {
      cmd.on("close", code => resolve(code !== 127));
    }),
    new Promise(resolve => {
      cmd.on("error", () => resolve(false));
    })
  ])));
  
  const [
    ffmpeg, 
    ffprobe, 
    ffmpegWebp, 
    convert, 
    magick, 
    gm, 
    find
  ] = testResults;
  
  global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  };
  
  Object.freeze(global.support);
  
  if (!support.ffmpeg) {
    conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
  }
  
  if (support.ffmpeg && !support.ffmpegWebp) {
    conn.logger.warn("Stickers may not animate without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)");
  }
  
  if (!support.convert && !support.magick && !support.gm) {
    conn.logger.warn("Stickers may not work without imagemagick if libwebp on ffmpeg isn't installed (pkg install imagemagick)");
  }
})().then(() => conn.logger.info("✓ Quick Test Done"))
  .catch(console.error);