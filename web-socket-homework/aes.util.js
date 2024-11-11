import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

export function encrypt(message, sessionKey, IV) {
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(sessionKey, 'hex'), Buffer.from(IV, 'hex'))
    let encrypted = cipher.update(message, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
}

export function decrypt(encryptedMessage, sessionKey, IV) {
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(sessionKey, 'hex'), Buffer.from(IV, 'hex'))
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}

export function generateSessionKey() {
    return randomBytes(32).toString('hex')
}

export function generateIV() {
    return randomBytes(16).toString('hex')
}