import axios from 'axios'
import cheerio from 'cheerio'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Nama Kamu!\n\nContoh:\n${usedPrefix + command} Wahyu`)
    let res = await artinama(text)
    if (!res.status) throw res.message
    let cap = `
*Nama:* ${res.message.nama}
*Arti:* ${res.message.arti}
`.trim()
    m.reply(cap)
}
handler.help = ['artinama'].map(v => v + ' <query>')
handler.tags = ['primbon']
handler.command = /^(artinama)$/i
handler.limit = true;
handler.register = true;

export default handler;

async function artinama(value) {
    return new Promise((resolve, reject) => {
        axios.get('https://primbon.com/arti_nama.php?nama1='+value+'&proses=+Submit%21+')
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let fetchText = $('#body').text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        nama: value,
                        arti: fetchText.split('memiliki arti: ')[1].split('Nama:')[0].trim(),
                        catatan: 'Gunakan juga aplikasi numerologi Kecocokan Nama, untuk melihat sejauh mana keselarasan nama anda dengan diri anda.'
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: `Tidak ditemukan arti nama "${value}" Cari dengan kata kunci yang lain.`
                }
            }
            resolve(hasil)
        })
    })
}