const fs = require('fs')
const encrypt = require('./encrypt')

const publicKey = fs.readFileSync(__dirname + '/publicKey.pem', 'utf-8')
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'my secret message')

// console.log(encryptedMessage.toString())

const decrypt = require('./decrypt')

const privateKey = fs.readFileSync(__dirname + '/privateKey.pem', 'utf-8')
const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage)

console.log(decryptedMessage.toString())
