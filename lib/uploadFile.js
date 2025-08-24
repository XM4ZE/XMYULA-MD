import fetch from 'node-fetch';
import axios from 'axios'
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type'


/**
 * Upload image to url
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 */

export default async buffer => {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || {};
  const form = new FormData();
  form.append("file", buffer, { filename: `tmp.${ext}`, contentType: mime });
  try {
    const { data } = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
      headers: form.getHeaders(),
    });   
    console.log(data);  
    const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.data.url);
    return `https://tmpfiles.org/dl/${match[1]}`;
  } catch (error) {
    throw error;
  }
};