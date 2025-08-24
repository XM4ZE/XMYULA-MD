import { areJidsSameUser } from "baileys"; 
 let handler = async (m, { conn, participants }) => { 
   let users = participants.filter((u) => !areJidsSameUser(u.id, conn.user.id)); 
   let kickedUser = []; 
   for (let user of users) { 
     if (user.id.endsWith("@s.whatsapp.net") && !user.admin) { 
       await kickedUser.push(user.id); 
       await delay(1 * 1000); 
     } 
   } 
   if (!kickedUser.length >= 1) 
     return m.reply("Di Grup Ini Tidak Ada Member Kecuali Kamu Dan Aku"); 
   const res = await conn.groupParticipantsUpdate(m.chat, kickedUser, "remove"); 
   await delay(1 * 1000); 
   await m.reply( 
     `Sukses Mengeluarkan Semua Member\n${kickedUser.map( 
       (v) => "@" + v.split("@")[0] 
     )}`, 
     null, 
     { 
       mentions: kickedUser, 
     } 
   ); 
 }; 
 handler.tags = ['group']
 handler.help = ['kickall']
 handler.command = /^(kickall)$/i; 
 handler.owner = true;
 handler.admin = true; 
 handler.group = true; 
 handler.botAdmin = true; 
  
 export default handler; 
  
 const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));