import { S_WHATSAPP_NET } from 'baileys';
import { Jimp } from 'jimp';

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let media = await q.download()
			let data = await generateProfilePicture(media)
			await conn.query({
				tag: 'iq',
				attrs: {
					target: undefined,
					to: S_WHATSAPP_NET,
					type:'set',
					xmlns: 'w:profile:picture'
				},
				content: [
					{
						tag: 'picture',
						attrs: { type: 'image' },
						content: data.img
					}
				]
			})
			m.reply(`Sukses mengganti PP Bot`)
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['setbotpp']
handler.tags = ['owner']
handler.command = /^(set(botpp|ppbot))$/i

handler.owner = true

export default handler

async function generateProfilePicture(buffer) {
	const jimp_1 = await Jimp.read(buffer);

	const width = jimp_1.bitmap.width;
	const height = jimp_1.bitmap.height;

	let minz;
	if (width > height) {
		minz = await jimp_1.resize({
			w: 720,
			h: Jimp.AUTO,
			fit: Jimp.RESIZE_BILINEAR
		});
	} else {
		minz = await jimp_1.resize({
			w: Jimp.AUTO,
			h: 720,
			fit: Jimp.RESIZE_BILINEAR
		});
	}

	const jimp_2 = await Jimp.read(await minz.getBuffer("image/jpeg"));

	return {
		img: await minz.getBuffer("image/jpeg")
	};
}