let handler = async (m, { conn, usedPrefix }) => {
	let botol = global.db.data.users[m.sender].botol
	let kardus = global.db.data.users[m.sender].kardus
	let kaleng = global.db.data.users[m.sender].kaleng
	let gelas = global.db.data.users[m.sender].gelas
	let plastik = global.db.data.users[m.sender].plastik

	let ndy = `乂 *Isi Karung Mu*
    
❃ _*Botol*_ = ${botol}
❃ _*Kardus*_ = ${kardus}
❃ _*Kaleng*_ = ${kaleng}
❃ _*Gelas*_ = ${gelas}
❃ _*Plastik*_ = ${plastik}
 `
await m.reply(ndy)
}

handler.help = ['Karung']
handler.tags = ['rpg']
handler.command = /^(karung)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler
