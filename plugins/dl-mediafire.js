import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Please send mediafire url!!*`
    try {
    const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/mediafire?url=${args[0]}&apikey=${btc}`);
    const json = await response.data;
    if (!json.result) throw 'Failed to fetch!';
    let { url, filename, ext, upload_date: aploud, filesize, filesizeH } = json.result;
    let caption = `*—  M E D I A F I R E*

*• Name:* \`${filename}\`
*• Mime:* \`${ext}\`
*• Size:* \`${filesizeH}\`

#${wm}`.trim()
    conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                forwardingScore: 9999,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.info.channel,
                   serverMessageId: null,
                   newsletterName: global.info.namechannel,
                   },
                   externalAdReply: {
                   title: `${filename} SEDANG DI KIRIM`,
                   body: ``,
                   thumbnailUrl: 'https://telegra.ph/file/a6acf193edac1f64d7e1a.jpg',
                   sourceUrl: args[0],
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, {});
    if (/mb|gb/i.test(filesizeH) && parseFloat(filesizeH.replace(/mb|gb/i, '')) > 200) return m.reply('Size too big')
    await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })  
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, eror, m)
  }
}
handler.help = ['mediafire'].map(v => v + ' *⧼url⧽*')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i
handler.limit = true;
handler.register = true;

export default handler