import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, command) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4\/mp3/.test(mime)
  let link = await (uploadImage ? uploadImage : uploadFile)(media)
  let max = `
${link}
${media.length} Byte(s)
${isTele ? '(Tidak Ada Tanggal Kedaluwarsa)' : '(Tidak diketahui)'}
`

m.reply(max)

/*  conn.sendMessage(m.chat, {
                text: max,
                contextInfo: {
                    externalAdReply: {
                        title: "File-Uploader",
                        body: "",
                        thumbnailUrl: "https://raw.githubusercontent.com/XM4ZE/DATABASE/master/wallpaper/wallpaperbot/tourl.png",
                        sourceUrl: link,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            })*/
}
handler.help = ['tourl <reply image/video>']
handler.tags = ['tools']
handler.command = /^(tourl)$/i
handler.limit = true;
handler.register = true;

export default handler;