/*
Base By FxSx
*/
const {
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
  ChatModification,
  waChatKey,
  WA_DEFAULT_EPHEMERAL,
  mentionedJid,
  processTime
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");
const { exec } = require('child_process');
const caa = require('./whatsapp/message.js');
const speed = require('performance-now');
const ffmpeg = require('fluent-ffmpeg');
const imageToBase64 = require('image-to-base64');
const conn = require('./whatsapp/connect');
const { color } = require('./lib/color');
const mess = JSON.parse(fs.readFileSync('./whatsapp/mess.json'));
const cd = 4.32e+7
const axios = require('axios');
const lolis = require('lolis.life');
const loli = new lolis();
const Exif = require('./lib/exif');
const exif = new Exif();
const { uptotele, uptonaufal, uploadFile } = require('./lib/uploadimage')

conn.connect()
const nuy = conn.nuy

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

fake = "Pinky Team"
fakeimage = fs.readFileSync("./media/pinky.jpeg")
prefix = '#'
fxsx = '❑'
namo = 'PinkyBot'
ator = 'NuyFaa'
lolkey = '7f5a6556983b0bf183028c20'
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

const antilink = JSON.parse(fs.readFileSync('./pinky/antilink.json'))

var date = new Date();

var tahun = date.getFullYear();

var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jams = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();


switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
            switch(jams){
                case 0: jams = "Tengah Malam🌃"; break;
                case 1: jams = "Tengah Malam🌃"; break;
                case 2: jams = "Tengah Malam🌃"; break;
                case 3: jams = "Tengah Malam🌃"; break;
                case 4: jams = "Sahur🍙"; break;
                case 5: jams = "Subuh🕌"; break;
                case 6: jams = "Pagi🏙"; break;
                case 7: jams = "Pagi🏙"; break;
                case 8: jams = "Pagi🏙"; break;
                case 9: jams = "Pagi🏙"; break;
                case 10: jams = "Pagi🏙"; break;
                case 11: jams = "Siang🌁"; break;
                case 12: jams = "Dzuhur🕌"; break;
                case 13: jams = "Siang🌁"; break;
                case 14: jams = "Siang🌁"; break;
                case 15: jams = "Ashar🕌"; break;
                case 16: jams = "Sore🌇"; break;
                case 17: jams = "Petang🌆"; break;
                case 18: jams = "Maghrib🕌"; break;
                case 19: jams = "Isya🕌"; break;
                case 20: jams = "Malam🌆"; break;
                case 21: jams = "Malam🌆"; break;
                case 22: jams = "Oyasumi Nassai🌌"; break;
                case 23: jams = "Tengah Malam🌃"; break;
            }
var tampilTanggal = hari + " "+ tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "Jam: " + jams + ":" + menit + ":" + detik;
var tampilHari = "" + jams;

nuy.on('message-update', async (msg) => {
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
		var pes = (type === 'conversation' && faa.message.conversation) ? faa.message.conversation : (type == 'imageMessage') && faa.message.imageMessage.caption ? faa.message.imageMessage.caption : (type == 'videoMessage') && faa.message.videoMessage.caption ? faa.message.videoMessage.caption : (type == 'extendedTextMessage') && faa.message.extendedTextMessage.text ? faa.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const messagesCaa = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(" ")
		const arg = chats.slice(command.length + 2, chats.length)
        const botNumber = nuy.user.jid
		const isGroup = from.endsWith('@g.us')
		const sender = faa.key.fromMe ? nuy.user.jid : isGroup ? faa.participant : faa.key.remoteJid
		pushname = nuy.contacts[sender] != undefined ? nuy.contacts[sender].vname || nuy.contacts[sender].notify : undefined
		const totalchat = await nuy.chats.all()
		const tescuk = ["0@s.whatsapp.net"]
		const groupMetadata = isGroup ? await nuy.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupAdmins = isGroup ? caa.getGroupAdmins(groupMembers) : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const mentionByTag = type == "extendedTextMessage" && faa.message.extendedTextMessage.contextInfo != null ? faa.message.extendedTextMessage.contextInfo.mentionedJid : []
		const mentionByReply = type == "extendedTextMessage" && faa.message.extendedTextMessage.contextInfo != null ? faa.message.extendedTextMessage.contextInfo.participant || "" : ""
		const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
		mention != undefined ? mention.push(mentionByReply) : []
		const mentionUser = mention != undefined ? mention.filter(n => n) : []
        
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isAntilink = isGroup ? antilink.includes(from) : false
        const nuyfaa = faa.key.fromMe ? true : false
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}

        function addMetadata(packname, author) {	
	      if (!packname) packname = 'PinkyBot'; if (!author) author = 'MayCa';	
	      author = author.replace(/[^a-zA-Z0-9]/g, '');	
          let name = `${author}_${packname}`
       	  if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	      const json = {	
		       "sticker-pack-name": packname,
		       "sticker-pack-publisher": author,
	      }
	      const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	      const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	      let len = JSON.stringify(json).length	
	      let last	

	      if (len > 256) {	
		       len = len - 256	
		       bytes.unshift(0x01)	
	      } else {	
		       bytes.unshift(0x00)	
	      }	

	      if (len < 16) {	
		       last = len.toString(16)	
		       last = "0" + len	
	      } else {	
		       last = len.toString(16)	
	      }	

	      const buf2 = Buffer.from(last, "hex")	
	      const buf3 = Buffer.from(bytes)	
	      const buf4 = Buffer.from(JSON.stringify(json))	

	      const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	      fs.writeFile(`./${name}.exif`, buffer, (err) => {	
	        	return `./${name}.exif`	
	     })	

        }

        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
		const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
		if (nuyfaa){
			if (chats.toLowerCase() === `${prefix}self`){
				public = false
				caa.sendFakeStatus(from, `Sukses`, `Status: SELF`)
			}
			if (chats.toLowerCase() === 'status'){
				caa.sendFakeStatus(from, `STATUS: ${public ? 'PUBLIC' : 'SELF'}`)
			}
		}
		if (!public){
			if (!faa.key.fromMe) return
		}
      if (messagesCaa.includes('manca')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/manca.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('koplo')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/koplo.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('berkali')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/berkali.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('bam')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/bam.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('bermain')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/bermain.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('ohayo')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/ohayo.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('jamet')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/jamet.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('desah')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/desah.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('loplop')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/lop.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('magic')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/magic.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('nana')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/nana.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('pala')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/pala.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('pagi')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/pagi.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('malam')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/malam.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('pale')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/pale.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('pam')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/pam.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('pembohong')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/pembohong.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('pota')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/pota.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('sensei')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/sensei.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('tante')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/tante.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('assalammualaikum')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/waalaikumsalam.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('maulaya')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/maulaya.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes('berpaling')){
      nuy.updatePresence(from, Presence.composing)
      const loli = fs.readFileSync('./mp3/berpalinghati.mp3')
      caa.sendAudio(from, loli, fake)
      }
      if (messagesCaa.includes("://chat.whatsapp.com/")){
		if (!isGroup) return
		if (!isAntilink) return
		if (isGroupAdmins) return caa.reply(from, 'Admin Grup Mah Bebas:v')
		nuy.updatePresence(from, Presence.composing)
		if (messagesCaa.includes("#izinadmin")) return caa.reply(from, '#izinadmin diterima')
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		caa.reply(from, `*「 LINK GRUP TERDETEKSI 」*`)
		setTimeout( () => {
			caa.kick(from, [kic]).catch((err)=>{reply(`*ERR:* ${err}`)})
		}, 3000)
		setTimeout( () => {
			nuy.updatePresence(from, Presence.composing)
			caa.reply(from, 'SEEE YUO KACK;)')
		}, 0)
	  }
   	  if (isCmd && !isGroup) {console.log(color('[CMD]'), color(moment(faa.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))}
        if (isCmd && isGroup) {console.log(color('[CMD]'), color(moment(faa.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(nuy.user.name), 'in', color(groupName))}
        switch (command) {
			case 'menu': case 'help':
				textnya = `Selamat ${tampilHari}

> *Info Bot*

${fxsx} ${prefix}runtime
${fxsx} ${prefix}speed
${fxsx} ${prefix}mystat

> *Menu Grup*

${fxsx} ${prefix}stickertag
${fxsx} ${prefix}imgtag
${fxsx} ${prefix}kontaktag
${fxsx} ${prefix}hidetag
${fxsx} ${prefix}doctag
${fxsx} ${prefix}giftag
${fxsx} ${prefix}promote
${fxsx} ${prefix}demote
${fxsx} ${prefix}kick
${fxsx} ${prefix}add
${fxsx} ${prefix}setname
${fxsx} ${prefix}setbio
${fxsx} ${prefix}setpp
${fxsx} ${prefix}getpic
${fxsx} ${prefix}getgrup
${fxsx} ${prefix}antidelete aktif/mati
${fxsx} ${prefix}antilink on/off

> *Menu Sticker* 

${fxsx} ${prefix}sticker
${fxsx} ${prefix}swm
${fxsx} ${prefix}takestick
${fxsx} ${prefix}colong
${fxsx} ${prefix}tovideo
${fxsx} ${prefix}togif
${fxsx} ${prefix}toimg

> *Menu Random*

${fxsx} ${prefix}kontak
${fxsx} ${prefix}tahta
${fxsx} ${prefix}fdeface
${fxsx} ${prefix}fakethumbnail
${fxsx} ${prefix}kalender
${fxsx} ${prefix}spam
${fxsx} ${prefix}imgtourl
${fxsx} ${prefix}ephemeral
${fxsx} ${prefix}tourl

> *Owner*

${fxsx} ${prefix}term
${fxsx} ${prefix}setreply
${fxsx} ${prefix}setprefix
${fxsx} ${prefix}sethias
${fxsx} ${prefix}creategrup
${fxsx} ${prefix}upstatus
${fxsx} ${prefix}self
${fxsx} ${prefix}public
${fxsx} ${prefix}setthumb
${fxsx} ${prefix}eval

*${fake}*`
				caa.sendFakeStatusWithImg(from, fakeimage, textnya, fake)
				break
            case 'pinky':
           await nuy.toggleDisappearingMessages(from)
           caa.reply("yahaha")
           break
            case 'unpin':
                if (!nuyfaa) return reply('This command only for User')
                nuy.modifyChat(from, ChatModification.unpin)
                caa.reply('*succes unpin this chat*')
                console.log('unpin chat = ' + from)
                break
            case 'pin':
                if (!nuyfaa) return reply('This command only for User')
                nuy.modifyChat(from, ChatModification.pin)
                caa.reply('*succes pin this chat*')
                console.log('pinned chat = ' + from)
                break
            case 'test':
                caa.sendText(from, 'oke')
				break
			case 'public':
				public = true
				caa.sendFakeStatus(from, `Status: PUBLIC`, fake)
				break
			case 'exif':
				if (!nuyfaa) return
				if (args.length < 1) return caa.reply(from, `Penggunaan ${prefix}exif nama|author`, fake)
				if (!arg.split('|')) return caa.reply(from, `Penggunaan ${prefix}exif nama|author`, fake)
				exif.create(arg.split('|')[0], arg.split('|')[1])
				caa.reply(from, 'Sukses', fake)
				break
            case 'kalender':
            caa.sendFakeStatus(from, `${tampilTanggal}`, fake)
            break
// Download Random
            case 'tiktok': 
				if (args.length < 1) return caa.reply('Urlnya mana sayang?')
				if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.lv)
					caa.reply(from, 'Sedang Diproses...', fake)
					pinky = args[0]
                    anu = await fetchJson(`http://lolhuman.herokuapp.com/api/tiktok?apikey=${lolkey}&url=${pinky}`, {method: 'get'})
					if (anu.error) return caa.reply(from, mess.error.api, fake)
					bufferL = await getBuffer(anu.result.link)
                    caa.sendMediaURL(from, buffer, faa)
				    break
// Batas Aman 
            case 'sticker':
	        case 'stiker':
		    case 'stick':
		    case 's':
					if ((isMedia && !faa.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : faa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								caa.reply(from, mess.error.api, fake)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									caa.sendSticker(from, fs.readFileSync(ran), sticker, faa)
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && faa.message.videoMessage.seconds < 11 || isQuotedVideo && faa.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : faa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								caa.reply(from, mess.error.api, fake)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									caa.sendSticker(from, fs.readFileSync(ran), sticker, faa)
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						caa.reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`, fake)
					}
					break
			case 'swm':
			case 'stickerwm':
				if (isMedia && !faa.message.videoMessage || isQuotedImage) {
					if (!arg.includes('|')) return caa.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, fake)
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
								caa.reply(from, mess.error.api, fake)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return caa.reply(from, mess.error.api, fake)
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
					if (!arg.includes('|')) return caa.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, fake)
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					caa.reply(from, mess.wait, fake)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								caa.reply(from, mess.error.api, fake)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return caa.reply(from, mess.error.api, fake)
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
				if (!isQuotedSticker) return caa.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, fake)
				const pembawm = body.slice(11)
				if (!pembawm.includes('|')) return caa.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, fake)
				const encmedia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const media = await nuy.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
				const packname = pembawm.split('|')[0]
				const author = pembawm.split('|')[1]
				exif.create(packname, author, `takestick_${sender}`)
				exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return caa.reply(from, mess.error.api, fake)
					caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
					fs.unlinkSync(media)
					fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
				})
				break
	  		 case 'ephemeral':
				if (!q) return caa.reply(from, 'textnya apa brohh', fake)
				nuy.sendMessage(from, `${q}`,
					MessageType.text, {
					sendEphemeral: true,
					thumbnail: fs.readFileSync('./media/pinky.jpeg')
					})
				break
			case 'colong':
				if (!isQuotedSticker) return caa.reply(from, `Reply sticker dengan caption *${prefix}colong*`, fake)
				const encmediia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const meidia = await nuy.downloadAndSaveMediaMessage(encmediia, `./sticker/${sender}`)
				exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return caa.reply(from, mess.error.api, fake)
					caa.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), faa)
					fs.unlinkSync(meidia)
				})
				break
			case 'hidetag':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}hidetag teks`, fake)
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
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, fake)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					caa.sendKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					caa.sendKontak(from, argz[0], argz[1])
				}
				break
            case 'broadcast': case 'bc':
                if (!nuyfaa) return
                text = args.join(" ")
                for (let chat of totalChat) {
                    await caa.sendFakeStatus(chat.jid, text, fake)
                }
                break
			case 'term':
				if (!nuyfaa) return
				if (!arg) return
				exec(arg, (err, stdout) => {
					if (err) return caa.sendFakeStatus(from, err, fake)
					if (stdout) caa.sendFakeStatus(from, stdout, fake)
				})
				break
			case 'setreply':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}setreply teks`, fake)
				fake = arg
				caa.reply(from, `Sukses`, fake)
				break
			case 'setprefix':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}setprefix prefix`, fake)
				prefix = arg
				caa.sendFakeStatus(from, `Prefix berhasil diubah menjadi ${prefix}`, fake)
				break
            case 'sethias':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}setprefix prefix`, fake)
				fxsx = arg
				caa.sendFakeStatus(from, `Hiasan berhasil diubah menjadi ${fxsx}`, fake)
				break
			case 'setname':
				if (!nuyfaa) return
				if (!arg) return caa.reply(from, 'masukkan nama', fake)
				caa.setName(arg)
				.then((res) => caa.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => caa.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'setbio':
				if (!nuyfaa) return
				if (!arg) return caa.reply(from, 'masukkan bio', fake)
				caa.setBio(arg)
				.then((res) => caa.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => caa.sendFakeStatus(from, JSON.stringify(err), fake))
				break
            case 'setlol':
                    if (!arg) return caa.reply(from, `Penggunaan ${prefix}setprefix prefix`, fake)
					lolkey = arg
					caa.sendFakeStatus(from, `Lolkey berhasil di ubah menjadi : ${lolkey}`, fake)
					break 
			case 'fdeface': case 'hack':
				if (!arg) return caa.reply(from, `Penggunaaan ${prefix}fdeface url|title|desc|url\n\nContoh : ${prefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, fake)
				argz = arg.split("|")
				if (!argz) return caa.reply(from, `Penggunaaan ${prefix}fdeface url|title|desc|url\n\nContoh : ${prefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, fake)
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
					caa.reply(from, `Kirim gambar atau reply dengan caption ${prefix}fakethumb caption`, fake)
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
					caa.sendFakeStatus(from, `Kirim gambar atau reply dengan caption ${prefix}imgtag caption`, fake)
				}
				break
			case 'sticktag': case 'stickertag':
				if (!isQuotedSticker) return caa.reply(from, `Reply sticker dengan caption *${prefix}stickertag*`, fake)
				let encmediai = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				let mediai = await nuy.downloadMediaMessage(encmediai)
				caa.hideTagSticker(from, mediai)
				break
			case 'kontaktag':
				argz = arg.split('|')
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, fake)
				if (faa.message.extendedTextMessage != undefined){
                    mentioned = faa.message.extendedTextMessage.contextInfo.mentionedJid
					caa.hideTagKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					caa.hideTagKontak(from, argz[0], argz[1])
				}
				break
			case 'doctag': case 'dokumentag': 
		        if (!isQuotedDocument) return caa.reply(from, `Reply Document dengan caption *${prefix + command}*`, fake)
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
		    case 'giftag': case 'giphytag': //by fxsx
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
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}tahta teks`, fake)
				caa.sendMediaURL(from, `https://api.zeks.xyz/api/hartatahta?text=${arg}&apikey=apivinz`)
				break
			case 'togif':
				if (!isQuotedSticker) return reply(from, 'Reply stiker nya', fake)
				if (faa.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
					const encmedia = JSON.parse(JSON.stringify(faa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					const uploadn = await uptonaufal(media, Date.now() + '.webp')
					const anjj = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${uploadn.result.image}`)
					thumb = await caa.getBuffer(anjj.data.result)
					caa.sendGif(from, thumb)
					fs.unlinkSync(media)
				} else {
					caa.sendFakeStatus(from, `Harus sticker bergerak`, fake)
				}
				break
			case 'toimg': case 'tovideo':
				if (!isQuotedSticker) return caa.reply(from, 'Reply stiker nya', fake)
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
							caa.reply(from, `gagal`, fake)
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
				if (!nuyfaa) return
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}spam teks|jumlahspam`, fake)
				argz = arg.split("|")
				if (!argz) return caa.reply(from, `Penggunaan ${prefix}spam teks|jumlah`, fake)
				if (isNaN(argz[1])) return caa.reply(from, `harus berupa angka`, fake)
				for (let i = 0; i < argz[1]; i++){
					caa.sendText(from, argz[0])
				}
				break
			case 'promote':
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}promote @tag atau nomor`, fake)
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
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}demote @tag atau nomor`, fake)
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
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}kick @tag atau nomor`, fake)
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
				if (!arg) return caa.reply(from, `Penggunaan ${prefix}kick 628xxxx`, fake)
				caa.add(from, [args[0] + '@s.whatsapp.net'])
				caa.FakeTokoForwarded(from, `Sukses`, fake)
				break
			case 'upstatus':
				if (!nuyfaa) return
				if (!arg) return caa.reply(from, `Penggunaan \n${prefix}upstatus text\n${prefix}upstatus caption <reply atau kirim video / img>`, fake)
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
					caa.sendFakeStatus(from, `Penggunaan ${prefix}creategrup namagrup|@tag`, fake)
				}
				break
			case 'imgtourl':
				const encmediiia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
				const mediaq = await nuy.downloadMediaMessage(encmediiia)
				const upli = await uptotele(mediaq)
				caa.sendFakeStatus(from, `${upli}`, fake)
				break
			case 'tourl':
				let a = JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				let b = await nuy.downloadAndSaveMediaMessage(a)
				let c = await uploadFile(b)
				caa.sendFakeStatus(from, c.result, fake)
				fs.unlinkSync(b)
				break
			case 'antidelete':
				if (!nuyfaa) return
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
				if (!nuyfaa) return
				if (isMedia && !faa.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(faa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : faa
					const media = await nuy.downloadMediaMessage(encmedia)
					nuy.updateProfilePicture(nuy.user.jid, media)
					.then((res) => caa.FakeTokoForwarded(from, JSON.stringify(res, null, 2).toString(), fake))
					.catch((err) => console.log(err))
				} else {
					caa.sendFakeStatus(from, `Kirim gambar atau reply gambar dengan caption ${prefix}setpp`, fake)
				}
				break
            case 'antilink':
                    if (!isGroup) return caa.reply('ONLY GRUP')
					if (!isGroupAdmins) return caa.reply('ONLY ADMIN')
					if (!isBotGroupAdmins) return caa.reply(from, 'BOT JADIIN ADMIN DULU')
					if (args.length < 1) return caa.reply(from, 'Mengaktifkan Ketik On, Menonaktif Ketik Off')
					if (args[0] === 'on') {
						if (isAntilink) return caa.reply(from, 'Anti link group sudah aktif')
						antilink.push(from)
						fs.writeFileSync('./pinky/antilink.json', JSON.stringify(antilink))
						caa.sendFakeStatus(from, '❬ SUCCSESS ❭ mengaktifkan anti link group di group ini ✔')
						caa.sendFakeStatus(from, 'Perhatian kepada seluruh member anti link group aktif apabila anda mengirim link group anda akan di kick dari group')
					} else if (args[0] === 'off') {
						if (!isAntilink) return reply('Mode anti link group sudah mati')
						antilink.splice(from, 1)
						fs.writeFileSync('./pinky/antilink.json', JSON.stringify(antilink))
						caa.sendFakeStatus(from, '❬ SUCCSESS ❭ menonaktifkan anti link group di group ini ✔')
					} else {
						caa.sendFakeStatus(from, 'Mengaktifkan Ketik On, Menonaktif Ketik Off')
					}
					break
			case 'eval':
				if (!nuyfaa) return
				let code = body.slice(6)
				try {

					if (!code) return caa.reply(from, 'No JavaScript Code', fake)
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

					let output = clean(evaled);
					caa.reply(from, JSON.stringify(evaled, null, 2), fake)

				} catch (err) {
					console.error(err)
					const error = clean(err)
					caa.reply(from, error, fake)
				}

				function clean(text) {
					if (typeof text === "string")
						return text
							.replace(/`/g, `\`${String.fromCharCode(8203)}`)
							.replace(/@/g, `@${String.fromCharCode(8203)}`);
					else return text;
				}
				break
			default:
			if (body.startsWith(`${prefix}${command}`)) {
            const loli = fs.readFileSync('./mp3/tidakada.mp3')
            caa.sendAudio(from, loli, fake)
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
})
