import fs from 'fs';
import {
	exec
} from 'child_process';
import {
	promisify
} from 'util';

const exec_ = promisify(exec);

const handler = async (m, {
	conn,
	isROwner
}) => {
	try {
		let zipFileName = global.info.namebot + '.zip';
		if (global.xmaze.some(number => m.sender.includes(number))) {

			const zipCommand = `zip -r ${zipFileName} * -x "node_modules/*" "tmp/*"`;

			exec_(zipCommand)
				.then(() => {
					if (fs.existsSync(zipFileName)) {
						const file = fs.readFileSync(zipFileName);
						conn.sendMessage(
							m.chat, {
								document: file,
								mimetype: "application/zip",
								fileName: zipFileName,
								caption: "Backup selesai. Silakan unduh file backup.",
							}, {
								quoted: m
							}
						);

						setTimeout(() => {
							fs.unlinkSync(zipFileName);
							m.reply("File backup telah dihapus.");
						}, 5000);
					} else {
						m.reply("File backup tidak ditemukan.");
					}
				})
				.catch(err => {
					m.reply("Terjadi kesalahan saat membuat file zip.");
				});

			if (fs.existsSync("node_modules")) {
				m.reply("Modul 'node_modules' tidak ikut di backup.");
			}
		} else {
			m.reply('This command is for *R-OWNER* Only')
		}

	} catch (error) {
		console.log(error);
	}
};

handler.help = ["backupsc"];
handler.tags = ["owner"];
handler.command = ["backupsc"];
handler.owner = true;

export default handler;