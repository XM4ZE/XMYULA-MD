import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix: _p, args, command, text }) => {
  let waktu = moment().tz('Asia/Jakarta');
  let tampilTanggal = waktu.format('dddd DD MMMM YYYY');
  let tampilWaktu = `${waktu.format('HH:mm:ss')}`;
  let who;
  if (m.isGroup) who = m.mentionedJid0 ? m.mentionedJid0 : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  if (!who) throw 'Reply Message';
  conn.sendMessage(m.chat, { text: `TRANSAKSI PENDING\n\nTANGGAL : ${tampilTanggal}\nJAM : ${tampilWaktu} WIB\nSTATUS : Pending\n\nPesanan @${m.quoted.sender.split('@')[0]} sedang diproses!`, contextInfo: { mentionedJid: [m.quoted.sender] }})
  conn.sendMessage(m.sender, { text: `Pesanan @${m.quoted.sender.split('@')[0]}.\n\n> Hapus Pesan ini jika sudah selesai`, contextInfo: { mentionedJid: [m.quoted.sender] }})
};

handler.help = ['proses <reply message>'];
handler.tags = ['store'];
handler.customPrefix = /^(proses)$/i
handler.group = false;
handler.admin = false;
handler.owner = true;
handler.command = new RegExp();

export default handler;