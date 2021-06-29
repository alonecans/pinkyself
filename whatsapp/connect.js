/*
Base By FxSx
*/
const { WAConnection, MessageType } = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const figlet = require('figlet')
const fs = require('fs')
const { color } = require('../lib/color')

const nuy = new WAConnection()
exports.nuy = nuy

exports.connect = async() => {
    let authofile = './fxsx.json'
    	nuy.version = [2, 2119, 6]
	nuy.logger.level = 'warn'
	console.log(color(figlet.textSync('Pinky Self Bot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ Base By FxSx ]'))
	nuy.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(color('[Faa]', 'yellow'), color('Scan Qr By NuyFaa'))
    })
    /*
	nuy.on('credentials-updated', () => {
		fs.writeFileSync(authofile, JSON.stringify(nuy.base64EncodedAuthInfo(), null, '\t'))
		console.log(color('Wait....'))
	})
    */
	fs.existsSync(authofile) && nuy.loadAuthInfo(authofile)
	nuy.on('connecting', () => {
		console.log(color('[Faa]', 'yellow'), color('Connecting...'))
	})
	nuy.on('open', () => {
		console.log(color('[Faa]', 'yellow'), color('Connect'))
	})
	await nuy.connect({timeoutMs: 30*1000})
    fs.writeFileSync(authofile, JSON.stringify(nuy.base64EncodedAuthInfo(), null, '\t'))
    console.log(color(' ===================================================='))
	console.log(color('│ + Instagram : https://instagram.com/tn_fajri320       │'))
	console.log(color('│ + Instagram : https://instagram.com/thenay_xploit_   │'))
	console.log(color(' ===================================================='))
	console.log(tampilTanggal)
    console.log(tampilWaktu)
	return nuy
}
