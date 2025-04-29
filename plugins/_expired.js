let handler = m => m;

handler.before = async function (m) {
    const kontak = {
        "displayName": `${global.info.nameown}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: ${global.info.nameown}\nitem1.TEL;waid=${global.info.nomorown}:${global.info.nomorown}\nitem1.X-ABLabel:My Owner\n\nURL:maximusstoreindonesia@gmail.com\nORG: SEWABOT, PANEL\nEND:VCARD`
    };

    let fkon = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {})
        },
        message: {
            contactMessage: {
                displayName: `${conn.getName(conn.user.jid)}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${conn.getName(conn.user.jid)}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    };

    let doc = {
        contacts: {
            contacts: [kontak]
        },
        contextInfo: {
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.info.channel,
                serverMessageId: null,
                newsletterName: global.info.namechannel,
            }
        }
    };

    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        const oneDayInMs = 86400000;
        const expiredTime = global.db.data.chats[m.chat].expired;
        const xMtiME = expiredTime - new Date() * 1;
        const lastNotification = global.db.data.chats[m.chat].lastNotification || 0;
        const currentTime = new Date().getTime();

        if (xMtiME <= oneDayInMs && xMtiME > 0 && (currentTime - lastNotification) > 7200000) { 
                const xMhOurS = Math.floor(xMtiME / 3600000);
                const xMmiNits = Math.floor((xMtiME % 3600000) / 60000);
                this.reply(m.chat, `*[ Group Notifications ]*\n\nSisa Masa sewa grup ini tinggal\n*waktu: ${xMhOurS} jam ${xMmiNits} menit*\n\n> Pesan ini akan muncul lagi dalam 2 Jam.`, null)
        
            global.db.data.chats[m.chat].lastNotification = currentTime;
        } else if (xMtiME <= 0) {
            this.reply(m.chat, `waktunya *${this.user.name}* untuk meninggalkan grup\nJangan lupa sewa lagi ya!`, null).then(() => {
                conn.sendMessage(m.chat, doc, { quoted: fkon }).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0;
                        global.db.data.chats[m.chat].lastNotification = 0;
                    });
                });
            });
        }
    }
};

export default handler;




/*let handler = m => m
handler.before = async function (m) {

    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            this.reply(m.chat, `waktunya *${this.user.name}* untuk meninggalkan grup\nJangan lupa sewa lagi ya!`, null).then(() => {
                conn.sendContact(m.chat, owner, m).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0
                    })
                })
            })
        }
    }
}

export default handler*/