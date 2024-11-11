export async function generateKeyPair() {
    function arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer),
            len = bytes.byteLength

        let binary = ''

        for (let i = 0; i < len; i++)
            binary += String.fromCharCode(bytes[i])

        return btoa(binary)
    }

    function toPemFormat(base64, type) {
        const pemHeader = `-----BEGIN ${type} KEY-----\n`,
            pemFooter = `\n-----END ${type} KEY-----`,
            pemBody = base64.match(/.{1,64}/g).join('\n')

        return pemHeader + pemBody + pemFooter
    }

    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
    ),
        publicKey = await window.crypto.subtle.exportKey(
            "spki",
            keyPair.publicKey
        ),
        privateKey = await window.crypto.subtle.exportKey(
            "pkcs8",
            keyPair.privateKey
        )

    return {
        publicKey: toPemFormat(arrayBufferToBase64(publicKey), 'PUBLIC'),
        privateKey: toPemFormat(arrayBufferToBase64(privateKey), 'PRIVATE'),
    }
}

export async function decryptWithPrivateKey(privateKeyPem, encryptedMessageHex) {
    async function decryptMessage(privateKeyPem, encryptedMessageHex) {
        const privateKey = await importPrivateKey(privateKeyPem),
            encryptedMessage = hexStringToArrayBuffer(encryptedMessageHex),
            decryptedMessageArrayBuffer = await window.crypto.subtle.decrypt(
                {
                    name: "RSA-OAEP"
                },
                privateKey,
                encryptedMessage
            ),
            decoder = new TextDecoder()

        return decoder.decode(decryptedMessageArrayBuffer)
    }

    async function importPrivateKey(pem) {
        const pemHeader = "-----BEGIN PRIVATE KEY-----",
            pemFooter = "-----END PRIVATE KEY-----",
            pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length),
            binaryDerString = atob(pemContents),
            binaryDer = str2ab(binaryDerString)

        return window.crypto.subtle.importKey(
            "pkcs8",
            binaryDer,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            true,
            ["decrypt"]
        )
    }

    function str2ab(str) {
        const buf = new ArrayBuffer(str.length),
            bufView = new Uint8Array(buf)

        for (let i = 0; i < str.length; i++)
            bufView[i] = str.charCodeAt(i)

        return buf
    }

    function hexStringToArrayBuffer(hexString) {
        const result = new Uint8Array(hexString.length / 2)

        for (let i = 0; i < hexString.length; i += 2)
            result[i / 2] = parseInt(hexString.substr(i, 2), 16)

        return result.buffer
    }

    return await decryptMessage(privateKeyPem, encryptedMessageHex)
}


