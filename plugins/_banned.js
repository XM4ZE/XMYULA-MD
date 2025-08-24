let handler = m => m

handler.before = async function (m) {
    let user = db.data.users[m.sender]                              
    if (new Date() - user.lastBanned > 0 && user.banned && !user.BannedReason) {
            user.lastBanned = 0
            user.banned = false
        }
    }
export default handler