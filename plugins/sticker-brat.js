import { Sticker } from 'wa-sticker-formatter';
import axios from 'axios';
import sharp from 'sharp';

var handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply('Masukan text');
    
    try {
        const emojis = text.match(/[\p{Emoji}\uFE0F-\uFFFF]/gu);
        let emojiText = emojis ? emojis.join('') : '';
        const maxTextLength = 151 - emojiText.length;
        let clippedText = text.substring(0, maxTextLength);

        let req = `https://api.botcahx.eu.org/api/maker/brat?text=${encodeURIComponent(clippedText)}&apikey=${btc}`;
        
        const response = await axios.get(req, { responseType: 'arraybuffer' });
        let imageBuffer = Buffer.from(response.data, 'binary');
        
        imageBuffer = await sharp(imageBuffer)
            .resize(512, 512, {
                fit: 'fill', 
                background: { r: 0, g: 0, b: 0, alpha: 0 } 
            })
            .toBuffer();
        
        let stiker = await createSticker(imageBuffer, false, '', '');
        await conn.sendFile(m.chat, stiker, '', '', m);
        
    } catch (e) {
        console.log(e);
        m.reply('Gagal membuat stiker');
    }
}

handler.command = handler.help = ['brat'];
handler.tags = ['sticker'];
handler.limit = true;
handler.register = true;

export default handler;

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: stickpack,
        author: stickauth,
        quality
    };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}