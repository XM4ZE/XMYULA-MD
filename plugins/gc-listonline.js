const handler = async (m, { conn }) => {
  const chatID = m.chat;
  const onlineMembers = [];

  const members = await conn.groupMetadata(chatID);
  for (const member of members.participants) {
    console.log('Member:', member);
    if (member.id && member.id && conn.user.jid && member.id.includes('@s.whatsapp.net')) {
      onlineMembers.push(`- Name: ${conn.getName(member.id.split(`@`)[0] + `@s.whatsapp.net`)}\nwa.me/${member.id.split('@')[0]}\n`);
    }
  }

  if (onlineMembers.length > 0) {
    const onlineList = onlineMembers.join('\n');
    m.reply(`Daftar anggota yang sedang online:\n${onlineList}`);
  } else {
    m.reply('Tidak ada anggota yang sedang online.');
  }
};

handler.command = handler.help = ['listonline'];
handler.tags = ['group'];
handler.group = true

export default handler;