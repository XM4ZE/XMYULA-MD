export async function before(m, {
	isBotAdmin,
	isAdmin
}) {
    if (m.isBaileys && m.fromMe) return
	let chat = db.data.chats[m.chat]
	const isForwarded = (
        m.mtype === 'groupStatusMentionMessage' || 
        (m.quoted && m.quoted.mtype === 'groupStatusMentionMessage') ||
        (m.message && m.message.groupStatusMentionMessage) ||
        (m.message && m.message.protocolMessage && m.message.protocolMessage.type === 25)
    )
	if (isForwarded) {
		if (chat.antiTagSW && m.isGroup) {
			if (isBotAdmin && !isAdmin) {
				await conn.sendMessage(m.chat, { delete: m.key })
				await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
				await conn.sendMessage(m.chat, { text: `@${m.sender.split("@")[0]} telah dikeluarkan dari grup karena menandai grup dalam status WhatsApp.`, mentions: [m.sender] })
			} else {
			    await conn.sendMessage(m.chat, { text: `Group ini terdeteksi ditandai di Status WhatsApp oleh @${m.sender.split('@')[0]}. Tapi saya tidak memiliki wewenang untuk menghapus atau mengeluarkan @${m.sender.split('@')[0]} karena saya belum di angkat menjadi *Admin Group*`, mentions: [m.sender] })
            }
		}
	}
}