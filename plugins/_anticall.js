export async function before(m) {
	this.ev.on('call', async (calls) => {
		if (db.data.settings[this.user.jid].anticall) {
			for (const call of calls) {
				if (call.status === 'offer') {
					await this.rejectCall(call.id, call.from);
					await this.updateBlockStatus(call.from, 'block');
				}
			}
		}
	});
};