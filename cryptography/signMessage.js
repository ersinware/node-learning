const data = {
  name: 'Ersin',
  surname: 'Karaer',
  tcNo: 'never put personal information because the signed message does not hide the information'
}

const dataString = JSON.stringify(data)

const crypto = require('crypto')
const hash = crypto.createHash('sha256')
hash.update(dataString)
const hashedDataHex = hash.digest('hex')

const fs = require('fs')
const senderPrivateKey = fs.readFileSync(__dirname + '/privateKey.pem', 'utf-8')
const encrypt = require('./encrypt')

const signedData = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedDataHex)

// by using this information, receiver can verify that it was signed by the private key
const dataInformation = {
  algorithm: 'sha256',
  originalData: data,
  signedData: signedData
}

module.exports.dataInformation = dataInformation