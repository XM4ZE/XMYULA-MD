let {
	proto
} = (await import('baileys')).default

export async function all(m) {
	let setting = global.db.data.settings[this.user.jid]
	if (setting.resetlimit) {
		if (new Date() * 1 - setting.resetlimitDB > 86400000) {
			let list = Object.entries(global.db.data.users);
			let lim = 3;
			list.map(([user, data], i) => (Number(data.limit = lim)));

			const msg = {
				conversation: `\`[ Reset Limit Notification ]\`\n\n* *Bot Name:* ${this.getName(this.user.jid)}\n* *Bot Number:* ${this.user.jid.split("@")[0]}\n* *Reset Status:* Sukses\n* *Reset Limit:* ${lim} / Users\n* *Total Reset:* ${Object.keys(db.data.users).length} Users\n\n> *Notes:* Limit di reset setiap hari`
			};
			const plaintext = proto.Message.encode(msg).finish();
			const plaintextNode = {
				tag: 'plaintext',
				attrs: {},
				content: plaintext,
			};
			const node = {
				tag: 'message',
				attrs: {
					to: global.info.channel,
					type: 'text'
				},
				content: [plaintextNode],
			};

			conn.query(node);
			setting.resetlimitDB = new Date() * 1
		}
	}
	return !0
}