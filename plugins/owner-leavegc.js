let handler = async (m, { conn, args, command, text }) => {
	let group = text ? text : m.chat
        await conn.reply(group, 'Byee Bot akan pergi , , ! (≧ω≦)ゞ', null) 
        await  conn.groupLeave(group)
        m.reply('S u k s e s')
        }
handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i

handler.rowner = true

export default handler