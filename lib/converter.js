import {
	promises
} from 'fs';
import {
	join
} from 'path';
import {
	spawn
} from 'child_process';

const AUDIO_CODEC = 'libmp3lame';
const VIDEO_CODEC = 'libx264';
const OPUS_CODEC = 'libopus';
const GIF_CODEC = 'fps=15,scale=512:-1:flags=lanczos';

async function writeFile(tmp, buffer) {
	try {
		await promises.writeFile(tmp, buffer);
	} catch (error) {
		throw new Error(`Gagal menulis file: ${error.message}`);
	}
}

async function ffmpeg(buffer, args, ext, ext2) {
	try {
		const tmp = join(global.__dirname(import.meta.url), '../tmp', +new Date + '.' + ext);
		const out = tmp + '.' + ext2;
		await writeFile(tmp, buffer);
		const ffmpegProcess = spawn('ffmpeg', ['-y', '-i', tmp, ...args, out]);
		await new Promise((resolve, reject) => {
			ffmpegProcess.on('error', reject);
			ffmpegProcess.on('close', (code) => {
				if (code !== 0) {
					reject(new Error(`FFmpeg gagal dengan kode ${code}`));
				} else {
					resolve();
				}
			});
		});
		const result = await promises.readFile(out);
		return {
			data: result,
			filename: out,
			delete: async () => await promises.unlink(out)
		};
	} catch (error) {
		throw new Error(`Gagal menjalankan FFmpeg: ${error.message}`);
	}
}

async function toAudio(buffer, ext) {
	return ffmpeg(buffer, [
		'-vn',
		'-c:a', AUDIO_CODEC, 
		'-b:a', '128k',
		'-ar', '44100', 
		'-ac', '2',
		'-f', 'mp3',
	], ext, 'mp3');
}

async function toPTT(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', OPUS_CODEC,
        '-b:a', '96k', 
        '-vbr', 'on',
        '-ar', '48000',
        '-ac', '1', 
        '-f', 'ogg',
    ], ext, 'ogg');
}

async function toGif(buffer, ext) {
  return ffmpeg(buffer, [
    '-vf', GIF_CODEC,
    '-loop', '0',
    '-fs', '256k',
    '-c:v', 'gif',
  ], ext, 'gif');
}

async function toVideo(buffer, ext) {
	return ffmpeg(buffer, [
		'-c:v', VIDEO_CODEC,
		'-c:a', 'aac',
		'-b:a', '128k',
		'-ar', '44100',
		'-crf', '32',
		'-preset', 'slow',
	], ext, 'mp4');
}

export {
	toAudio,
	toPTT,
	toVideo,
	toGif,
	ffmpeg
};