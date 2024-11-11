// There are 2 optional modules that can be installed along side with the ws module. These modules are binary addons which improve certain operations.
// Prebuilt binaries are available for the most popular platforms so you don't necessarily need to have a C++ compiler installed on your machine.
// npm install --save-optional bufferutil: Allows to efficiently perform operations such as masking and unmasking the data payload of the WebSocket frames.
// npm install --save-optional utf-8-validate: Allows to efficiently check if a message contains valid UTF-8.

//

// WebSocket compression
// ws supports the permessage-deflate extension which enables the client and server to negotiate a compression algorithm and its parameters,
// and then selectively apply it to the data payloads of each WebSocket message.
// The extension is disabled by default on the server and enabled by default on the client. It adds a significant overhead in terms of performance and
// memory consumption so we suggest to enable it only if it is really needed.

// Note that Node.js has a variety of issues with high-performance compression, where increased concurrency, especially on Linux, can lead to
// catastrophic memory fragmentation and slow performance. If you intend to use permessage-deflate in production, it is worthwhile to set up a test
// representative of your workload and ensure Node.js/zlib will handle it with acceptable performance and memory usage.
// Tuning of permessage-deflate can be done via the options defined below. You can also use zlibDeflateOptions and zlibInflateOptions, which is passed
// directly into the creation of raw deflate/inflate streams.

//

// Use the Node.js streams API
//
// import WebSocket, { createWebSocketStream } from 'ws';
//
// const ws = new WebSocket('wss.js://websocket-echo.com/');
//
// const duplex = createWebSocketStream(ws, { encoding: 'utf8' });
//
// duplex.pipe(process.stdout);
// process.stdin.pipe(duplex);

//

// websocket'i, proxy ile secure yapman gerekiyormuş