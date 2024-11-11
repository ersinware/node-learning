//Workers (threads) are useful for performing CPU-intensive JavaScript operations. They do not help much with I/O-intensive work. The Node.js built-in asynchronous I/O operations are more efficient than Workers can be.
//Unlike child_process or cluster, worker_threads can share memory. They do so by transferring ArrayBuffer instances or sharing SharedArrayBuffer instances.

/*
Each Node.js instance, with any worker threads, uses a single libuv thread pool. A main Node.js process shares a single libuv thread pool with all its worker threads. If your Node.js program uses many worker threads, you may, or may not, need to set the UV_THREADPOOL_SIZE environment variable to a value greater than the default 4.

Node.js's cluster functionality uses the underlying OS's fork/exec scheme to create a new OS process for each cluster instance. So, each cluster instance has its own libuv pool.

If you're running stuff at scale, lets say with more than ten host machines running your Node.js server, then you can spend time optimizing Javascript instances.

Don't forget nginx if you use it as a reverse proxy to handle your https work. It needs some processor time too, but it uses fine-grain multithreading so you won't have to worry about it unless you have huge traffic.
*/

const workers = require('worker_threads')

console.log('in workerThread.js: ' + workers.isMainThread)

const worker = new workers.Worker('./worker.js', { workerData: { value: 50 } })

worker.on('online', () => console.log(`online`))

worker.on('message', (msg) => console.log(`sent from worker: ${msg}`))

worker.on('error', (error) => console.log(`error: ${error}`))

worker.on('exit', (exitCode) => console.log(`exitCode: ${exitCode}`))

worker.postMessage('end of the workerThread.js file')