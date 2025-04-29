import { performance } from 'perf_hooks';
import osu from 'node-os-utils';
import os from 'os';

let handler = async(m, { conn, command, usedPrefix, DevMode }) => {
    try {
        let NotDetect = 'Not Detect'
        let old = performance.now()
        let cpu = osu.cpu
        let cpuCore = cpu.count()
        let drive = osu.drive
        let mem = osu.mem
        let netstat = osu.netstat
        let OS = osu.os.platform()
        let cpuModel = cpu.model()
        let cpuPer
        let p1 = cpu.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage
        }).catch(() => {
            cpuPer = NotDetect
        })
        let driveTotal, driveUsed, drivePer
        let p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
                driveUsed = info.usedGb,
                drivePer = (info.usedPercentage + '%')
        }).catch(() => {
            driveTotal = NotDetect,
                driveUsed = NotDetect,
                drivePer = NotDetect
        })
        let ramTotal, ramUsed, ramFree, usedMemPercentage, freeMemPercentage
        let p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
                ramUsed = info.usedMemMb,
                    ramFree = info.freeMemMb,
                        usedMemPercentage = info.usedMemPercentage,
                             freeMemPercentage = info.freeMemPercentage
        }).catch(() => {
            ramTotal = NotDetect,
                ramUsed = NotDetect,
                    ramFree = NotDetect,
                        usedMemPercentage = NotDetect,
                            freeMemPercentage = NotDetect                             
        })
        let netsIn, netsOut
        let p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
                netsOut = (info.total.outputMb + ' MB')
        }).catch(() => {
            netsIn = NotDetect,
                netsOut = NotDetect
        })
        await Promise.all([p1, p2, p3, p4])
        let _ramTotal = (ramTotal + ' MB')
        let neww = performance.now()
        
//  ${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect}\`\`\`

var txt = `
\`CPU Info\`
\`\`\`OS : ${OS}\`\`\`
\`\`\`CPU Model : ${cpuModel}\`\`\`
\`\`\`CPU Core : ${cpuCore} Core\`\`\`
\`\`\`CPU Used : ${cpuPer}%\`\`\`

\`MEMORY Info\`
\`\`\`RAM Total : ${ramTotal}\`\`\`
\`\`\`RAM Used : ${ramUsed} (${usedMemPercentage}%)\`\`\`
\`\`\`RAM Free : ${ramFree} (${freeMemPercentage}%)\`\`\`

\`DISK Info\`
\`\`\`DRIVE Total : ${driveTotal}\`\`\`
\`\`\`DRIVE Used : ${driveUsed} (${drivePer})\`\`\`

\`Ping\`
\`\`\`Ping : ${Math.round(neww - old)} ms\`\`\`
`
conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: txt, 
        contextInfo: {
          externalAdReply: {
            title: ``,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: true,
            thumbnailUrl: 'https://pomf2.lain.la/f/he42in5n.jpg',
            sourceUrl: ''
          }
        },
        mentions: [m.sender]
      }
    }, {});
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, eror, m)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Status.js error\nNo: *' + m.sender.split `@` [0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}
handler.help = ['bot'].map(v => 'status' + v)
handler.tags = ['info']
handler.command = /^(bot)?stat(us)?(bot)?$/i

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ ms, h, m, s })
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}