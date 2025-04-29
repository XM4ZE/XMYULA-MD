import fetch from 'node-fetch'
let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} stikerinbot`
    let res = await fetch(API('https://api.github.com', '/search/repositories', {
        q: text
    }))
    if (!res.ok) throw eror
    let json = await res.json()
    let str = json.items.map((repo, index) => {
        return `>      「 ${ 1 + index } 」       <
ɴᴀᴍᴇ ʀᴇᴘᴏ : ${repo.name}
ʙʏ : ${repo.owner.login}
ғᴏʀᴋᴇᴅ : ${repo.fork ? 'True' : 'False'}
ᴘʀɪᴠᴀᴛᴇ : ${repo.private ? 'True': 'False'}

➔ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ : ${formatDate(repo.created_at)}
➔ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇ ᴏɴ :${formatDate(repo.updated_at)}
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
❗ ɪssᴜᴇ : ${repo.open_issues} ${repo.description ? `
📚 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:
${repo.description}` : ''}

⑂ ᴄʟᴏɴᴇ :
$ git clone ${repo.clone_url}
`.trim()
    }).join('\n— — — — — — — — — — — — — —\n')
    conn.reply(m.chat, `*${decor.htki} ɢɪᴛʜᴜʙ sᴇᴀʀᴄʜ ${decor.htka}*\n${str}`, m)
}
handler.help = ['githubsearch'].map(v => v + ' <pencarian>')
handler.tags = ['search']
handler.limit = true;
handler.register = true;
handler.command = /^g(ithub|h)s(earch)?$/i

export default handler;

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}