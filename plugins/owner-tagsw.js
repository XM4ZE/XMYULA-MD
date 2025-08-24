import fetch from 'node-fetch';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
const baileys = (await import('baileys')).default;

const commandList = ["upsw"];
const mimeAudio = 'audio/mpeg';
const mimeVideo = 'video/mp4';
const mimeImage = 'image/jpeg';

const fetchParticipants = async (...jids) => {
    let results = [];
    for (const jid of jids) {
        let { participants } = await conn.groupMetadata(jid);
        participants = participants.map(({ id }) => id);
        results = results.concat(participants);
    }
    return results;
};

async function mentionStatus(jids, content) {
    const msg = await baileys.generateWAMessage(baileys.STORIES_JID, content, {
        upload: conn.waUploadToServer
    });

    let statusJidList = [];
    for (const _jid of jids) {
        if (_jid.endsWith("@g.us")) {
            for (const jid of await fetchParticipants(_jid)) {
                statusJidList.push(jid);
            }
        } else {
            statusJidList.push(_jid);
        }
    }
    statusJidList = [...new Set(statusJidList)];

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id,
        statusJidList,
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: jids.map((jid) => ({
                            tag: "to",
                            attrs: {
                                jid
                            },
                            content: undefined
                        }))
                    }
                ]
            }
        ]
    });

    for (const jid of jids) {
        let type = (
            jid.endsWith("@g.us") ? "groupStatusMentionMessage" :
            "statusMentionMessage"
        );
        await conn.relayMessage(jid, {
            [type]: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {
                        is_status_mention: "true"
                    },
                    content: undefined
                }
            ]
        });
    }

    return msg;
}

let handler = async (m, { conn, command, args }) => {
    let teks;
    if (args.length >= 1) {
        teks = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text;
    }

    if (m.quoted && m.quoted.mtype) {
        const mtype = m.quoted.mtype;
        let type;
        if (mtype === 'audioMessage') {
            type = 'vn';
        } else if (mtype === 'videoMessage') {
            type = 'vid';
        } else if (mtype === 'imageMessage') {
            type = 'img';
        } else if (mtype === 'extendedTextMessage') {
            type = 'txt';
        } else {
            throw "❌ Media type tidak valid!";
        }
        
        const doc = {};
        if (type === 'vn') {
            const link = await (type === 'img' ? uploadImage : uploadFile)(await m.quoted.download());
            doc.mimetype = mimeAudio;
            doc.audio = { url: link } ? { url: link } : { url: vn };
        } else if (type === 'vid') {
            const link = await (type === 'img' ? uploadImage : uploadFile)(await m.quoted.download());
            doc.mimetype = mimeVideo;
            doc.caption = teks;
            doc.video = { url: link } ? { url: link } : { url: thumvid };
        } else if (type === 'img') {
            const link = await (type === 'img' ? uploadImage : uploadFile)(await m.quoted.download());
            doc.mimetype = mimeImage;
            doc.caption = teks;
            doc.image = { url: link } ? { url: link } : { url: thum };
        } else if (type === 'txt') {
            doc.text = teks;
        }
/*await conn.sendMessage('status@broadcast', doc, {
backgroundColor: getRandomHexColor(),
font: Math.floor(Math.random() * 9),
statusJidList: Object.keys(global.db.data.users)
}).then((res) => {*/
        await mentionStatus([m.chat], doc, {
            backgroundColor: getRandomHexColor(),
            font: Math.floor(Math.random() * 9),
            statusJidList: Object.keys(global.db.data.users)
        }).then((res) => {
                conn.reply(m.chat, `Sukses upload ${type}`, res);
          
        }).catch(() => {
            conn.reply(m.chat, `Gagal upload ${type}`, m);
        });
    } else {
        throw "❌ Tidak ada media yang diberikan!";
    }
};

handler.help = commandList;
handler.tags = ["owner"];
handler.rowner = true;
handler.command = new RegExp(`^(${commandList.join('|')})$`, 'i');
export default handler;

function getRandomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}