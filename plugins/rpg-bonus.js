let handler = async (m, { conn, usedPrefix, text }) => {
    
	let time = global.db.data.users[m.sender].lastbonus + 86400000
    if (new Date - global.db.data.users[m.sender].lastbonus < 86400000) throw `Kamu Sudah Ambil Bonus Hari Ini\nTunggu selama ${msToTime(time - new Date())} lagi`
	let money = `${Math.floor(Math.random() * 50000000)}`.trim()
	global.db.data.users[m.sender].money += money * 1
	global.db.data.users[m.sender].lastbonus = new Date * 1
  m.reply(`Selamat Kamu Mendapatkan Bonus : \n+${money} Money`)
}
handler.help = ['bonus']
handler.tags = ['rpg', 'premium']
handler.command = /^(bonus)/i
handler.register = true
handler.group = true
handler.premium = true
handler.rpg = true
export default handler 

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}