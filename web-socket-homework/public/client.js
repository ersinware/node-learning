import { decrypt, encrypt, generateIV } from "./aes.util.client.js"
import { EVENT_TYPE_EXIT, EVENT_TYPE_FILE, EVENT_TYPE_JOIN, EVENT_TYPE_MESSAGE } from "./constants.js"
import { decryptWithPrivateKey, generateKeyPair } from "./rsa.util.client.js"

createClient(0)

async function createClient(id) {
    const keyPair = await generateKeyPair()

    let ws = new WebSocket('ws://127.0.0.1:8080'),
        checkForBrokenConnection,
        sessionKey

    setEvents()

    document.getElementById('send-button').onclick = async () => {
        const input = document.getElementById('msg'),
            IV = generateIV()

        ws.send(JSON.stringify({
            type: EVENT_TYPE_MESSAGE,
            encryptedMessage: await encrypt(input.value, sessionKey, IV),
            IV
        }))

        document.getElementById('chat-messages').innerHTML +=
            `
            <div class="message">
                <p class="meta">You</p>
                <p class="text">${input.value}</p>
            </div>
            `

        input.value = ''
    }

    document.getElementById('file').onchange = async event => {
        const file = event.target.files[0],
            size = Math.ceil(file.size / (1024 * 1024)),
            formData = new FormData()

        formData.append('file', file)

        const response = await fetch('/upload', { method: 'POST', body: formData })
        if (response.status !== 200) {
            alert('Some error occured')

            return
        }

        const IV = generateIV()
        ws.send(JSON.stringify({
            type: EVENT_TYPE_FILE,
            encryptedMessage: await encrypt(
                JSON.stringify({ filename: file.name, size }),
                sessionKey,
                IV
            ),
            IV
        }))

        document.getElementById('chat-messages').innerHTML +=
            `
            <div class="message">
                <p class="meta">You</p>
                <a href="/download/${file.name}" class="text" download>${file.name}, ${size}MB</a>
            </div>
            `
    }

    function setEvents() {
        ws.onerror = error => {
            console.error(error)
            clearInterval(checkForBrokenConnection)
        }

        ws.onopen = () => {
            ws.send(keyPair.publicKey)

            // checkForBrokenConnection = setInterval(() => {
            //     if (ws.readyState === 3) {
            //         ws = new WebSocket('ws://127.0.0.1:8080')
            //         setEvents()

            //         return
            //     }
            // }, 10000)
        }

        ws.onmessage = async message => {
            if (!sessionKey) {
                const parsed = JSON.parse(message.data),
                    userIds = document.getElementById('users')

                sessionKey = await decryptWithPrivateKey(
                    keyPair.privateKey,
                    parsed.encryptedSessionKey
                )

                for (const userId of parsed.users)
                    userIds.innerHTML += `<li>${userId}</li>`

                userIds.innerHTML += '<li>You</li>'

                return
            }

            const parsed = JSON.parse(message.data),
                decryptedMessage = JSON.parse(
                    await decrypt(
                        parsed.encryptedMessage,
                        sessionKey,
                        parsed.IV
                    )
                )

            switch (decryptedMessage.type) {
                case EVENT_TYPE_JOIN:
                    document.getElementById('users').innerHTML +=
                        `<li>${decryptedMessage.id}</li>`

                    break
                case EVENT_TYPE_MESSAGE:
                    document.getElementById('chat-messages').innerHTML +=
                        `
                        <div class="message">
                            <p class="meta">${decryptedMessage.id}</p>
                            <p class="text">${decryptedMessage.message}</p>
                        </div>
                        `

                    break
                case EVENT_TYPE_EXIT:
                    document
                        .getElementById('users')
                        .querySelectorAll(':scope > *')
                        .forEach(node => {
                            if (node.innerHTML === decryptedMessage.id)
                                node.remove()
                        })

                    break
                case EVENT_TYPE_FILE:
                    const message = JSON.parse(decryptedMessage.message)
                    document.getElementById('chat-messages').innerHTML +=
                        `
                        <div class="message">
                            <p class="meta">${decryptedMessage.id}</p>
                            <a href="/download/${message.filename}" class="text" download>${message.filename}, ${message.size}MB</a>
                        </div>
                        `

                    break
            }
        }

        ws.onclose = () => {
            clearInterval(checkForBrokenConnection)
        }
    }
}

