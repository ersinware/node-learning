let ws = new WebSocket('wss://localhost:3333')
setEvents()

// manual close yapmak istersen, bunu clearInterval() ile temizle
const heartbeat = setInterval(() => {
  if (ws.readyState === 3) {
    console.log('the connection was broken, reconnecting')
    ws = new WebSocket('wss://localhost:3333')
    setEvents()
    return
  }

  console.log('healthy')
}, 30000)

function setEvents() {
  ws.addEventListener('open', event => {
    console.log('open: ', event)
  })

  // bağlantı koparsa da bu çalışacak
  ws.addEventListener('close', event => {
    console.log('close: ', event)
  })

  ws.addEventListener('error', error => {
    console.log('error: ', error)
  })

  ws.addEventListener('message', message => {
    console.log(message.data)
    // sadece text gönderebilirsin
    // send(JSON.stringify(msg));
  })
}

document.getElementById('send').onclick = () => {
  console.log('hello')
  ws.send(`hello`)
}

const btnClose = document.getElementById('close')
btnClose.onclick = () => {
  // It may be helpful to examine the socket's bufferedAmount attribute before attempting to close the connection to determine
  // if any data has yet to be transmitted on the network. If this value isn't 0, there's pending data still, so you may wish
  // to wait before closing the connection.
  if (ws.bufferedAmount === 0) {
    ws.send(`left`)
    ws.close()
    return
  }

  setInterval(() => {
    btnClose.click()
  }, 3000)
}