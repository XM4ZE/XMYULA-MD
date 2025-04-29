let handler = async (m, { conn, usedPrefix, text, command }) => {
let user = global.db.data.users[m.sender]
let skill = ["swordmaster", "necromancer", "witch", "Archer", "magicswordmaster", "thief", "shadow"]
let bintang = {
"satu": "⭐",
"dua": "⭐⭐",
"tiga": "⭐⭐⭐",
"empat": "⭐⭐⭐⭐",
"lima": "⭐⭐⭐⭐⭐",
"Enam": "⭐⭐⭐⭐⭐⭐"
}
   let skil = text.trim().toLowerCase() // to filter text
   if (!skill.includes(skil)) throw `Select *skill🃏* what do you want/pilih skill apa yg kamu inginkan:

${skill.map(skil => `› ${skil}`).join('\n')}

How To use/Cara menggunakan:
${usedPrefix + command} <nameskill>
     
Example/Contoh:
${usedPrefix + command} necromancer
`.trim()
    if (user.skill == "") {
        user.skill = skil
        m.reply(`Anda telah memilih Skill ${skil}`)
    } else if (user.skill) {
        m.reply(`Anda Sudah Punya skill ${user.skill} Tidak bisa diganti`)
    }
}
handler.help = ['selectskill <type>']
handler.tags = ['rpg']
handler.command = /^(slectskill|selectskill)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler