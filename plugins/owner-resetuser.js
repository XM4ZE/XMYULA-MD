import fetch from 'node-fetch'
let handler = async (m) => {
if (global.xmaze.some(number => m.sender.includes(number))) {
let arr = Object.entries(db.data.users).filter(user => !user[1].registered && !user[1].unreg).map(user => user[0])
let boy = `Sukses Menghapus ${arr.length} User`
for (let x of arr) delete db.data.users[x]
await m.reply(boy)
	} else {
        m.reply('This command is for *R-OWNER* Only')
  }
}
handler.help = ['resetuser']
handler.tags = ['owner']
handler.command = /^(resetuser)$/i
handler.owner = true
export default handler