let handler = async (m, { conn, text, participants }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  text = no(text);
  if (!text) return m.reply('tag orang yang mau kamu cek*');
  let user = m.sender;
  let orang = "Kamu";
  
  if (m.mentionedJid.length > 0) {
    user = m.mentionedJid[0];
    orang = "Orang yang kamu tag";
  } else if (m.quoted.sender) {
    user = m.quoted.sender;
    orang = "Orang yang kamu tag";
  } else if (text) {
      let number = text;
      if (!isNaN(number)) {
          try {
              user = number + '@s.whatsapp.net'; 
          } catch (e){
            conn.reply(m.chat, "Nomor tidak valid", m);
            return;
          }
          orang = "Orang yang kamu tag";
      }
  }


  if (!user) {
    conn.reply(m.chat, "Gagal mengambil user. Pastikan anda menandai, mengutip, atau memasukkan nomor yang valid.", m);
    return;
  }

  if (!global.db.data.users[user]) {
    return m.reply("*Orang yang kamu tag tidak terdaftar di database*");
  }

  let pasangan = global.db.data.users[user].pasangan;

  if (!pasangan || pasangan === "") {
    conn.reply(m.chat, `*${orang} tidak memiliki pasangan dan tidak sedang menembak siapapun*\n\n*Ketik /tembak @user untuk menembak seseorang*`, m);
  } else if (!global.db.data.users[pasangan]) {
    conn.reply(m.chat, `*Pacar/gebetan target tidak terdaftar di database.*`, m);
  } else if (global.db.data.users[pasangan].pasangan !== user) {
    conn.reply(m.chat, `*${orang} sedang digantung oleh @${global.db.data.users[user].pasangan.split('@')[0]} karena sedang tidak diterima atau di tolak*\n\n*Ketik .ikhlasin untuk menghapus nama dia dari hatimu*`, m, {
      contextInfo: {
        mentionedJid: [global.db.data.users[user].pasangan],
      },
    });
  } else {
    conn.reply(m.chat, `*${orang} sedang menjalani hubungan dengan @${global.db.data.users[user].pasangan.split('@')[0]} 🥳🥳*`, m, {
      contextInfo: {
        mentionedJid: [global.db.data.users[user].pasangan],
      },
    });
  }
};

handler.help = ['cekpacar'];
handler.tags = ['pacaran'];
handler.command = /^(cekpacar)$/i;
handler.register = true;
handler.group = true;
handler.fail = null;

export default handler;