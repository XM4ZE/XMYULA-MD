import axios from 'axios'
import cheerio from 'cheerio'
import request from 'request'
import crypto from 'crypto'

async function sifat_usaha_bisnis(tgl, bln, thn) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://primbon.com/'+'sifat_usaha_bisnis.php',
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams(Object.entries({
                "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! "
            }))
        }).then(({
                data
            }) => {
            let $ = cheerio.load(data)
            let fetchText = $('#body').text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        hari_lahir: fetchText.split('Hari Lahir Anda: ')[1].split(thn)[0],
                        usaha: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
                        catatan: 'Setiap manusia memiliki sifat atau karakter yang berbeda-beda dalam menjalankan bisnis atau usaha. Dengan memahami sifat bisnis kita, rekan kita, atau bahkan kompetitor kita, akan membantu kita memperbaiki diri atau untuk menjalin hubungan kerjasama yang lebih baik. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan karakter atau sifat bisnis seseorang berdasarkan weton hari kelahirannya. Hasil perhitungannya bisa dijadikan referensi untuk memilih bidang usaha atau rekan bisnis yang cocok bagi kita.'
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                }
            }
            resolve(hasil)
        })
    })
}

async function rejeki_hoki_weton(tgl, bln, thn) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://primbon.com/'+'rejeki_hoki_weton.php',
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams(Object.entries({
                "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! "
            }))
        }).then(({
                data
            }) => {
            let $ = cheerio.load(data)
            let fetchText = $('#body').text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        hari_lahir: fetchText.split('Hari Lahir: ')[1].split(thn)[0],
                        rejeki: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
                        catatan: 'Rejeki itu bukan lah tentang ramalan tetapi tentang usaha dan ikhtiar seseorang. From Admin'
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                }
            }
            resolve(hasil)
        })
    })
}

async function tanggal_pernikahan(tgl, bln, thn) {
    return new Promise((resolve, reject) => {
        axios.get('https://primbon.com/tanggal_jadian_pernikahan.php?tgl='+tgl+'&bln='+bln+'&thn='+thn+'&proses=+Submit%21+')
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let fetchText = $('#body').text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        tanggal: fetchText.split('Tanggal: ')[1].split('Karakteristik: ')[0],
                        karakteristik: fetchText.split('Karakteristik: ')[1].split('< Hitung Kembali')[0],
                        catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan Ramalan Perjalanan Hidup Suami Istri.'
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                }
            }
            resolve(hasil)
        })
    })
}

async function kecocokan(nama1, nama2) {
    return new Promise((resolve, reject) => {
        axios.get('https://primbon.com/kecocokan_nama_pasangan.php?nama1='+nama1+'&nama2='+nama2+'&proses=+Submit%21+')
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let fetchText = $("#body").text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        nama_anda: nama1,
                        nama_pasangan: nama2,
                        sisi_positif: fetchText.split('Sisi Positif Anda: ')[1].split('Sisi Negatif Anda: ')[0],
                        sisi_negatif: fetchText.split('Sisi Negatif Anda: ')[1].split('< Hitung Kembali')[0],
                        gambar: 'https://primbon.com/ramalan_kecocokan_cinta2.png',
                        catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan.'
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                }
            }
            resolve(hasil)
        })
    })
}

async function tafsir_mimpi(value) {
    return new Promise((resolve, reject) => {
        axios.get('https://primbon.com/tafsir_mimpi.php?mimpi='+value+'&submit=+Submit+')
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let fetchText = $('#body').text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        mimpi: value,
                        arti: fetchText.split(`Hasil pencarian untuk kata kunci: ${value}`)[1].split('\n')[0],
                        solusi: fetchText.split('Solusi -')[1].trim()
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: `Tidak ditemukan tafsir mimpi "${value}" Cari dengan kata kunci yang lain.`
                }
            }
            resolve(hasil)
        })
    })
}

async function remini(url, apikey) {
    const content = (await conn.getFile(url)).data
    const md5Hash = crypto.createHash("md5").update(content).digest("base64")
    const client = axios.create({
        baseURL: "https://developer.remini.ai/api",
        headers: {
            Authorization: `Bearer m3yl4zGsURJtiODuVl4OnGhrwfgMwtTnTlaLmYJHW34UhB02`
        },
        timeout: 60000,
    })
    const submitTaskResponse = await client.post("/tasks", {
        tools: [{
            type: "face_enhance",
            mode: "beautify"
        },
            {
                type: "background_enhance",
                mode: "base"
            },
        ],
        image_md5: md5Hash,
        image_content_type: "image/jpeg",
    })
    const taskID = submitTaskResponse.data.task_id
    const uploadURL = submitTaskResponse.data.upload_url
    const uploadHeaders = submitTaskResponse.data.upload_headers
    await axios.put(uploadURL, content, {
        headers: uploadHeaders
    })
    await client.post(`/tasks/${taskID}/process`)
    for (let i = 0; i < 50; i++) {
        const getTaskResponse = await client.get(`/tasks/${taskID}`)
        if (getTaskResponse.data.status === "completed") {
            return getTaskResponse.data.result.output_url
            process.exit(0)
        } else {
            if (getTaskResponse.data.status !== "processing") {
                return "Found illegal status: " + getTaskResponse.data.status
                process.exit(1)
            }
            await new Promise((resolve) => setTimeout(resolve, 2000))
        }
    }
}

