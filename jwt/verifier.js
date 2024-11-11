const jwtParts = require('./issuer').jwt.split('.')

const headerInBase64UrlFormat = jwtParts[0]
const payloadInBase64UrlFormat = jwtParts[1]
const signatureInBase64UrlFormat = jwtParts[2]

const crypto = require('crypto')
const verifyFunction = crypto.createVerify('RSA-SHA256')
verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat)
verifyFunction.end()

const fs = require('fs')
const publicKey = fs.readFileSync('./publicKey.pem', )
const isValid = verifyFunction.verify(publicKey, signatureInBase64UrlFormat, 'base64url')

console.log(isValid)

//
// // console.log(headerInBase64UrlFormat)
// // console.log(payloadInBase64UrlFormat)
// // console.log(signatureInBase64UrlFormat)
//
// const base64url = require('base64url')
//
// const decodedHeader = base64url.decode(headerInBase64UrlFormat)
// const decodedPayload = base64url.decode(payloadInBase64UrlFormat)
// const decodedSignature = base64url.decode(signatureInBase64UrlFormat)
//
// console.log(decodedHeader)
// console.log(decodedPayload)
// console.log(decodedSignature)