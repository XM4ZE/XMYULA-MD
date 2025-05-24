import { makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } from 'baileys';
import pino from 'pino';
import chalk from 'chalk';
import { readdirSync, unlinkSync, existsSync } from 'fs';
import readline from 'readline';

export const messageTemplates = {
  welcome: "*@user*\n*𝚑𝚊𝚜 𝚓𝚘𝚒𝚗𝚎𝚍 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙*\n\n𝙱𝚎𝚏𝚘𝚛𝚎 𝚌𝚑𝚊𝚝𝚝𝚒𝚗𝚐, 𝚍𝚘𝚗'𝚝 𝚏𝚘𝚛𝚐𝚎𝚝 𝚝𝚘 𝚛𝚎𝚊𝚍 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙 𝚛𝚞𝚕𝚎𝚜",
  bye: "*@user* *𝚑𝚊𝚜 𝚕𝚎𝚏𝚝 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙*",
  promote: "@user sekarang admin!",
  demote: "@user sekarang bukan admin!",
  desc: "Deskripsi telah diubah ke \n@desc",
  subject: "Judul grup telah diubah ke \n@subject",
  icon: "Icon grup telah diubah!",
  revoke: "Link group telah diubah ke \n@revoke"
};

export async function clearsession() {
  try {
    if (!existsSync('./sessions')) return;
    const filesToClear = readdirSync('./sessions').filter(file => file.startsWith('pre-key-'));
    filesToClear.forEach(file => {
      unlinkSync(`./sessions/${file}`);
    });
    console.log(chalk.bold.green('Session berhasil dibersihkan'));
  } catch (e) {
    console.error(chalk.red('Gagal membersihkan session:', e));
  }
}

export async function connectionUpdate(update, conn) {
  const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  if (connection == 'connecting') console.log(chalk.redBright('Activating Bot, Please wait a moment...'))
  if (connection == 'open') console.log(chalk.green('Connected'))
  if (isOnline == true) console.log(chalk.green('Active Status'))
  if (isOnline == false) console.log(chalk.red('Disconnected Status'))
  if (receivedPendingNotifications) console.log(chalk.yellow('Waiting for New Message'))
  if (connection == 'close') console.log(chalk.red('Connection lost & trying to reconnect...'))
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    console.log(chalk.red('Connecting...'))
    await global.reloadHandler(true)
  } 
  return false;
}

export async function handlePairing(conn, opts) {
  if (!conn.authState.creds.registered) {
    console.clear();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(chalk.bold.green("=============================================="));
    console.log(chalk.bold.yellow("           WHATSAPP BOT AUTHENTICATION          "));
    console.log(chalk.bold.green("=============================================="));
    
    const rl = readline.createInterface({ 
      input: process.stdin, 
      output: process.stdout 
    });
    
    const question = (query) => new Promise(resolve => rl.question(query, resolve));
    
    try {
      let phoneNumber;
      while (true) {
        console.log(chalk.bold.white("\nEnter WhatsApp number (example: 6281234567890):"));
        phoneNumber = await question(chalk.green("> "));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
        
        if (phoneNumber.match(/^\d{10,}$/)) break;
        console.log(chalk.bold.red("\nWrong number format! Use format 6281234567890"));
      }
      
      console.log(chalk.bold.blue("\nCreating authentication code..."));
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const pairingCode = await conn.requestPairingCode(phoneNumber);
      const formattedCode = pairingCode?.match(/.{1,4}/g)?.join("-") || pairingCode;
      
      console.clear();
      console.log(chalk.bold.green("=============================================="));
      console.log(chalk.bold.yellow("           WHATSAPP AUTHENTICATION CODE          "));
      console.log(chalk.bold.green("=============================================="));
      console.log(chalk.bold.white("\nNumber: ") + chalk.cyan(phoneNumber));
      console.log(chalk.bold.white("Code : ") + chalk.yellow.bold(formattedCode));
      console.log(chalk.bold.green("\nUsage Instructions:"));
      console.log(chalk.white("1. Make sure the WhatsApp number is active"));
      console.log(chalk.white("2. Open WhatsApp on your phone"));
      console.log(chalk.white("3. Go to Settings → Linked Devices"));
      console.log(chalk.white("4. Select 'Link a Device'"));
      console.log(chalk.white("5. Enter the code above within 3 minutes"));
      console.log(chalk.bold.green("\n=============================================="));
      
      conn.ev.on("connection.update", (update) => {
        if (update.connection === "open") {
          console.log(chalk.green("\nSuccessfully connected!"));
          rl.close();
        }
      });
    } catch (error) {
      console.error(chalk.red("\nAuthentication error:", error));
    } finally {
      rl.close();
    }
  }
}

export async function createConnection(authFile, opts) {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(authFile);
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
      version,
      logger: pino({
          level: 'silent'
      }),
      browser: Browsers.ubuntu('Chrome'),
      generateHighQualityLinkPreview: true,
      auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino().child({
              level: 'silent',
              stream: 'store'
          }))
      },
      patchMessageBeforeSending: (message) => {
          const requiresPatch = !!(
              message.buttonsMessage || message.templateMessage || message.listMessage
          );
          if (requiresPatch) {
              message = {
                  viewOnceMessage: {
                      message: {
                          messageContextInfo: {
                              deviceListMetadataVersion: 2,
                              deviceListMetadata: {},
                          },
                          ...message,
                      },
                  },
              };
          }
          return message;
      },
      defaultQueryTimeoutMs: undefined,
      syncFullHistory: false
    }

    return {
      state,
      saveCreds,
      version,
      connectionOptions
    };
  } catch (error) {
    console.error(chalk.red('Gagal membuat koneksi:', error));
    throw error;
  }
}