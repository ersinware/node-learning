const crypto = require('crypto')

function encryptWithPublicKey(publicKey, message) {
  const messageBuffer = Buffer.from(message, 'utf-8')
  return crypto.publicEncrypt(publicKey, messageBuffer)
}

function encryptWithPrivateKey(privateKey, message) {
  const messageBuffer = Buffer.from(message, 'utf-8')
  return crypto.privateEncrypt(privateKey, messageBuffer)
}

module.exports.encryptWithPublicKey = encryptWithPublicKey
module.exports.encryptWithPrivateKey = encryptWithPrivateKey