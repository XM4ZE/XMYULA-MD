let handler = async (m, { noPrefix }) => {
	let text = `## Cara Menggunakan Bot

*1. Gunakan simbol titik [ . ] diikuti dengan command:*

Contoh:
* Untuk melihat menu, ketik: *.menu*
* Untuk melihat semua menu, ketik: *.allmenu*

*2. Limit Penggunaan:*

Setiap pengguna memiliki *limit 10* dan akan di reset setiap 1 minggu sekali secara otomatis.

*3. Akses Premium:*

Jika kamu membeli akses premium, kamu dapat menggunakan bot *tanpa batasan & tanpa limit* selama durasi premium kamu belum habis. Kamu juga dapat mengakses bot melalui *private chat* atau *chat langsung* ke nomor bot.

Kamu bisa membeli akses premium dengan menulis *.sewa <durasi>*
Contoh: 
* .sewa 30

*4. Butuh Bantuan?*

Jika kamu memerlukan bantuan, hubungi pemilik bot dengan menulis *.owner* untuk mendapatkan nomor kontak.
`
	m.reply(text)
}
handler.customPrefix = /^(bot)?$/i
handler.command = new RegExp

export default handler