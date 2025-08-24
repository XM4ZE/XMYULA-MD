import fetch from 'node-fetch';

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// DOWNLOADER TIKTOD
async function downloadTikTok(link, m) {
	try {
		const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${link}&apikey=${btc}`);
		const data = await response.json();
		if (!data.result.video) {
			return;
		}
		if (data.result.video.length > 1) {
			for (let v of data.result.video) {
				await conn.sendFile(m.chat, v, null, `*Tiktok Downloader*`, m);
				await sleep(3000)
			}
		} else {
			await conn.sendMessage(m.chat, {
				video: {
					url: data.result.video[0]
				},
				caption: `*Tiktok Downloader*`
			}, {
				mention: m
			})
		}
		return;
	} catch (error) {
		console.error(error);
	}
}

// DOWNLOADER DOUYIN
async function downloadDouyin(link, m) {
	try {
		const videoResponse = await fetch(`https://api.botcahx.eu.org/api/dowloader/douyin?url=${link}&apikey=${btc}`);
		const videoData = await videoResponse.json();

		if (videoData.result.video) {
			await conn.sendMessage(m.chat, {
				video: {
					url: videoData.result.video[0]
				},
				caption: `*Douyin Downloader*`
			}, {
				mention: m
			});
			return;
		}
	} catch (error) {
		try {
			const slideResponse = await fetch(`https://api.botcahx.eu.org/api/download/douyinslide?url=${link}&apikey=${btc}`);
			const slideData = await slideResponse.json();

			for (let v of slideData.result.images) {
				await conn.sendMessage(m.chat, {
					image: {
						url: v
					},
					caption: `*Douyin Slide Downloader*`
				}, {
					mention: m
				});
				await sleep(3000);
			}
			return;
		} catch (error) {
			console.error(error);
		}
	}
}

// DOWNLOADER INSTAGRAM 
async function downloadInstagram(link, m) {
	try {
		const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${link}&apikey=${btc}`);
		const data = await response.json();

		const limit = 3;

		for (let i = 0; i < Math.min(limit, data.result.length); i++) {
			await sleep(3000)
			return conn.sendFile(m.chat, data.result[i].url, null, `*Instagram Downloader*`, m)
		}
	} catch (error) {
		console.error(error);
	}
}

// DOWNLOADER FACEBOOK 
async function downloadFacebook(link, m) {
    try {
        const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/fbdown3?url=${link}&apikey=${btc}`);
        const data = await response.json();
        const urls = data.result.url.urls;

        if (Array.isArray(urls)) {
            let videoUrl = null;
            for (let url of urls) {
                if (url.hd) {
                    videoUrl = url.hd;
                    break;
                }
            }
            if (!videoUrl) {
                for (let url of urls) {
                    if (url.sd) {
                        videoUrl = url.sd;
                        break;
                    }
                }
            }
            if (videoUrl) {
                await conn.sendMessage(m.chat, {
                    video: {
                        url: videoUrl
                    },
                    caption: `*Facebook Downloader*`
                }, {
                    mention: m
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
}
/**=========================================**/
export async function before(m, {
	conn,
	isPrems
}) {
	let chat = global.db.data.chats[m.chat];
	let user = global.db.data.users[m.sender];

	if (!m.text && m.fromMe) {
		return;
	}

	if (!isPrems) {
		return;
	}

	if (m.text.startsWith('=>') || m.text.startsWith('>') || m.text.startsWith('.') || m.text.startsWith('#') || m.text.startsWith('!') || m.text.startsWith('/') || m.text.startsWith('\/')) {
		return;
	}

	if (chat.isBanned) {
		return;
	}

	if (!m.text.includes('http')) {
		return;
	}

	let text = m.text.replace(/\n+/g, ' ');

	const tiktokRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
	const douyinRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.|v\.)?(?:douyin\.com\/)(?:\S+)?$/i;
	const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/i;
	const facebookRegex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/i;

	if (text.match(tiktokRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '🌐',
				key: m.key,
			}
		})
		await downloadTikTok(text.match(tiktokRegex)[0], m);
	} else if (text.match(douyinRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '🌐',
				key: m.key,
			}
		})
		await downloadDouyin(text.match(douyinRegex)[0], m);
	} else if (text.match(instagramRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '🌐',
				key: m.key,
			}
		})
		await downloadInstagram(text.match(instagramRegex)[0], m);
	} else if (text.match(facebookRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '🌐',
				key: m.key,
			}
		})
		await downloadFacebook(text.match(facebookRegex)[0], m);
	}

	return !0;
}