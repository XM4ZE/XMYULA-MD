let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    
    // Cek apakah pengguna memiliki hewan di kandang
    if (!user.banteng && !user.harimau && !user.gajah && !user.kambing && !user.panda && !user.buaya && !user.kerbau && !user.sapi && !user.monyet && !user.ayam && !user.babihutan && !user.babi) {
        return conn.reply(m.chat, 'Kamu belum memiliki hewan di kandang. Silakan berburu terlebih dahulu!', m)
    }
    
    // Cek jenis hewan yang akan dimasak
    let animal = m.text.split(' ')[1]
    if (!animal) return conn.reply(m.chat, `Gunakan perintah *${usedPrefix}masak <nama_hewan>*\nContoh: *${usedPrefix}masak ayam*`, m)
    
    // Cek apakah hewan yang dimasak dimiliki oleh pengguna
    if (!user[animal]) {
        return conn.reply(m.chat, `Kamu tidak memiliki ${animal} di kandangmu`, m)
    }
    
    // Inisialisasi hadiah exp dan potion
    let exp = 0
    let potion = ''
    
    // Tentukan hadiah berdasarkan hewan yang dimasak
    switch(animal) {
        case 'banteng':
            exp = 20
            potion = 'Potion Kekuatan Banteng'
            break
        case 'harimau':
            exp = 25
            potion = 'Potion Kekuatan Harimau'
            break
        case 'gajah':
            exp = 30
            potion = 'Potion Kekuatan Gajah'
            break
        case 'kambing':
            exp = 15
            potion = 'Potion Kekuatan Kambing'
            break
        case 'panda':
            exp = 25
            potion = 'Potion Kekuatan Panda'
            break
        case 'buaya':
            exp = 30
            potion = 'Potion Kekuatan Buaya'
            break
        case 'kerbau':
            exp = 25
            potion = 'Potion Kekuatan Kerbau'
            break
        case 'sapi':
            exp = 20
            potion = 'Potion Kekuatan Sapi'
            break
        case 'monyet':
            exp = 15
            potion = 'Potion Kekuatan Monyet'
            break
        case 'ayam':
            exp = 10
            potion = 'Potion Kekuatan Ayam'
            break
        case 'babihutan':
            exp = 20
            potion = 'Potion Kekuatan Babihutan'
            break
        case 'babi':
            exp = 15
            potion = 'Potion Kekuatan Babi'
            break
        default:
            exp = 10
            potion = 'Potion Biasa'
    }
    
    // Cek apakah pengguna memiliki hewan yang cukup untuk dimasak
    if (user[animal] < 1) {
        return conn.reply(m.chat, `Hewan ${animal} di kandangmu telah habis. Kandang kosong.`, m)
    }
    
    // Tambahkan exp untuk pengguna
    user.exp += exp
    
    // Tambahkan potion ke inventaris pengguna
    if (!user.potion) user.potion = {}
    if (!user.potion[potion]) user.potion[potion] = 0
    user.potion[potion]++
    
    // Kurangi jumlah hewan yang dimasak dari kandang pengguna
    user[animal]--
    
    // Simpan data pengguna
    global.db.data.users[m.sender] = user
    
    // Kirim pesan ke pengguna
    conn.reply(m.chat, `Kamu telah memasak ${animal} dan mendapatkan ${exp} exp dan 1 ${potion}!\nSisa ${animal} di kandangmu sekarang: ${user[animal]}`, m)
}

handler.help = ['masak <nama_hewan>']
handler.tags = ['rpg']
handler.command = /^(masak)$/i
handler.register = true
handler.group = true
handler.rpg = true

export default handler
