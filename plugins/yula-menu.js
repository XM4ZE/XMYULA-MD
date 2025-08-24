import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import { getDevice } from 'baileys'
import os from 'os'
import axios from 'axios' 
import fs from 'fs'
import { toAudio } from '../lib/converter.js'

let tags = {
  'main': 'Main Menu',
  'digiflazz': 'Topup Menu',
  'jadibot': 'JadiBot Menu',
  'ai': 'Ai Menu',
  'genshin': 'Genshin Menu',
  'hsr': 'Honkai SR Menu',
  'adminry': 'Admin Menu',
  'group': 'Groups Menu',
  'store': 'Store Menu',
  'game': 'Games Menu',
  'rpg': 'RPG Menu',
  'xp': 'Exp & Limit Menu',
  'sticker': 'Sticker Menu',
  'kerang': 'Kerang Menu',
  'quotes': 'Quotes Menu',
  'fun': 'Fun Menu',
  'pacaran': 'Pacaran Menu',
  'anime': 'Anime & Manga Menu',
  'vote': 'Voting Menu',
  'absen': 'Absen Menu',
  'premium': 'Premium Menu',
  'nsfw': 'Nsfw Menu',
  'internet': 'Internet Menu',
  'news': 'News Menu',
  'downloader': 'Downloader Menu',
  'search': 'Searching Menu',
  'tools': 'Tools Menu',
  'primbon': 'Primbon Menu',
  'nulis': 'Mager Nulis & Logo',
  'audio': 'Audio Menu',
  'maker': 'Maker Menu',
  'database': 'Database Menu',
  'islamic': 'Islamic Menu',
  'info': 'Info Menu',
  'owner': 'Owner Menu', 
}

const defaultMenu = {
  before: `Hallo %name!\nSaya adalah Bot Otomatis. Saya dapat membantu Anda mencari data, mendownload data, dan mengelola data dengan mudah dan efisien. Saya siap membantu Anda 24/7!

*「  I N F O  K A M U  」*
 •  *Premium :* %prems
 •  *Limits :* %limit
 •  *Level Rpg :* %level
 •  *Role Rpg :* %role 
 •  *Exp :* %totalexp
 
*「  I N F O  B O T  」*
 •  *Mode :* %mode
 •  *Me :* %me
 •  *Version :* %version
 •  *Request :* %rtotalreg
 •  *Platform :* %platform
%readmore
`.trimStart(),
  header: '\`— %category\`',
  body: '•  %cmd',
  footer: '',
  after: `Powered By Maximus © 2019 - 2024`,
}

let handler = async (m, { conn, usedPrefix, command, __dirname, text }) => {
  try {
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let tag = `@${m.sender.split`@`[0]}`
    let user = global.db.data.users[m.sender]
    let limit = user.premiumTime >= 1 ? 'Unlimited' : user.limit
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Yes': 'No'}`
    let name = `@${m.sender.split`@`[0]}`
    let status = `${m.sender.split`@`[0] == info.nomorown ? 'Developer' : user.premiumTime >= 1 ? 'Premium User' : user.level >= 1000 ? 'Elite User' : 'Free User'}`
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let year = d.toLocaleDateString(locale, { year: 'numeric' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let platform = os.platform()
    let mode = global.opts['self'] ? 'Private' : 'Publik'
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by wa.me/${global.info.nomorown}\n`) + defaultMenu.after
    
    // Handle menu type based on text input
    let menuType = text ? text.toLowerCase() : ''
    let menuText = []
    
    if (!menuType) {
      // Show available tags when no argument is given
      menuText = [
        before,
        `\`Daftar Menu Yang Tersedia:\`\n• \`\`\`${usedPrefix + command} all\`\`\`\n` +
        Object.entries(tags).map(([tag]) => `• \`\`\`${usedPrefix + command} ${tag}\`\`\``).join('\n') +
        `\n\n\`Contoh penggunaan: ${usedPrefix + command} sticker\``,
        `\n` + after
      ]
    } else if (menuType === 'all') {
      // Show all menus when 'all' is specified
      menuText = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '🅛' : '')
                  .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ]
    let response = await axios.get(vn, { responseType: 'arraybuffer' })
    let media = Buffer.from(response.data, 'binary')
    let audio = await toAudio(media, 'mp4')
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
    } else if (tags[menuType]) {
      // Show specific menu when valid tag is specified
      menuText = [
        before,
        header.replace(/%category/g, tags[menuType]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(menuType) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🅛' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n'),
        after
      ]
    } else {
      // Show error message when invalid tag is specified
      menuText = [
        before,
        `Menu "${text}" tidak ditemukan!!!.\n\n\`Daftar menu yang tersedia:\`\n• \`\`\`${usedPrefix + command} all\`\`\`\n` +
        Object.entries(tags).map(([tag]) => `• \`\`\`${usedPrefix + command} ${tag}\`\`\``).join('\n'),
        `\n` + after
      ]
    }
    
    let textToSend = menuText.join('\n')
    let replace = {
      '%': '%',
      p: usedPrefix, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, year, dateIslamic, time, totalreg, rtotalreg, role, prems, tag, status, wib, platform, mode, 
      readmore: readMore
    }
    textToSend = textToSend.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let xm4ze = await( await fetch(xmenus)).json()
    let thumb = xm4ze[Math.floor(Math.random() * xm4ze.length)]
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${conn.getName(conn.user.jid)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${conn.getName(conn.user.jid)}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}

if (!/all/.test(command) && await getDevice(m.key.id) == 'android') {
  if (!db.data.settings[conn.user.jid].thumbnail) {
    conn.sendMessage(m.chat, {
      text: textToSend,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.info.channel,
          serverMessageId: null,
          newsletterName: global.info.namechannel,
        },
        externalAdReply: { 
          showAdAttribution: false, 
          title: global.info.namebot + ` © ` + year, 
          body: '', 
          thumbnailUrl: global.thum ? thum : thumb, 
          mediaType: 1, 
          sourceUrl: gcbot,
          renderLargerThumbnail: true 
        }
      },
    }, {
      quoted: m
    });
  } else {
      conn.sendMessage(m.chat, { text: textToSend, contextInfo: { mentionedJid: [m.sender] }}, { quoted: m });
  }
} else await conn.sendMessage(m.chat, { 
          image: { 
             url: "https://files.catbox.moe/morbwn.mp4" 
             }, 
             fileName: wm, 
             caption: textToSend, 
                 contextInfo: { 
                     mentionedJid: [m.sender] 
                 }
          }, { quoted: m });
  } catch (e) {
    throw e
  }
};

handler.command = /^(menu|help|perintah)$/i
handler.register = true;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function wish() {
    let wishloc = ''
  const time = moment.tz('Asia/Jakarta').format('HH')
  wishloc = ('Hi')
  if (time >= 0) {
    wishloc = ('Selamat Malam')
  }
  if (time >= 4) {
    wishloc = ('Selamat Pagi')
  }
  if (time >= 11) {
    wishloc = ('Selamat Siang')
  }
  if (time >= 15) {
    wishloc = ('️Selamat Sore')
  }
  if (time >= 18) {
    wishloc = ('Selamat Malam')
  }
  if (time >= 23) {
    wishloc = ('Selamat Malam')
  }
  return wishloc
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
