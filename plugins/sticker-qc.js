import axios from 'axios'
import { Sticker } from 'wa-sticker-formatter'
import uploadFile from '../lib/uploadFile.js'
import sharp from 'sharp';
let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        let txt = text ? text: typeof q.text == 'string' ? q.text: ''
        let avatar = await conn.profilePictureUrl(q.sender, 'image').catch(_ => 'https://files.catbox.moe/rnc4sa.jpg')
        avatar = /tele/.test(avatar) ? avatar: await uploadFile((await conn.getFile(avatar)).data)
        if (!/image\/(jpe?g|png|webp)/.test(mime)) {
            let req = await fakechat(txt, q.name, avatar)
            let stiker = await createSticker(req, false, stickpack, stickauth)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            let img = await q.download()
            let decodedBuffer = await sharp(img).toFormat('png').toBuffer();
            let url = await uploadFile(decodedBuffer)
            let maximus = txt ? txt : '';
            let req = await fakechatImg(url, txt, q.name, avatar)
            let stiker = await createSticker(req, false, stickpack, stickauth)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        }
    } catch (e) {
        throw e
    }
}
handler.help = ['qc'].map(v => v + ' <text & reply>')
handler.tags = ['sticker']
handler.command = /^(qc|quotely)$/i
handler.premium = false 
handler.limit = true;
handler.register = true;

export default handler;

async function fakechat(text, name, url) {
    let body = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 512,
        "scale": 2,
        "messages": [{
        "avatar": true,
        "from": {
            "first_name": name,
            "language_code": "en",
            "name": name,
            "photo": {
            "url": url
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://qc.botcahx.eu.org/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function fakechatImg(url, text, name, avatar) {
    let body = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
        "entities": [],
        "media": {
            "url": url
        },
        "avatar": true,
        "from": {
            "id": 1,
            "name": name,
            "photo": {
            "url": avatar
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://qc.botcahx.eu.org/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function createSticker(req, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: global.packname,
        author: global.author,
        quality
    }
return (new Sticker(req ? req: url, stickerMetadata)).toBuffer()
}