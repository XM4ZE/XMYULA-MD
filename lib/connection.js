import { makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } from 'baileys';
import pino from 'pino';
import chalk from 'chalk';
import { readdirSync, unlinkSync } from 'fs';

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