import { writeFileSync, readFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { randomBytes } from 'crypto'
import ffmpeg from 'fluent-ffmpeg'
import pkg from 'node-webpmux'
const { Image } = pkg
import path from 'path'
import { join } from 'path'
import { fileURLToPath } from 'url'

// Untuk mendapatkan __dirname dalam ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function imageToWebp(media) {
    const tmpFileOut = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`)

    writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = readFileSync(tmpFileOut)
    unlinkSync(tmpFileOut)
    unlinkSync(tmpFileIn)
    return buff
}

async function videoToWebp(media) {
    const tmpFileOut = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)

    writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:06",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = readFileSync(tmpFileOut)
    unlinkSync(tmpFileOut)
    unlinkSync(tmpFileIn)
    return buff
}

async function writeExifImg(media, metadata) {
    let wMedia = await imageToWebp(media)
    const tmpFileIn = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileOut = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    writeFileSync(tmpFileIn, wMedia)

    if (metadata.packname || metadata.author) {
        const img = new Image()
        const json = { 
            "sticker-pack-id": `https://github.com/XM4ZE`, 
            "sticker-pack-name": metadata.packname, 
            "sticker-pack-publisher": metadata.author, 
            "emojis": metadata.categories ? metadata.categories : [""] 
        }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        unlinkSync(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
}

async function writeExifVid(media, metadata) {
    let wMedia = await videoToWebp(media)
    const tmpFileIn = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileOut = join(tmpdir(), `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    writeFileSync(tmpFileIn, wMedia)

    if (metadata.packname || metadata.author) {
        const img = new Image()
        const json = { 
            "sticker-pack-id": `https://github.com/XM4ZE`, 
            "sticker-pack-name": metadata.packname, 
            "sticker-pack-publisher": metadata.author, 
            "emojis": metadata.categories ? metadata.categories : [""] 
        }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        unlinkSync(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
}

export { imageToWebp, videoToWebp, writeExifImg, writeExifVid }