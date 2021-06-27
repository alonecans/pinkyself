/*
Base By FxSx
*/
const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");
const { exec } = require('child_process');
const caa = require('./whatsapp/message.js');
const speed = require('performance-now');
const ffmpeg = require('fluent-ffmpeg');
const conn = require('./whatsapp/connect');
const { color } = require('./lib/color');
const mess = JSON.parse(fs.readFileSync('./whatsapp/mess.json'));
const axios = require('axios');
const Exif = require('./lib/exif');
const { uptotele, uptonaufal, uploadFile } = require('./lib/uploadimage')
const exif = new Exif();

conn.connect()
const nuy = conn.nuy

fake = "Pinky Team"
fakeimage = fs.readFileSync("./media/pinky.jpeg")
prefix = '#'
blocked = []
baterai = {
    baterai: 0,
    cas: false
}
public = false

nuy.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
		blocked.push(i.replace('c.us','s.whatsapp.net'))
	}
})
nuy.on('CB:action,,battery', json => {
	const a = json[2][0][1].value
	const b = json[2][0][1].live
	baterai.baterai = a
	baterai.cas = b
})
nuy.on('message-update', async (msg) => { // THX TO BANG HANIF
	require('./antidelete/antidelete.js')(nuy, msg)
})
nuy.on('message-new', async(faa) => {
    try {
        if (!faa.message) return
		if (faa.key && faa.key.remoteJid == 'status@broadcast') return
        faa.message = (Object.keys(faa.message)[0] === 'ephemeralMessage') ? faa.message.ephemeralMessage.message : faa.message
		let infoMSG = JSON.parse(fs.readFileSync(`./antidelete/msg.data.json`))
		infoMSG.push(JSON.parse(JSON.stringify(faa)))
		fs.writeFileSync(`./antidelete/msg.data.json`, JSON.stringify(infoMSG, null, 2))
		const urutan_pesan = infoMSG.length
		if (urutan_pesan === 5000) {
			infoMSG.splice(0, 4300)
			fs.writeFileSync(`./antidelete/msg.data.json`, JSON.stringify(infoMSG, null, 2))
		}
        global.prefix
		const content = JSON.stringify(faa.message)
		const from = faa.key.remoteJid
		const type = Object.keys(faa.message)[0]
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		body = (type === 'conversation' && faa.message.conversation.startsWith(prefix)) ? faa.message.conversation : (type == 'imageMessage') && faa.message.imageMessage.caption.startsWith(prefix) ? faa.message.imageMessage.caption : (type == 'videoMessage') && faa.message.videoMessage.caption.startsWith(prefix) ? faa.message.videoMessage.caption : (type == 'extendedTextMessage') && faa.message.extendedTextMessage.text.startsWith(prefix) ? faa.message.extendedTextMessage.text : ''
		chats = (type === 'conversation') ? faa.message.conversation : (type === 'extendedTextMessage') ? faa.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(" ")
		const arg = chats.slice(command.length + 2, chats.length)

        const botNumber = nuy.user.jid
		const isGroup = from.endsWith('@g.us')
		const sender = faa.key.fromMe ? nuy.user.jid : isGroup ? faa.participant : faa.key.remoteJid
		const totalchat = await nuy.chats.all()
		const groupMetadata = isGroup ? await nuy.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupAdmins = isGroup ? caa.getGroupAdmins(groupMembers) : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const itsMe = faa.key.fromMe ? true : false
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}

        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
		if (itsMe){
			if (chats.toLowerCase() === `${prefix}self`){
				public = false
				caa.sendFakeStatus(from, `Sukses`, `Status: SELF`)
			}
			if (chats.toLowerCase() === 'status'){
				caa.sendFakeStatus(from, `STATUS: ${public ? 'PUBLIC' : 'SELF'}`)
			}/*
			if (chats.startsWith('>')){
				console.log(color('[EVAL]'), color(moment(faa.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Eval brooo`))
				return caa.reply(from, JSON.stringify(eval(chats.slice(2)), null, 2), faa)
			}*/
		}
		if (!public){
			if (!faa.key.fromMe) return
		}
	if (isCmd && !isGroup) {console.log(color('[CMD]'), color(moment(faa.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))}
        if (isCmd && isGroup) {console.log(color('[CMD]'), color(moment(faa.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(nuy.user.name), 'in', color(groupName))}
        switch (command) {
			case 'menu': case 'help':
				textnya = `	𝐗𝐈𝐍𝐙-𝐒𝐄𝐋𝐅𝐁𝐎𝐓

\`\`\`▢ ${prefix}sticker\`\`\`
\`\`\`▢ ${prefix}swm nama | author\`\`\`
\`\`\`▢ ${prefix}takestick namma | author\`\`\`
\`\`\`▢ ${prefix}colong <reply stiker>\`\`\`
\`\`\`▢ ${prefix}eval <java scripts>\`\`\`
\`\`\`▢ ${prefix}self\`\`\`
\`\`\`▢ ${prefix}public\`\`\`
\`\`\`▢ ${prefix}hidetag\`\`\`
\`\`\`▢ ${prefix}runtime\`\`\`
\`\`\`▢ ${prefix}speed\`\`\`
\`\`\`▢ ${prefix}mystat\`\`\`
\`\`\`▢ ${prefix}kontak\`\`\`
\`\`\`▢ ${prefix}hidetag\`\`\`
\`\`\`▢ ${prefix}term\`\`\`
\`\`\`▢ ${prefix}setreply\`\`\`
\`\`\`▢ ${prefix}setprefix\`\`\`
\`\`\`▢ ${prefix}setname\`\`\`
\`\`\`▢ ${prefix}setpp\`\`\`
\`\`\`▢ ${prefix}setbio\`\`\`
\`\`\`▢ ${prefix}fdeface\`\`\`
\`\`\`▢ ${prefix}fakethumbnail\`\`\`
\`\`\`▢ ${prefix}setthumb\`\`\`
\`\`\`▢ ${prefix}getpic\`\`\`
\`\`\`▢ ${prefix}stickertag\`\`\`
\`\`\`▢ ${prefix}imgtag\`\`\`
\`\`\`▢ ${prefix}kontaktag\`\`\`
\`\`\`▢ ${prefix}doctag\`\`\`
\`\`\`▢ ${prefix}giftag\`\`\`
\`\`\`▢ ${prefix}tahta teks\`\`\`
\`\`\`▢ ${prefix}pubg teks1|teks2\`\`\`
\`\`\`▢ ${prefix}promote\`\`\`
\`\`\`▢ ${prefix}demote\`\`\`
\`\`\`▢ ${prefix}kick\`\`\`
\`\`\`▢ ${prefix}add\`\`\`
\`\`\`▢ ${prefix}creategrup nama|tag\`\`\`
\`\`\`▢ ${prefix}getgrup\`\`\`
\`\`\`▢ ${prefix}upstatus text\`\`\`
\`\`\`▢ ${prefix}tovideo\`\`\`
\`\`\`▢ ${prefix}togif\`\`\`
\`\`\`▢ ${prefix}spam teks|jumlah spam\`\`\`
\`\`\`▢ ${prefix}imgtourl\`\`\`
\`\`\`▢ ${prefix}ephemeral <teks>\`\`\`
\`\`\`▢ ${prefix}antidelete\`\`\`
\`\`\`▢ ${prefix}tourl <media>\`\`\`

*© Xinz-Team*`
				caa.sendFakeStatusWithImg(from, fakeimage, textnya, fake)
				break
            case 'test':
                caa.sendText(from, 'oke')
				break
			case 'public':
				public = true
				caa.sendFakeStatus(from, `Status: PUBLIC`, fake)
				break
			case 'exif':
				if (!itsMe) return
				if (args.length < 1) return caa.reply(from, `Penggunaan ${prefix}exif nama|author`, faa)
				if (!arg.split('|')) return caa.reply(from, `Penggunaan ${prefix}exif nama|author`, faa)
				exif.create(arg.split('|')[0], arg.split('|')[1])
				caa.reply(from, 'sukses', faa)
				break
			case 'sticker':
			case 'stiker':
			case 's':
				if (isMedia && !faa.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								caa.reply(from, mess.error.api, faa)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return caa.reply(from, mess.error.api, faa)
									caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else if ((isMedia && faa.message.videoMessage.fileLength < 10000000 || isQuotedVideo && faa.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					caa.reply(from, mess.wait, faa)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								caa.reply(from, mess.error.api, faa)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return caa.reply(from, mess.error.api, faa)
									caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
									fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else {
					caa.reply(from, `Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`, faa)
				}
				break
			case 'swm':
			case 'stickerwm':
				if (isMedia && !faa.message.videoMessage || isQuotedImage) {
					if (!arg.includes('|')) return caa.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, faa)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								caa.reply(from, mess.error.api, faa)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return caa.reply(from, mess.error.api, faa)
									caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
									fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else if ((isMedia && faa.message.videoMessage.fileLength < 10000000 || isQuotedVideo && faa.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					if (!arg.includes('|')) return caa.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, faa)
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					caa.reply(from, mess.wait, faa)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								caa.reply(from, mess.error.api, faa)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return caa.reply(from, mess.error.api, faa)
									caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)									
									fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
									fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else {
					caa.reply(from, `Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`, id)
				}
				break
			case 'takestick':
				if (!isQuotedSticker) return caa.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, faa)
				const pembawm = body.slice(11)
				if (!pembawm.includes('|')) return caa.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, faa)
				const encmedia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
				const packname = pembawm.split('|')[0]
				const author = pembawm.split('|')[1]
				exif.create(packname, author, `takestick_${sender}`)
				exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return caa.reply(from, mess.error.api, faa)
					caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
					fs.unlinkSync(media)
					fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
				})
				break
	  		 case 'ephemeral':
				if (!q) return caa.reply(from, 'textnya apa brohh', faa)
				nuy.sendMessage(from, `${q}`,
					MessageType.text, {
					sendEphemeral: true,
					thumbnail: fs.readFileSync('./media/pinky.jpeg')
					})
				break
			case 'colong':
				if (!isQuotedSticker) return caa.reply(from, `Reply sticker dengan caption *${prefix}colong*`, faa)
				const encmediia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const meidia = await nuy.downloadAndSaveMediaMessage(encmediia, `./sticker/${sender}`)
				exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return caa.reply(from, mess.error.api, faa)
					caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
					fs.unlinkSync(meidia)
				})
				break
			case 'hidetag':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}hidetag teks`, faa)
				caa.hideTag(from, arg)
				break
			case 'runtime':
				run = process.uptime()
				let text = caa.runtime(run)
				caa.sendFakeStatus(from, text, `Runtime bro`)
				break
			case 'speed': case 'ping':
				let timestamp = speed();
				let latensi = speed() - timestamp
				caa.sendFakeStatus(from, `Speed: ${latensi.toFixed(4)}second`, fake)
				break
			case 'mystat': case 'mystatus':
				let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = nuy.user.phone
                anu = process.uptime()
                teskny = `*V. Whatsapp :* ${wa_version}
*Baterai :* ${baterai.baterai}%
*Charge :* ${baterai.cas === 'true' ? 'Ya' : 'Tidak'}
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}

*Group Chat :* ${giid.length}
*Personal Chat :* ${totalchat.length - giid.length}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${caa.runtime(anu)}`
				caa.sendFakeStatus(from, teskny, fake)
				break
			case 'kontak':
				argz = arg.split('|')
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, faa)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					caa.sendKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					caa.sendKontak(from, argz[0], argz[1])
				}
				break
			case 'term':
				if (!itsMe) return
				if (!arg) return
				exec(arg, (err, stdout) => {
					if (err) return caa.sendFakeStatus(from, err, fake)
					if (stdout) caa.sendFakeStatus(from, stdout, fake)
				})
				break
			case 'setreply':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}setreply teks`, faa)
				fake = arg
				caa.sendFakeStatus(from, `Sukses`, fake)
				break
			case 'setprefix':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}setprefix prefix`, faa)
				prefix = arg
				caa.sendFakeStatus(from, `Prefix berhasil diubah menjadi ${prefix}`, fake)
				break
			case 'setname':
				if (!itsMe) return
				if (!arg) return caa.reply(from, 'masukkan nama', faa)
				caa.setName(arg)
				.then((res) => caa.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => caa.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'setbio':
				if (!itsMe) return
				if (!arg) return caa.reply(from, 'masukkan bio', faa)
				caa.setBio(arg)
				.then((res) => caa.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => caa.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'fdeface': case 'hack':
				if (!arg) return caa.reply(from, `Penggunaaan ${prefix}fdeface url|title|desc|url\n\nContoh : ${prefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, faa)
				argz = arg.split("|")
				if (!argz) return caa.reply(from, `Penggunaaan ${prefix}fdeface url|title|desc|url\n\nContoh : ${prefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, faa)
				if ((isMedia && !faa.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : faa
					let media = await nuy.downloadMediaMessage(encmedia)
					caa.sendFakeThumb(from, argz[0], argz[1], argz[2], argz[3], media)
				} else {
					caa.sendFakeThumb(from, argz[0], argz[1], argz[2], argz[3])
				}
				break
			case 'fakethumbnail': case 'fthumbnail': case 'fakethumb':
				if ((isMedia && !faa.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : faa
					let media = await nuy.downloadMediaMessage(encmedia)
					caa.sendFakeImg(from, media, arg, fakeimage, faa)
				} else {
					caa.reply(from, `Kirim gambar atau reply dengan caption ${prefix}fakethumb caption`, faa)
				}
				break
			case 'setthumb':
				boij = JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await nuy.downloadMediaMessage(boij)
				fs.writeFileSync(`./media/pinky.jpeg`, delb)
				fakeimage = fs.readFileSync(`./media/caa.jpeg`)
				caa.sendFakeStatus(from, `Sukses`, fake)
				break
			case 'getpic':
				if (faa.message.extendedTextMessage != undefined){
					mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					try {
						pic = await nuy.getProfilePicture(mentioned[0])
					} catch {
						pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
					}
					thumb = await caa.getBuffer(pic)
					caa.sendImage(from, thumb)
				}
				break
			case 'imgtag':
				if ((isMedia && !faa.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : faa
					let media = await nuy.downloadMediaMessage(encmedia)
					caa.hideTagImg(from, media)
				} else {
					caa.reply(from, `Kirim gambar atau reply dengan caption ${prefix}imgtag caption`, faa)
				}
				break
			case 'sticktag': case 'stickertag':
				if (!isQuotedSticker) return caa.reply(from, `Reply sticker dengan caption *${prefix}stickertag*`, faa)
				let encmediai = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				let mediai = await nuy.downloadMediaMessage(encmediai)
				caa.hideTagSticker(from, mediai)
				break
			case 'kontaktag':
				argz = arg.split('|')
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, faa)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					caa.hideTagKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					caa.hideTagKontak(from, argz[0], argz[1])
				}
				break
			case 'doctag':  case 'dokumentag': //by Dehanjing
		        if (!isQuotedDocument) return caa.reply(from, `Reply Document dengan caption *${prefix + command}*`, faa)
                quoted = JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                download = await nuy.downloadMediaMessage(quoted)
                await fs.writeFileSync(`doc.txt`, download)
                var group = await nuy.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                nuy.sendMessage(from, fs.readFileSync(`doc.txt`), document, { contextInfo: {mentionedJid: mem }, quoted: faa, mimetype: 'text/plain' })
			    await fs.unlinkSync(`doc.txt`)
			    break
		    case 'giftag':   case 'giphytag': //by Dehanjing
                if (!isQuotedVideo) return reply(`Reply Gif nya dengan caption ${prefix + command}`)
                quoted = JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                download = await nuy.downloadMediaMessage(quoted)
                await fs.writeFileSync(`giftag.gif`, download)
                var group = await nuy.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                thumb = fs.readFileSync(`giftag.gif`)
                nuy.sendMessage(from, thumb, video, { contextInfo: {mentionedJid: mem }, quoted: faa, mimetype: 'video/gif', thumbnail: thumb })
			    await fs.unlinkSync(`giftag.gif`)
			    break
			case 'tahta':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}tahta teks`, faa)
				caa.sendMediaURL(from, `https://api.zeks.xyz/api/hartatahta?text=${arg}&apikey=apivinz`)
				break
			case 'pubg':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}pubg teks1|teks2`, faa)
				argz = arg.split("|")
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}pubg teks1|teks2`, faa)
				axios.get(`https://xinzbot-api.herokuapp.com/api/textmaker/game?text=${argz[0]}&text2=${argz[1]}&theme=pubg&apikey=XinzBot`)
				.then((res) => caa.sendMediaURL(from, res.data.result.url))
				.catch((err) => {
					console.log(err)
					caa.reply(from, mess.error.api, faa)
				})
				break
			case 'togif':
				if (!isQuotedSticker) return reply(from, 'Reply stiker nya', faa)
				if (faa.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
					const encmedia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					const uploadn = await uptonaufal(media, Date.now() + '.webp')
					const anjj = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${uploadn.result.image}`)
					thumb = await caa.getBuffer(anjj.data.result)
					caa.sendGif(from, thumb)
					fs.unlinkSync(media)
				} else {
					caa.reply(from, `Harus sticker bergerak`, faa)
				}
				break
			case 'toimg': case 'tovideo':
				if (!isQuotedSticker) return caa.reply(from, 'Reply stiker nya', faa)
				if (faa.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
					const encmedia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					const uploadn = await uptonaufal(media, Date.now() + '.webp')
					const anjj = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${uploadn.result.image}`)
					await caa.sendMediaURL(from, anjj.data.result, 'Nih')
					fs.unlinkSync(media)
				} else {
					const encmedia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran = caa.getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) {
							caa.reply(from, `gagal`, faa)
							fs.unlinkSync(ran)
						} else {
							buffer = fs.readFileSync(ran)
							caa.sendImage(from, buffer, 'nih', faa)
							fs.unlinkSync(ran)
						}
					})
				}
				break
			case 'shutdown':
				await caa.FakeTokoForwarded(from, `Bye...`, fake)
				await caa.sleep(5000)
				nuy.close()
				break
			case 'spam':
				if (!itsMe) return
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}spam teks|jumlahspam`, faa)
				argz = arg.split("|")
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}spam teks|jumlah`, faa)
				if (isNaN(argz[1])) return caa.reply(from, `harus berupa angka`, faa)
				for (let i = 0; i < argz[1]; i++){
					caa.sendText(from, argz[0])
				}
				break
			case 'promote':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}promote @tag atau nomor`, faa)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					await caa.FakeTokoForwarded(from, `sukses`, fake)
					caa.promote(from, mentioned)
				} else {
					await caa.FakeTokoForwarded(from, `sukses`, fake)
					caa.promote(from, [args[0] + '@s.whatsapp.net'])
				}
				break
			case 'demote':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}demote @tag atau nomor`, faa)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					await caa.FakeTokoForwarded(from, `sukses`, fake)
					caa.demote(from, mentioned)
				} else {
					await caa.FakeTokoForwarded(from, `sukses`, fake)
					caa.demote(from, [args[0] + '@s.whatsapp.net'])
				}
				break
			case 'kick':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}kick @tag atau nomor`, faa)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					await caa.FakeTokoForwarded(from, `Bye...`, fake)
					caa.kick(from, mentioned)
				} else {
					await caa.FakeTokoForwarded(from, `Bye...`, fake)
					caa.kick(from, [args[0] + '@s.whatsapp.net'])
				}
				break
			case 'add':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}kick 628xxxx`, faa)
				caa.add(from, [args[0] + '@s.whatsapp.net'])
				caa.FakeTokoForwarded(from, `Sukses`, fake)
				break
			case 'upstatus':
				if (!itsMe) return
				if (!arg) return caa.reply(from, `Penggunaan \n${prefix}upstatus text\n${prefix}upstatus caption <reply atau kirim video / img>`, faa)
				if (isMedia && !faa.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					caa.upImgStatus(media, arg).then(() => { caa.FakeTokoForwarded(from, 'Sukses', fake) })
				} else if ((isMedia || isQuotedVideo )) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					caa.upVidStatus(media, arg).then(() => { caa.FakeTokoForwarded(from, 'Sukses', fake) })
				} else {
					await caa.upTextStatus(arg).then(() => { caa.FakeTokoForwarded(from, 'Sukses', fake) })
				}
				break
			case 'getgrup': case 'getgroup': case 'getg':
				const ingfo = await caa.getGroup(totalchat)
				let txt = `Ingfo grup\nJumlah Grup: ${ingfo.length}\n\n`
				for (let i = 0; i < ingfo.length; i++){
					txt += `Nama grup : ${ingfo[i].subject}\nID grup : ${ingfo[i].id}\nDibuat : ${moment(`${ingfo[i].creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\nJumlah Peserta : ${ingfo[i].participants.length}\n\n`
				}
				caa.FakeTokoForwarded(from, txt, fake)
				break
			case 'creategrup': case 'creategroup': case 'createg':
				argz = arg.split('|')
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					nuy.groupCreate(argz[0], mentioned)
					.then((res) => caa.FakeTokoForwarded(from, JSON.stringify(res, null, 2).toString(), fake))
					.catch((err) => console.log(err))
				} else {
					caa.reply(from, `Penggunaan ${prefix}creategrup namagrup|@tag`, faa)
				}
				break
			case 'imgtourl':
				const encmediiia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
				const mediaq = await nuy.downloadMediaMessage(encmediiia)
				const upli = await uptotele(mediaq)
				caa.reply(from, `${upli}`, faa)
				break
			case 'tourl':
				let a = JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				let b = await nuy.downloadAndSaveMediaMessage(a)
				let c = await uploadFile(b)
				caa.reply(from, c.result, faa)
				fs.unlinkSync(b)
				break
			case 'antidelete':
				if (!itsMe) return
				const dataRevoke = JSON.parse(fs.readFileSync('./antidelete/gc-revoked.json'))
				const dataCtRevoke = JSON.parse(fs.readFileSync('./antidelete/ct-revoked.json'))
				const dataBanCtRevoke = JSON.parse(fs.readFileSync('./antidelete/ct-revoked-banlist.json'))
				const isRevoke = dataRevoke.includes(from)
				const isCtRevoke = dataCtRevoke.data
				const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
				if (args.length === 0) return nuy.sendMessage(from, `Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`, MessageType.text)
				if (args[0] == 'aktif') {
					if (isGroup) {
						if (isRevoke) return nuy.sendMessage(from, `Antidelete telah diaktifkan di grup ini sebelumnya!`, MessageType.text)
						dataRevoke.push(from)
						fs.writeFileSync('./antidelete/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						nuy.sendMessage(from, `*Succes Enable Antidelete Grup!*`, MessageType.text)
					} else if (!isGroup) {
						nuy.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctaktif*`, MessageType.text)
					}
				} else if (args[0] == 'ctaktif') {
					if (!isGroup) {
						if (isCtRevoke) return nuy.sendMessage(from, `Antidelete telah diaktifkan di semua kontak sebelumnya!`, MessageType.text)
						dataCtRevoke.data = true
						fs.writeFileSync('./antidelete/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						nuy.sendMessage(from, `Antidelete diaktifkan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						nuy.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete aktif*`, MessageType.text)
					}
				} else if (args[0] == 'banct') {
					if (isBanCtRevoke) return nuy.sendMessage(from, `kontak ini telah ada di database banlist!`, MessageType.text)
					if (args.length === 1 || args[1].startsWith('0')) return nuy.sendMessage(from, `Masukan nomer diawali dengan 62! contoh 62859289xxxxx`, MessageType.text)
					dataBanCtRevoke.push(args[1] + '@s.whatsapp.net')
					fs.writeFileSync('./antidelete/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
					nuy.sendMessage(from, `Kontak ${args[1]} telah dimasukan ke banlist antidelete secara permanen!`, MessageType.text)
				} else if (args[0] == 'mati') {
					if (isGroup) {
						const index = dataRevoke.indexOf(from)
						dataRevoke.splice(index, 1)
						fs.writeFileSync('./antidelete/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						nuy.sendMessage(from, `*Succes disable Antidelete Grup!*`, MessageType.text)
					} else if (!isGroup) {
						nuy.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctmati*`, MessageType.text)
					}
				} else if (args[0] == 'ctmati') {
					if (!isGroup) {
						dataCtRevoke.data = false
						fs.writeFileSync('./antidelete/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						nuy.sendMessage(from, `Antidelete dimatikan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						nuy.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete mati*`, MessageType.text)
					}
				}
				break
			case 'setpp': case 'setprofilepicture':
				if (!itsMe) return
				if (isMedia && !faa.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadMediaMessage(encmedia)
					nuy.updateProfilePicture(nuy.user.jid, media)
					.then((res) => caa.FakeTokoForwarded(from, JSON.stringify(res, null, 2).toString(), fake))
					.catch((err) => console.log(err))
				} else {
					caa.reply(from, `Kirim gambar atau reply gambar dengan caption ${prefix}setpp`, faa)
				}
				break
			case 'eval':
				if (!itsMe) return
				let code = body.slice(6)
				try {

					if (!code) return caa.reply(from, 'No JavaScript Code', faa)
					let evaled;

					if (code.includes("--silent") && code.includes("--async")) {
						code = code.replace("--async", "").replace("--silent", "");

						return await eval(`(async () => { ${code} })()`)
					} else if (code.includes("--async")) {
						code = code.replace("--async", "");

						evaled = await eval(`(async () => { ${code} })()`);
					} else if (code.includes("--silent")) {
						code = code.replace("--silent", "");

						return await eval(code);
					} else evaled = await eval(code);

					/*if (typeof evaled !== "string")
						evaled = require("util").inspect(evaled, {
							depth: 0
						*/

					let output = clean(evaled);
					caa.reply(from, JSON.stringify(evaled, null, 2), faa)

				} catch (err) {
					console.error(err)
					const error = clean(err)
					caa.reply(from, error, faa)
				}

				function clean(text) {
					if (typeof text === "string")
						return text
							.replace(/`/g, `\`${String.fromCharCode(8203)}`)
							.replace(/@/g, `@${String.fromCharCode(8203)}`);
					// eslint-disable-line prefer-template
					else return text;
				}
				break
			default:
				break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
})
