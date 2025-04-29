import fs from 'fs';

let handler = async (m, {
	conn,
	usedPrefix,
	command,
	text
}) => {
	if (!text) return m.reply(`Mana Cookiesnya?`);
	if (!text.includes("-----------------------------------------")) return m.reply('Cookies Tidak cocok');
	try {
		const lines = text.split('\n----------------------------------------- \n');
		const cookies = [];
		let id = 1;

		lines.forEach(line => {
			if (line.trim() !== "") {
				const [name, value] = line.trim().split('\n');
				cookies.push({
					"domain": ".youtube.com",
					"expirationDate": 31536000000,
					"hostOnly": false,
					"httpOnly": true,
					"name": name,
					"path": "/",
					"sameSite": "unspecified",
					"secure": true,
					"session": false,
					"storeId": "0",
					"value": value,
					"id": id++
				});
			}
		});

		let data = JSON.stringify(cookies, null, 2);
		fs.writeFileSync('cookies.json', data); // ubah lokasinya
		m.reply('Data Cookies Sudah di perbarui');
	} catch (e) {
		m.reply('Terjadi kesalahan');
		console.log(e);
	}
}
handler.help = ['cookies'];
handler.tags = ['owner'];
handler.command = /^(cookies)$/i;
handler.rowner = true;

export default handler;