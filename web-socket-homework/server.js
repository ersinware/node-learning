import { randomUUID } from 'crypto'
import WebSocket, { WebSocketServer } from 'ws'
import { decrypt, encrypt, generateIV, generateSessionKey } from './aes.util.js'
import {
    EVENT_TYPE_EXIT,
    EVENT_TYPE_JOIN
} from './public/constants.js'
import { encryptWithPublicKey } from './rsa.util.js'

const wss = new WebSocketServer({ port: 8080 })
let checkForBrokenConnections

wss
    .on('listening', () => {
        console.log('listening')

        checkForBrokenConnections = setInterval(() => {
            wss.clients.forEach(socket => {
                if (!socket.alive) {
                    socket.terminate()

                    return
                }
                socket.alive = false
                socket.ping()
            })
        }, 10000)
    })
    .on('error', () => console.error(error))
    .on('wsClientError', (error, socket, req) => {
        socket.terminate()
    })
    .on('connection', (socket, req) => {
        socket.id = randomUUID()
        socket.alive = true
        socket.on('pong', () => {
            socket.alive = true
        })

        socket.on('message', (message, isBinary) => {
            if (!socket.sessionKey) {
                socket.sessionKey = generateSessionKey()

                const publicKey = message.toString(),
                    encryptedSessionKey = encryptWithPublicKey(
                        publicKey,
                        socket.sessionKey
                    ),
                    userIds = []

                for (const client of wss.clients)
                    if (client !== socket && client.readyState == WebSocket.OPEN)
                        userIds.push(client.id)

                socket.send(JSON.stringify({ encryptedSessionKey, users: userIds }))

                wss.clients.forEach(client => {
                    if (client != socket && client.readyState === WebSocket.OPEN) {
                        const IV = generateIV()
                        client.send(JSON.stringify({
                            encryptedMessage: encrypt(
                                JSON.stringify({
                                    type: EVENT_TYPE_JOIN,
                                    id: socket.id,
                                }),
                                client.sessionKey,
                                IV
                            ),
                            IV
                        }))
                    }
                })

                return
            }

            const parsed = JSON.parse(message.toString())
            wss.clients.forEach(client => {
                if (client != socket && client.readyState === WebSocket.OPEN) {
                    const IV = generateIV()
                    client.send(JSON.stringify({
                        encryptedMessage: encrypt(
                            JSON.stringify({
                                type: parsed.type,
                                id: socket.id,
                                message: decrypt(
                                    parsed.encryptedMessage,
                                    socket.sessionKey,
                                    parsed.IV
                                )
                            }),
                            client.sessionKey,
                            IV
                        ),
                        IV
                    }))
                }
            })
        })

        socket.on('close', () => {
            wss.clients.forEach(client => {
                if (client != socket && client.readyState === WebSocket.OPEN) {
                    const IV = generateIV()
                    client.send(JSON.stringify({
                        encryptedMessage: encrypt(
                            JSON.stringify({
                                type: EVENT_TYPE_EXIT,
                                id: socket.id,
                            }),
                            client.sessionKey,
                            IV
                        ),
                        IV
                    }))
                }
            })
        })
    })
    .on('close', () => {
        clearInterval(checkForBrokenConnections)
    })

