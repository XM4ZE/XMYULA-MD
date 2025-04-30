import fetch from 'node-fetch'

var handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukkan URL!`;
if (!args[0].match(/https?:\/\/(www\.)?(twitter\.com|x\.com)/gi)) throw "URL Tidak Ditemukan!";
    m.reply(wait);
    try {
         const data = await( await fetch(`https://api.botcahx.eu.org/api/download/twitter2?url=${args[0]}&apikey=${btc}`)).json()
         let x = data.result.mediaURLs;
         for(const maze of x) {
         await new Promise((resolve) => {
            setTimeout(async () => {
               conn.sendFile(m.chat, maze, null, wm, m)
            resolve();
            }, 5000);
         }
    );
         }        
    } catch (e) {
        console.log(e)
        m.reply(`Creator account is private`);
    }
};
handler.command = /^(twitterdl|twitter|xdl|x)$/i
handler.help = ['twitter'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.limit = true;

export default handler;