import axios from 'axios';
import fs from 'fs';
import moment from 'moment-timezone';
import crypto from 'crypto'

const timeZone = 'Asia/Jakarta';

// Fungsi Open Close Grup
const openCloseGrup = async () => {
	try {
		const currentTime = moment().tz(timeZone).format('HH:mm');
		const groupChats = Object.keys(db.data.chats).filter(key => key.includes('@g.us'));

		for (let i = 0; i < groupChats.length; i++) {
			const chat = db.data.chats[groupChats[i]];
			const closeReminderTime = moment(chat.closeTime, 'HH:mm').subtract(10, 'minutes').format('HH:mm');
			const openReminderTime = moment(chat.openTime, 'HH:mm').subtract(10, 'minutes').format('HH:mm');

			if (chat.ocStatus) {
				if (currentTime === closeReminderTime) {
					await conn.sendMessage(groupChats[i], {
						text: '> *Peringatan:* Grup akan ditutup dalam 10 menit.'
					});
				}

				if (currentTime === openReminderTime) {
					await conn.sendMessage(groupChats[i], {
						text: '> *Peringatan:* Grup akan dibuka dalam 10 menit.'
					});
				}

				if (currentTime === chat.closeTime) {
					await conn.groupSettingUpdate(groupChats[i], 'announcement');
					conn.sendMessage(groupChats[i], {
						text: `Group ini telah ditutup dan Group ini akan dibuka lagi pada *${chat.openTime}* WIB.`
					});
				}

				if (currentTime === chat.openTime) {
					await conn.groupSettingUpdate(groupChats[i], 'not_announcement');
					conn.sendMessage(groupChats[i], {
						text: `Group ini telah dibuka dan Group ini akan ditutup lagi pada *${chat.closeTime}* WIB.`
					});
				}
			}
		}
	} catch (error) {
		console.log('Gagal menjalankan openCloseGrup:', error.message);
	}
};


setInterval(openCloseGrup, 60 * 1000);