async function nhentai(url) {
    try {
        const response = await axios.get(`https://nhentai.to/g/${url}`);
        const $ = cheerio.load(response.data);
        const Result = [];
        const id = $('#gallery_id > span').text()
        const title = $('#info > h1').text()
        const alternative_title = $('#info > h2').text()
        const language = $('#tags > div:nth-child(5) > span > a > span.name').text()
        const Categories = $('#tags > div:nth-child(6) > span > a > span.name').text()
        const total_page = $('#tags > div:nth-child(7) > span > a > span').text()
        const upload = $('#tags > div:nth-child(8) > span > time').text()
        $('#thumbnail-container > div').each((i, e) => {
            const Link = $(e).find('a > img').attr('data-src')
            Result.push(Link);
        });
        return ({
            id: id + url,
            title: title,
            alternative_title: alternative_title,
            language: language,
            Categories: Categories,
            total_page: total_page,
            upload: upload,
            Link: Result
        })
    } catch (error) {
        console.log(error)
        return 'ERROR';
    }
}

async function soundcloud(link) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: "https://www.klickaud.co/download.php",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
                'value': link,
                '2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3'
            }
        }

        request(options, async function (error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            resolve({
                judul: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
                download_count: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
                thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
                link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0]
            })
        })
    })
}

async function cerpen(category) {
    return new Promise((resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "")
        let judul = title.replace(/\s/g, "-")
        let page = Math.floor(Math.random() * 5)
        axios.get('http://cerpenmu.com/category/cerpen-'+judul+'/page/'+page)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let link = []
            $('article.post').each(function (a, b) {
                link.push($(b).find('a').attr('href'))
            })
            let random = link[Math.floor(Math.random() * link.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let hasil = {
                    title: $$('#content > article > h1').text(),
                    author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
                    kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
                    lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                    cerita: $$('#content > article > p').text()
                }
                resolve(hasil)
            })
        })
    })
}

async function wiki(query) {
    const res = await axios.get(`https://id.m.wikipedia.org/wiki/${query}`)
    const $ = cheerio.load(res.data)
    const hasil = []
    let wiki = $('#mf-section-0').find('p').text()
    let thumb = $('meta[property="og:image"]').attr('content')
    hasil.push({
        wiki, thumb
    })
    return hasil
}

async function cariresep(query) {
    return new Promise(async(resolve, reject) => {
        axios.get('https://resepkoki.id/?s=' + query).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const link = [];
            const judul = [];
            const upload_date = [];
            const format = [];
            const thumb = [];
            $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
                link.push($(b).attr('href'))
            })
            $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
                let jud = $(d).text();
                judul.push(jud)
            })
            for (let i = 0; i < link.length; i++) {
                format.push({
                    judul: judul[i],
                    link: link[i]
                })
            }
            const result = {
                creator: 'Fajar Ihsana',
                data: format.filter(v => v.link.startsWith('https://resepkoki.id/resep'))
            }
            resolve(result)
        })
        .catch(reject)
    })
}

async function detailresep(query) {
    return new Promise(async(resolve,
        reject) => {
        axios.get(query).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const abahan = [];
            const atakaran = [];
            const atahap = [];
            $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
                let bh = $(b).text();
                abahan.push(bh)
            })
            $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
                let uk = $(d).text();
                atakaran.push(uk)
            })
            $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
                let th = $(f).text();
                atahap.push(th)
            })
            const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
            const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
            const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
            const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
            const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
            let tbahan = 'bahan\n'
            for (let i = 0; i < abahan.length; i++) {
                tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
            }
            let ttahap = 'tahap\n'
            for (let i = 0; i < atahap.length; i++) {
                ttahap += atahap[i] + '\n\n'
            }
            const tahap = ttahap
            const bahan = tbahan
            const result = {
                creator: 'Fajar Ihsana',
                data: {
                    judul: judul,
                    waktu_masak: waktu,
                    hasil: hasil,
                    tingkat_kesulitan: level,
                    thumb: thumb,
                    bahan: bahan.split('bahan\n')[1],
                    langkah_langkah: tahap.split('tahap\n')[1]
                }
            }
            resolve(result)
        })
        .catch(reject)
    })
}


