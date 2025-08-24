import fs from 'fs'
import { S_WHATSAPP_NET } from 'baileys'
import { Jimp } from 'jimp'
let handler = async (m, { conn, command, usedPrefix }) => {
var q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || '';
if (/^image/.test(mime) && !/webp/.test(mime)) {
var media = await q.download()
const data = await generateProfilePicture(media)
      await conn.query({
            tag: 'iq',
            attrs: {
            target: m.chat,
		    to: S_WHATSAPP_NET,
            type:'set',
            xmlns: 'w:profile:picture'
            },
            content: [
            {
            tag: 'picture',
            attrs: { type: 'image' },
            content: data.img
            }
            ]
      })
            m.reply(`DONE ✅`)
      } else {
         m.reply(`Reply to image or send image with caption ${usedPrefix}${command}`)
      }
}
handler.help = ['setppgc'].map(v => v + ' <caption / reply image>')
handler.tags = ['adminry']
handler.command = /^(setppgc|setppgrup|setppgroup)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler 

async function generateProfilePicture(buffer) {
  const jimp_1 = await Jimp.read(buffer);

  const width = jimp_1.bitmap.width;
  const height = jimp_1.bitmap.height;

  let minz;
  if (width > height) {
    minz = await jimp_1.resize({
      w: 720,
      h: Jimp.AUTO, 
      fit: Jimp.RESIZE_BILINEAR
    });
  } else {
    minz = await jimp_1.resize({
      w: Jimp.AUTO,
      h: 720,
      fit: Jimp.RESIZE_BILINEAR
    });
  }

  const jimp_2 = await Jimp.read(await minz.getBuffer("image/jpeg"));

  return {
    img: await minz.getBuffer("image/jpeg")
  };
}