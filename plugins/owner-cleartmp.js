import  { readdirSync, rmSync } from 'fs'

let handler = async (m, { conn, text }) => {

 const dir = './tmp'
 readdirSync(dir).forEach(f => rmSync(`${dir}/${f}`));
 let pesan = `The \`\`\`tmp folder\`\`\` has been cleaned`
 await m.reply(pesan)
}
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.owner = false
handler.command = /^(c(lear)?tmp)$/i

export default handler