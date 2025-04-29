let handler = async (m, { conn, participants }) => {

	let now = new Date() * 1
	let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
    let txt = ''
    // let tolgp = `${participants.lenght}`
    
    for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) 
    txt += `${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'Left' : 'Joined'}]\n${db.data.chats[jid] == undefined ? db.data.chats[jid] = {
      isBanned: false,
      welcome: false,
      antiLinkgc: false,
      antiLinkNk: false,
      delete: true,
    } : db.data.chats[jid].expired ? msToDate(db.data.chats[jid].expired - now) : '*Tidak Diatur Expired Group*'}
${db.data.chats[jid].isBanned ? '✅' : '❌'} _Group Banned_
${db.data.chats[jid].welcome ? '✅' : '❌'} _Auto Welcome_
${db.data.chats[jid].antiVirtex ? '✅' : '❌'} _Anti Virtex_
${db.data.chats[jid].antiLinkNk ? '✅' : '❌'} _Anti Link delete_
${db.data.chats[jid].antiLinkgc ? '✅' : '❌'} _Anti Link_\n\n`
    m.reply(`List Groups:
Total Group: ${groups.length}

${txt}

`.trim())

}

handler.help = ['grouplist']
handler.tags = ['group']
handler.command = /^(group(s|list)|(s|list)group)$/i
handler.owner = true
export default handler

function msToDate(ms) {
    let temp = ms
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Days ⏳ \n" + hours + " Hours ⏳ \n" + minutes + " Minute ⏳ ";
    // +minutes+":"+sec;
}
