let handler = async (m, { conn, usedPrefix }) => {
    
	let banteng = global.db.data.users[m.sender].banteng
	let harimau = global.db.data.users[m.sender].harimau
	let gajah = global.db.data.users[m.sender].gajah
	let kambing = global.db.data.users[m.sender].kambing
	let panda = global.db.data.users[m.sender].panda
	let buaya = global.db.data.users[m.sender].buaya
	let kerbau = global.db.data.users[m.sender].kerbau
	let sapi = global.db.data.users[m.sender].sapi
	let monyet = global.db.data.users[m.sender].monyet
	let ayam = global.db.data.users[m.sender].ayam
	let babihutan = global.db.data.users[m.sender].babihutan
	let babi = global.db.data.users[m.sender].babi
    let caption = `📮 Kandang Kamu
${banteng ? `
🐂 Banteng: ${banteng}` : ''} ${harimau ? `
🐅 Harimau: ${harimau}` : ''} ${gajah ? `
🐘 Gajah: ${gajah}` : ''} ${kambing ? `
🐐 Kambing: ${kambing}` : ''} ${panda ? `
🐼 Panda: ${panda}` : ''} ${buaya ? `
🐊 Buaya : ${buaya}` : ''} ${kerbau ? `
🐃 Kerbau: ${kerbau}` : ''} ${sapi ? `
🐮 Sapi: ${sapi}` : ''} ${monyet ? `
🐒 Monyet: ${monyet}` : ''} ${ayam ? `
🐓 Ayam: ${ayam}` : ''} ${babi ? `
🐖 Babi: ${babi}` : ''} ${babihutan ? `
🐗 Babi Hutan ${babihutan}` : ''}
`.trim()
m.reply(caption)
}
handler.help = ['kandang']
handler.tags = ['rpg']
handler.command = /^(kandang)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler