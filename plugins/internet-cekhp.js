import fetch from 'node-fetch';

const handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} Infinix Hot 40 Pro`;  
  let teks = '';
  try {
    const api = await fetch(`https://api.botcahx.eu.org/api/webzone/gsmarena?query=${text}&apikey=${btc}`);
    const json = await api.json();
    const spec = json.result.specifications;

    teks += `*${json.result.name}*\n\n`;

    teks += '*Network*\n';
    teks += `- Technology: ${spec.network.technology}\n`;
    teks += `- 2G Bands: ${spec.network.bands2g}\n`;
    teks += `- 3G Bands: ${spec.network.bands3g}\n`;
    teks += `- 4G Bands: ${spec.network.bands4g}\n\n`;

    teks += '*Platform*\n';
    teks += `- Chipset: ${spec.platform.chipset}\n`;
    teks += `- CPU: ${spec.platform.cpu}\n`;
    teks += `- GPU: ${spec.platform.gpu}\n`;
    teks += `- OS: ${spec.platform.os}\n\n`;

    teks += '*Body*\n';
    teks += `- Dimensions: ${spec.body.dimensions}\n`;
    teks += `- Weight: ${spec.body.weight}\n`;
    teks += `- Build: ${spec.body.build}\n`;
    teks += `- SIM: ${spec.body.sim}\n\n`;

    teks += '*Display*\n';
    teks += `- Type: ${spec.display.type}\n`;
    teks += `- Size: ${spec.display.size}\n`;
    teks += `- Resolution: ${spec.display.resolution}\n\n`;

    teks += '*Memory*\n';
    teks += `- Card Slot: ${spec.memory.cardSlot}\n`;
    teks += `- Internal: ${spec.memory.internal}\n\n`;

    teks += '*Main Camera*\n';
    teks += `- Dual: ${spec.mainCamera.dual}\n`;
    teks += `- Features: ${spec.mainCamera.features}\n`;
    teks += `- Video: ${spec.mainCamera.video}\n\n`;

    teks += '*Battery*\n';
    teks += `- Type: ${spec.battery.type}\n`;
    teks += `- Charging: ${spec.battery.charging}\n\n`;

    teks += '*Features*\n';
    teks += `- Sensors: ${spec.features.sensors}\n\n`;

    teks += '*Colors*\n';
    teks += spec.colors.join(', ') + '\n\n';

    teks += '*Performance*\n';
    teks += spec.performance.join('\n') + '\n\n';

    teks += `*Preview:* ${json.result.image}\n`;

    await conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: teks,
        contextInfo: {
          externalAdReply: {
            title: 'DEVICE INFORMATION',
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: true,
            thumbnailUrl: json.result.image,
            sourceUrl: json.result.image 
          }
        },
        mentions: [m.sender]
      }
    }, {});
  } catch (e) {
    throw `🚩 *Gagal Memuat Data!*`;
  }
};

handler.command = ['cekhp', 'spek', 'gsmarena', 'spesifikasi'];
handler.help = ['gsmarena'];
handler.tags = ['internet'];
handler.premium = false;
handler.group = false;
handler.limit = true;

export default handler;