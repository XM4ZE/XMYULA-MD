import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

/*============== GLOBAL APIKEY ==============*/
global.btc = 'API_KEY_BTC'

/*============== NOMOR ==============*/
global.info = {
	nomorbot: '62882257504889',
	nomorown: '6281283516246',
	namebot: 'XMCodes',
	nameown: 'MΛXIMUS',
	channel: '120363241570452835@newsletter',
	namechannel: 'XM4ZE | Whatsapp Bots'
}

/*============== OWNER ==============*/
global.owner = ['6281283516246', '6288225750488']
global.xmaze = ['6281283516246', '6288225750488']
global.mods = []
global.prems = []

/*============== API ==============*/
global.APIs = {
  TioXD: 'https://api.botcahx.eu.org'
} 

global.APIKeys = {
  'https://api.botcahx.eu.org': global.btc
}

/*============== WATERMARK ==============*/
global.wm = 'XMCodes'
global.author = 'XM4ZE'
global.stickpack = 'XMCodes'
global.stickauth = 'XM4ZE'
global.multiplier = 38 // The higher, The harder levelup

/*============== NO EDIT ==============*/
global.maxwarn = '2'
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

/*========== TEXT & THUMBNAIL ==========*/
global.nameown = 'Maximus Store'
global.waown = 'wa.me/6281283516246'
global.mail = 'maximusstoreindonesia@gmail.com'
global.fb = 'https://facebook.com/maximusstoreindonesia'
global.ig = 'https://instagram.com/maximusstore.id'
global.gcbot = 'https://whatsapp.com/channel/0029VaL28ZqFSAtCdSU5EX0M'
global.wait = '*Starting Processing . . .*'
global.eror = '*Failed to process . . .*\n\nLapor Owner dengan menulis \`.lapor\`\nReport Owner by writing \`.report\`'
global.qris = 'https://telegra.ph/file/f11ccd2ca8a5136aacfb3.jpg'
global.pricelist = '*Limit kamu habis. Kamu bisa order akses premium dengan menulis* \`.order\`'
global.thumvid = 'https://github.com/XM4ZE/DATABASE/raw/refs/heads/master/wallpaper/VID-20250116-WA0207.mp4'
// 'https://github.com/XM4ZE/DATABASE/raw/refs/heads/master/wallpaper/mommy.mp4' // Allmenu Video thumbnail
global.xmenus = 'https://raw.githubusercontent.com/XM4ZE/DATABASE/master/wallpaper/menus.json' // Json thumbnail simple menu
global.thum = 'https://telegra.ph/file/8ddbb1905c4f3357bf82c.jpg'

/*=========== AUDIO ALLMENU ===========*/
global.vn = 'https://github.com/XM4ZE/DATABASE/raw/master/wallpaper/XMcodes.mp3' // Allmenu audio

/*=========== TYPE DOCUMENT ===========*/
global.doc = {
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf',
    rtf: 'text/rtf'
}

/*========== HIASAN ===========*/
global.decor = {
	menut: '❏═┅═━–〈',
	menub: '┊•',
	menub2: '┊',
	menuf: '┗––––––––––✦',
	hiasan: '꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷',

	menut: '––––––『',
    menuh: '』––––––',
    menub: '┊☃︎ ',
    menuf: '┗━═┅═━––––––๑\n',
	menua: '',
	menus: '☃︎',

	htki: '––––––『',
	htka: '』––––––',
	haki: '┅━━━═┅═❏',
	haka: '❏═┅═━━━┅',
	lopr: 'Ⓟ',
	lolm: 'Ⓛ',
	htjava: '❃'
}

//'https://telegra.ph/file/f4f24dc6ce5247f6abb6d.png', 'https://telegra.ph/file/754c704194ef0d84c6419.jpg'

global.elainajpg = [
    'https://telegra.ph/file/3e43fcfaea6dc1ba95617.jpg',
    'https://telegra.ph/file/c738a9fc0722a59825cbb.mp4',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg',
    'https://telegra.ph/file/4018167852aef19651f46.jpg'
]
global.flaaa = [
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]
global.hwaifu = [
    'https://i.pinimg.com/originals/ed/34/f8/ed34f88af161e6278993e1598c29a621.jpg',
    'https://i.pinimg.com/originals/85/4d/bb/854dbbd30304cd69f305352f0183fad0.jpg',
    'https://i.pinimg.com/originals/32/2c/a4/322ca456fa2cdec4b717895a65adfa8d.jpg',
    'https://i.pinimg.com/originals/f2/dd/cc/f2ddccd5a1b89d2302cf75c6520c58dd.png',
    'https://i.pinimg.com/originals/aa/6b/df/aa6bdf98cbc9e1fc741c36682fa3e838.jpg',
    'https://i.pinimg.com/originals/88/46/88/884688def830c43648f88154836a8b05.jpg',
    'https://i.pinimg.com/originals/57/d9/20/57d920d58533915850b431bd0b8e1f1d.jpg',
    'https://i.pinimg.com/originals/46/ad/05/46ad0505d33a2c2359f84ed9b867a58c.jpg',
    'https://i.pinimg.com/originals/23/b7/fb/23b7fb922770e139a2a57b1a443a2180.jpg',
    'https://i.pinimg.com/originals/46/79/25/467925d52634fd098ab6890a23c33f30.jpg',
    'https://i.pinimg.com/originals/a4/a1/74/a4a1740e565f4205eb3f700e1936e064.jpg',
    'https://i.pinimg.com/originals/f9/8d/2c/f98d2c3f64e50ba6c8efd9fdc7cf0093.png',
    'https://i.pinimg.com/originals/29/a4/b4/29a4b4573f993d7d6abb45843f529892.jpg',
    'https://i.pinimg.com/originals/40/de/84/40de84ce2ee376d8fae8ff5863d6edb0.jpg',
    'https://i.pinimg.com/originals/80/4f/1a/804f1a05f9996c96a2d492b4854b7fd5.jpg'
]

/*============== EMOJI ==============*/
global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            atm: '💳',
            money: '💰',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            robo: '🤖',
            petfood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰',
            bibitanggur: '🌱',
            bibitjeruk: '🌿',
            bibitapel: '☘️',
            bibitmangga: '🍀',
            bibitpisang: '🌴',
            anggur: '🍇',
            jeruk: '🍊',
            apel: '🍎',
            mangga: '🥭',
            pisang: '🍌',
            botol: '🍾',
            kardus: '📦',
            kaleng: '🏮',
            plastik: '📜',
            gelas: '🧋',
            chip: '♋',
            umpan: '🪱',
            skata: '🧩'
        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
        if (!results.length) return ''
        else return emot[results[0][0]]
    }
}

//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})