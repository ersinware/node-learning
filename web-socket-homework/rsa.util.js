import crypto, { generateKeyPairSync, privateDecrypt, publicEncrypt } from 'crypto';

export function generateKeyPair() {
    const keyPair = generateKeyPairSync(
        'rsa',
        {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }
    );

    return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
}

export function encryptWithPublicKey(publicKey, message) {
    return publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256"
        },
        Buffer.from(message, 'utf-8')
    ).toString("hex");
}

export function decryptWithPrivateKey(privateKey, encryptedMessage) {
    return privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256"
        },
        Buffer.from(encryptedMessage, 'hex')
    ).toString('utf-8');
}
