const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let counter = 0

app.get('/event', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    })

    const interval = setInterval(() => {
        // you can specify your special events
        // res.write('event: myEvent\n')
        // res.write('id: 1\n')
        // res.write('retry: 10000\n')
        res.write(`data: ${ counter++ }\n\n`)
    }, 1000)

    req.on('close', () => {
        console.log('close')
        clearInterval(interval)
    })
})

app.listen(3000, () => console.log('listening'))