export function generateIV() {
    const iv = new Uint8Array(16)
    window.crypto.getRandomValues(iv)

    return Array.from(iv).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function encrypt(message, sessionKeyHex, ivHex) {
    const sessionKey = new Uint8Array(sessionKeyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
        iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
        key = await window.crypto.subtle.importKey(
            "raw",
            sessionKey,
            "AES-CBC",
            false,
            ["encrypt"]
        ),
        encrypted = await window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: iv
            },
            key,
            new TextEncoder().encode(message)
        )

    return Array.from(new Uint8Array(encrypted)).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function decrypt(encryptedMessageHex, sessionKeyHex, ivHex) {
    const sessionKey = new Uint8Array(sessionKeyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
        iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
        key = await window.crypto.subtle.importKey(
            "raw",
            sessionKey,
            "AES-CBC",
            false,
            ["decrypt"]
        ),
        encryptedMessage = new Uint8Array(encryptedMessageHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
        decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: iv
            },
            key,
            encryptedMessage
        )

    return new TextDecoder().decode(decrypted)
}