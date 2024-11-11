const dataInformation = require('./signMessage').dataInformation

const fs = require('fs')
const receiverPublicKey = fs.readFileSync(__dirname + '/publicKey.pem', 'utf-8')

const decrypt = require('./decrypt')
const decryptedData = decrypt.decryptWithPublicKey(receiverPublicKey, dataInformation.signedData)
const decryptedDataHex = decryptedData.toString()

const crypto = require('crypto')
const hash = crypto.createHash(dataInformation.algorithm)
hash.update(JSON.stringify(dataInformation.originalData))
const hashedDataHex = hash.digest('hex')

if (hashedDataHex === decryptedDataHex)
  console.log('valid')
else console.log('invalid') 