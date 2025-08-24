import fetch from 'node-fetch';
import axios from 'axios';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

/**
 * Upload file to https://catbox.moe
 * @returns {string|null|(string|null)[]} 
 */
const catbox = async (buffer) => {
    const { ext } = await fileTypeFromBuffer(buffer) || {};
    if (!ext) throw new Error('File type not recognized');
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', buffer, `file.${ext}`);
    const response = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: {
        ...form.getHeaders(),
        'Content-Length': form.getLengthSync()
      }
    });
    return response.data;
};

/**
 * Upload file to https://qu.ax
 * @returns {string|null|(string|null)[]} 
 */
const quax = async (buffer) => {
  let { ext, mime } = await fileTypeFromBuffer(buffer);
  const form = new FormData();
  form.append('files[]', buffer, {
    filename: 'tmp.' + ext,
    contentType: mime,
  });
  form.append('expiry', '-1');
  const { data } = await axios.post(
    "https://qu.ax/upload.php",
    form,
    {
      headers: {
        ...form.getHeaders(),
      }
    }
  );
  return data.files[0].url;
};

/**
 * Upload file to https://file.btch.rf.gd
 * @returns {string|null|(string|null)[]} 
 */
const api = async (buffer) => {
  let { ext } = await fileTypeFromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);
  let res = await fetch("https://file.btch.rf.gd/api/upload.php", {
    method: "post",
    body: bodyForm,
  });
  let data = await res.json();
  let resultUrl = data.result ? data.result.url : '';
  return resultUrl;
}

export default async function (inp) {
  let err = false;
  for (const upload of [quax, catbox, api]) {
    try {
      return await upload(inp);
    } catch (e) {
      err = e;
    }
  }
  if (err) throw err;
};
