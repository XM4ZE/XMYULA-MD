let handler = async (m, { conn }) => {

  try {
  if (m.message.extendedTextMessage) {
   var dataVideo = { ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage }
    conn.relayMessage(m.chat, dataVideo, {})
 } else {
    var dataVideo = { ptvMessage: m.message.videoMessage }
    conn.relayMessage(m.chat, dataVideo, {})
    }
  } catch (error) {
    console.error(error)

  }
}

handler.help = ['ptv']
handler.command = /^(ptv|ptvmessage)$/i
handler.tags = ['tools']

export default handler