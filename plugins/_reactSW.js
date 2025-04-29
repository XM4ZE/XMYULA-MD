export async function before(msg, { isAdmin, isBotAdmin }) {
  try {
    const emojis = [
    "😊", "👍", "🤩", "🎉", "😍",
    "🤔", "👀", "😳", "🤷‍♂️", "😎", 
    "🇵🇸", "🥵", "🥰", "⭐", "😭"
    ];

    const likeEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    if (!msg || msg.key.remoteJid !== 'status@broadcast') {
      return false;
    }

    if (msg.key.remoteJid === "status@broadcast") {
      const decodedJid = await conn.decodeJid(conn.user.id);
      await conn.sendMessage(msg.key.remoteJid, {
        react: {
          key: msg.key,
          text: likeEmoji,
        },
      }, {
        statusJidList: [msg.key.participant, decodedJid],
      });
    }

  } catch (error) {
    console.error("Failed to process message:", error.message || "Unknown error");
    if (msg.quoted && msg.quoted.text) {
      await msg.reply(msg.quoted.text);
    } else {
      await this.reply(conn.user.id, "Failed to process message: " + (error.message || "Unknown error"), msg, { mentions: [sender] });
    }
  }
  return true;
}