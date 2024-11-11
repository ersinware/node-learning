const header = {
  'alg': 'RS256',
  'typ': 'JWT'
}

const payload = {
  'sub': '1234567890',
  'name': 'John Doe',
  'admin': true,
  'iat': 1516239022
}

const headerString = JSON.stringify(header)
const payloadString = JSON.stringify(payload)

const base64url = require('base64url')
const headerBase64Url = base64url(headerString)
const payloadBase64Url = base64url(payloadString)
console.log(headerBase64Url)
console.log(payloadBase64Url)

const crypto = require('crypto')
const signatureFunction = crypto.createSign('RSA-SHA256')
signatureFunction.write(headerBase64Url + '.' + payloadBase64Url)
signatureFunction.end()

const fs = require('fs')
const privateKey = fs.readFileSync('./privateKey.pem', 'utf-8')
// hashes and signs it with private key and returns in base64url format
const signatureBase64Url = signatureFunction.sign(privateKey, 'base64url')
console.log(signatureBase64Url)

const jwt = headerBase64Url + '.' + payloadBase64Url + '.' + signatureBase64Url
console.log(jwt)

module.exports.jwt = jwt