async function xHeroML(querry) { 
   return new Promise(async (resolve, reject) => { 
     try { 
       let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase() 
       const { data, status } = await axios.get('https://mobile-legends.fandom.com/wiki/' + upper); 
       if (status === 200) { 
         const $ = cheerio.load(data); 
         let atributes = [] 
         let rill = [] 
         let rull = [] 
         let rell = [] 
         let hero_img = $('figure.pi-item.pi-image > a > img').attr('src') 
         let desc = $('div.mw-parser-output > p:nth-child(6)').text() 
         $('.mw-parser-output > table:nth-child(9) > tbody > tr').each((u, i) => { 
           let _doto = [] 
           $(i).find('td').each((o, p) => { _doto.push($(p).text().trim()) }) 
           if (_doto.length === 0) return 
           atributes.push({ 
             attribute: _doto[0], 
             level_1: _doto[1], 
             level_15: _doto[2], 
             growth: _doto.pop() 
           }) 
         }) 
         $('div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font').each((i, u) => { rill.push($(u).text().trim()) }) 
         $('aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default').each((i, u) => { rull.push($(u).html()) }) 
         const _$ = cheerio.load(rull[1]) 
         _$('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((l, m) => { 
           rell.push(_$(m).text().trim().replace(/\n/g, ':').replace(/\t/g, '')) 
         }) 
         const result = rell.reduce((acc, curr) => { 
           const [key, value] = curr.split('::'); 
           acc[key] = value; 
           return acc; 
         }, {}); 
         let anu = { 
           hero_img: hero_img, 
           desc: desc, 
           release: rill[0], 
           role: rill[1], 
           specialty: rill[2], 
           lane: rill[3], 
           price: rill[4], 
           gameplay_info: { 
             durability: rill[5], 
             offense: rill[6], 
             control_effect: rill[7], 
             difficulty: rill[8], 
           }, 
           story_info_list: result, 
           story_info_array: rell, 
           attributes: atributes 
         } 
         resolve(anu) 
       } else if (status === 400) { 
         resolve({ mess: 'hh'}) 
       } 
       console.log(status) 
     } catch (err) { 
       resolve({ mess: 'asu'}) 
     } 
   }) 
 }

async function tiktok(URL) {
    return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
            axios.request({
                url: 'https://musicaldown.com/id/download',
                method: 'post',
                data: new URLSearchParams(Object.entries(data)),
                headers: {
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                    'cookie': res.headers["set-cookie"]
                }
            }).then(respon => {
                const ch = cheerio.load(respon.data)
                axios.request({
                    url: 'https://musicaldown.com/id/mp3',
                    method: 'post',
                    headers: {
                        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                        'cookie': res.headers["set-cookie"]
                    }
                }).then(resaudio => {
                    const hc = cheerio.load(resaudio.data)
                    const result = {
                        pp: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img').attr('src'),
                        username: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2)').text(),
                        description: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)').text(),
                        video: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                        audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)').attr('href'),
                        video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
                    }
                    resolve(result)
                })
            })
        })
    })
}

async function artinama(value) {
    return new Promise((resolve, reject) => {
        axios.get('https://primbon.com/arti_nama.php?nama1='+value+'&proses=+Submit%21+')
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let fetchText = $('#body').text()
            let hasil
            try {
                hasil = {
                    status: true,
                    message: {
                        nama: value,
                        arti: fetchText.split('memiliki arti: ')[1].split('Nama:')[0].trim(),
                        catatan: 'Gunakan juga aplikasi numerologi Kecocokan Nama, untuk melihat sejauh mana keselarasan nama anda dengan diri anda.'
                    }
                }
            } catch {
                hasil = {
                    status: false,
                    message: `Tidak ditemukan arti nama "${value}" Cari dengan kata kunci yang lain.`
                }
            }
            resolve(hasil)
        })
    })
}


async function xBukaLapak(search) { 
   return new Promise(async (resolve, reject) => { 
     try { 
       const { data } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, { 
         headers: { 
           "user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0' 
         } 
       }) 
       const $ = cheerio.load(data); 
       const dat = []; 
       const b = $('a.slide > img').attr('src'); 
       $('div.bl-flex-item.mb-8').each((i, u) => { 
         const a = $(u).find('observer-tracker > div > div'); 
         const img = $(a).find('div > a > img').attr('src'); 
         if (typeof img === 'undefined') return 
  
         const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href'); 
         const title = $(a).find('.bl-product-card__description-name > p > a').text().trim(); 
         const harga = $(a).find('div.bl-product-card__description-price > p').text().trim(); 
         const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim(); 
         const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim(); 
  
         const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim(); 
         const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim(); 
         const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href'); 
  
         const res_ = { 
           title: title, 
           rating: rating ? rating : 'No rating yet', 
           terjual: terjual ? terjual : 'Not yet bought', 
           harga: harga, 
           image: img, 
           link: link, 
           store: { 
             lokasi: dari, 
             nama: seller, 
             link: link_sel 
           } 
         }; 
  
         dat.push(res_); 
       }) 
       if (dat.every(x => x === undefined)) return resolve({ developer: '@Zeltoria', mess: 'no result found' }) 
       resolve(dat) 
     } catch (err) { 
       console.error(err) 
     } 
   }) 
}

export {
    artinama,
    tiktok,
    cariresep,
    detailresep, 
    xHeroML,
    wiki,
    cerpen,
    soundcloud,
    nhentai, 
    remini,
    tafsir_mimpi,
    kecocokan,
    tanggal_pernikahan,
    rejeki_hoki_weton,
    sifat_usaha_bisnis,
    xBukaLapak
}