const {
	MessageType,
	Mimetype,
    WAConnection
} = require("@adiwajshing/baileys");
const fs = require('fs');
const conn = require('./connect');
const axios = require('axios');
const request = require('request');
const { resolve } = require("path");

const nuy = conn.nuy

exports.sendText = (from, text) => {
    nuy.sendMessage(from, text, MessageType.text)
}

exports.sendImage = (from, image, caption, faa) => {
	nuy.sendMessage(from, image, MessageType.image, {quoted: faa, caption: caption})
}

exports.sendVideo = (from, video, caption, faa) => {
	nuy.sendMessage(from, video, MessageType.video, {quoted: faa, caption: caption})
}

exports.sendGif = (from, gif) => {
	nuy.sendMessage(from, gif, MessageType.video, {mimetype: "video/gif"})
}

exports.reply = (from, text, faa) => {
    nuy.sendMessage(from, text, MessageType.text, {quoted: faa})
}

exports.sendSticker = (from, filename, faa) => {
	nuy.sendMessage(from, filename, MessageType.sticker, {quoted: faa})
}

exports.sendAudio = (from, audio, faketeks) => {
	nuy.sendMessage(from, audio, MessageType.audio, { quoted: { key : { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net' }, message: { groupInviteMessage: { groupJid: "6283815956151-1616169743@g.us", inviteCode: faketeks, groupName: faketeks, caption: faketeks, jpegThumbnail: fs.readFileSync(`./media/pinky.jpeg`)} } }, mimetype: 'audio/mp4', ptt:true, duration: 999999 })
}

exports.sendKontak = (from, nomor, nama) => {
	const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + 'ORG:Kontak\n' + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
	nuy.sendMessage(from, {displayname: nama, vcard: vcard}, MessageType.contact)
}

exports.sendFakeStatus = (from, teks, faketeks) => {
	nuy.sendMessage(from, teks, MessageType.text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": faketeks, "jpegThumbnail": fs.readFileSync(`./media/pinky.jpeg`)} } } })
}

exports.FakeStatusForwarded = (from, teks, faketeks) => {
	nuy.sendMessage(from, teks, MessageType.text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": faketeks, "jpegThumbnail": fs.readFileSync(`./media/pinky.jpeg`)} }, contextInfo: {"forwardingScore": 999, "isForwarded": true} } })
}

exports.FakeStatusImgForwarded = (from, image, caption, faketeks) => {
	nuy.sendMessage(from, image, MessageType.image, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": faketeks, "jpegThumbnail": fs.readFileSync(`./media/pinky.jpeg`)} } }, caption: caption, contextInfo: {"forwardingScore": 999, "isForwarded": true} })
}

exports.sendFakeStatusWithImg = (from, image, caption, faketeks) => {
	nuy.sendMessage(from, image, MessageType.image, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": faketeks, "jpegThumbnail": fs.readFileSync(`./media/pinky.jpeg`)} } }, caption: caption })
}

exports.sendMention = (from, text, orangnya, faa) => {
	nuy.sendMessage(from, text, MessageType.extendedText, {contextInfo: {mentionedJid: orangnya}, quoted: faa})
}

exports.hideTag = async function(from, text){
	let anu = await nuy.groupMetadata(from)
	let members = anu.participants
	let ane = []
	for (let i of members){
		ane.push(i.jid)
	}
	nuy.sendMessage(from, text, MessageType.text, {contextInfo: {"mentionedJid": ane}})
}

exports.hideTagImg = async function(from, image){
	let anu = await nuy.groupMetadata(from)
	let members = anu.participants
	let ane = []
	for (let i of members){
		ane.push(i.jid)
	}
	nuy.sendMessage(from, image, MessageType.image, {contextInfo: {"mentionedJid": ane}})
}

exports.hideTagSticker = async function(from, sticker){
	let anu = await nuy.groupMetadata(from)
	let members = anu.participants
	let ane = []
	for (let i of members){
		ane.push(i.jid)
	}
	nuy.sendMessage(from, sticker, MessageType.sticker, {contextInfo: {"mentionedJid": ane}})
}

exports.hideTagKontak = async function(from, nomor, nama){
	let vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + 'ORG:Kontak\n' + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
	let anu = await nuy.groupMetadata(from)
	let members = anu.participants
	let ane = []
	for (let i of members){
		ane.push(i.jid)
	}
	nuy.sendMessage(from, {displayname: nama, vcard: vcard}, MessageType.contact, {contextInfo: {"mentionedJid": ane}})
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.FakeTokoForwarded = (from, teks, fake) => {
	anu = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": fs.readFileSync(`./media/pinky.jpeg`)
					},
					"title": fake,
					"description": "Pinky Self",
					"currencyCode": "IDR",
					"priceAmount1000": "100",
					"retailerId": "By Caa",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
	nuy.sendMessage(from, teks, MessageType.text, {quoted: anu, contextInfo: {"forwardingScore": 999, "isForwarded": true}})
}

exports.sendFakeToko = (from, teks, fake) => {
	anu = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": fs.readFileSync(`./media/pinky.jpeg`)
					},
					"title": fake,
					"description": "Pinky Self",
					"currencyCode": "IDR",
					"priceAmount1000": "100",
					"retailerId": "By Caa",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
	nuy.sendMessage(from, teks, MessageType.text, {quoted: anu})
}

exports.sendFakeThumb = async function(from, url, title, desc, comnya, fotonya){
	var anoim = {
		detectLinks: false
	}
	var faa = await nuy.generateLinkPreview(url)
	faa.title = title
	faa.description = desc
	faa.jpegThumbnail = fotonya ? fotonya : fs.readFileSync(`./media/pinky.jpeg`)
	faa.canonicaUrl = comnya
	nuy.sendMessage(from, faa, MessageType.extendedText, anoim)
}

exports.sendFakeImg = function(from, imageasli, caption, thumbnail, faa){
	let ai = {
		thumbnail: thumbnail ? thumbnail : fs.readFileSync(`./media/pinky.jpeg`),
		quoted: faa ? faa : ''
	}
	nuy.sendMessage(from, imageasli, MessageType.image, ai)
}

exports.sendMediaURL = async(to, url, text="", faa, mids=[]) =>{
	if(mids.length > 0){
		text = normalizeMention(to, text, mids)
	}
	const fn = Date.now() / 10000;
	const filename = fn.toString()
	let mime = ""
	var download = function (uri, filename, callback) {
		request.head(uri, function (err, res, body) {
			mime = res.headers['content-type']
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};
	download(url, filename, async function () {
		console.log('done');
		let media = fs.readFileSync(filename)
		let type = mime.split("/")[0]+"Message"
		if(mime === "image/gif"){
			type = MessageType.video
			mime = Mimetype.gif
		}
		if(mime.split("/")[0] === "audio"){
			mime = Mimetype.mp4Audio
		}
		nuy.sendMessage(to, media, type, { quoted: faa, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
		
		fs.unlinkSync(filename)
	});
}

exports.getGroupAdmins = function(participants){
    admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

exports.setName = async function(query){
    const response = await nuy.updateProfileName(query)
    return response
}

exports.setBio = async function(query){
    const response = await nuy.setStatus(query)
    return response
}

exports.kick = function(from, orangnya){
	for (let i of orangnya){
		nuy.groupRemove(from, [i])
	}
}

exports.add = function(from, orangnya){
	nuy.groupAdd(from, orangnya)
}

exports.promote = function(from, orangnya){
	nuy.groupMakeAdmin(from, orangnya)
}

exports.demote = function(from, orangnya){
	nuy.groupDemoteAdmin(from, orangnya)
}

exports.upTextStatus = function(text){
	nuy.sendMessage('status@broadcast', text, MessageType.extendedText)
}

exports.upImgStatus = function(image, text){
	nuy.sendMessage('status@broadcast', image, MessageType.image, {caption: text})
}

exports.upVidStatus = function(video, text){
	nuy.sendMessage('status@broadcast', video, MessageType.video, {caption: text})
}

exports.createGroup = function(nama, member){
	let a
	nuy.groupCreate(nama, member)
	.then((res) => a = res )
	.catch((err) => a = err)
	return a
}

exports.getGroup = async function(totalchat){
	let grup = []
	let a = []
	let b = []
	for (c of totalchat){
		a.push(c.jid)
	}
	for (d of a){
		if (d && d.includes('g.us')){
			b.push(d)
		}
	}
	for (e of b){
		let ingfo = await nuy.groupMetadata(e)
		grup.push(ingfo)
	}
	return grup
}