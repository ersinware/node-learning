// for detailed events, options and etc.
// https://github.com/websockets/ws/blob/master/doc/ws.md

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism

const { WebSocketServer, WebSocket } = require('ws')

const wss = new WebSocketServer({
  noServer: true,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
})

const debug = require('debug')('express-learning:socket')

wss.on('listening', () => {
  debug('listening')
})

wss.on('headers', (headers, req) => {
  debug(`headers- headers: ${headers}, req: ${req}`)
})

let clientCount = 0
// req is the http GET request sent by the client. Useful for parsing authority headers, cookie headers, and other information.
wss.on('connection', (ws, req) => {
  // client için kullanılan WebSocket sınıfına bakmadım, socket client gerek olursa bak

  // CONNECTING 	0 	The connection is not yet open.
  // OPEN 	      1 	The connection is open and ready to communicate.
  // CLOSING    	2 	The connection is in the process of closing.
  // CLOSED 	    3 	The connection is closed.

  ws.isAlive = true
  // Pong messages are automatically sent in response to ping messages as required by the spec.
  ws.on('pong', () => {
    debug('heartbeat')
    ws.isAlive = true
  })

  const clientId = ws.clientId = clientCount++

  ws.send(`hello from server, your id ${clientId}`)

  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN)
      client.send(`client#${clientId} connected`)
  })

  ws.on('message', (message, isBinary) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN)
        client.send(`client#${clientId}: ${message}`)
    })
  })
})

wss.on('error', error => {
  debug(`error- error: ${error}`)
})

wss.on('wsClientError', (error, socket, req) => {
  // Emitted when an error occurs before the WebSocket connection is established. socket and request are respectively the socket and
  // the HTTP request from which the error originated. The listener of this event is responsible for closing the socket. When the
  // 'wsClientError' event is emitted there is no http.ServerResponse object, so any HTTP response, including the response headers and body,
  // must be written directly to the socket. If there is no listener for this event, the socket is closed with a default 4xx response containing
  // a descriptive error message.
  debug(`wsClientError- error: ${error}, socket: ${socket}, req: ${req}`)
})

const checkAllAlive = setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) {
      debug(`connection of ${ws.clientId} was broken, terminating`)
      ws.terminate()
      return
    }

    ws.isAlive = false
    // Pong messages are automatically sent in response to ping messages as required by the spec.
    debug(`sending ping to ${ws.clientId}`)
    ws.ping()
  })
}, 30000)

wss.on('close', () => {
  // Emitted when the server closes. This event depends on the 'close' event of HTTP server only when it is created
  // internally. In all other cases, the event is emitted independently.
  debug('close')
  clearInterval(checkAllAlive)
})

//

// server.close([callback])
// Prevent the server from accepting new connections and close the HTTP server if created internally. If an external HTTP server is used via
// the server or noServer constructor options, it must be closed manually. Existing connections are not closed automatically. The server emits
// a 'close' event when all connections are closed unless an external HTTP server is used and client tracking is disabled. In this case the 'close'
// event is emitted in the next tick. The optional callback is called when the 'close' event occurs and receives an Error if the server is already closed.

//

// server.shouldHandle(request)
// request {http.IncomingMessage} The client HTTP GET request.
// See if a given request should be handled by this server. By default this method validates the pathname of the request, matching it against
// the path option if provided. The return value, true or false, determines whether or not to accept the handshake.
// This method can be overridden when a custom handling logic is required.

module.exports = wss