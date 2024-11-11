// BURAYA BAK İMPLEMENTE EDERKEN
// https://web.dev/notifications/

const express = require('express')
const app = express()
app.use(express.static(__dirname + '/client'))
app.use(express.json())

const cors = require('cors')

app.options('/sendNotification', cors({ origin: '*', methods: 'GET, POST, OPTIONS' }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})

const publicVapidKey = 'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo'
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM'

const webPush = require('web-push')
webPush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey
)

app.post('/sendNotification', (req, res) => {
    const pushSubscription = req.body
    console.log(pushSubscription)
    const payload = JSON.stringify({ title: 'title from server' })

    webPush.sendNotification(pushSubscription, payload)
        .then(() => console.log('notification sent'))
        .catch(error => console.error(error))

    res.status(201).end()
})

app.listen(3000, () => console.log('listening'))