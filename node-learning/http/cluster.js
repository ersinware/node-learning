//Clusters of Node.js processes can be used to run multiple instances of Node.js that can distribute workloads among their application threads. When process isolation is not needed, use the worker_threads module instead, which allows running multiple application threads within a single Node.js instance.
//Node.js does not provide routing logic. It is, therefore important to design an application such that it does not rely too heavily on in-memory data objects for things like sessions and login.

//main process ile child process'lerin iletişimi:
//https://nodejs.org/dist/latest-v16.x/docs/api/cluster.html#event-message

/*
Each Node.js instance, with any worker threads, uses a single libuv thread pool. A main Node.js process shares a single libuv thread pool with all its worker threads. If your Node.js program uses many worker threads, you may, or may not, need to set the UV_THREADPOOL_SIZE environment variable to a value greater than the default 4.

Node.js's cluster functionality uses the underlying OS's fork/exec scheme to create a new OS process for each cluster instance. So, each cluster instance has its own libuv pool.

If you're running stuff at scale, lets say with more than ten host machines running your Node.js server, then you can spend time optimizing Javascript instances.

Don't forget nginx if you use it as a reverse proxy to handle your https work. It needs some processor time too, but it uses fine-grain multithreading so you won't have to worry about it unless you have huge traffic.
*/

const cluster = require('cluster')

if (cluster.isMaster) {
  console.log(`master ${process.pid} is running`)

  const numCPUs = require('os').cpus().length
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) cluster.fork()

  cluster.on('exit', (worker, code, signal) => console.log(`worker ${worker.process.pid} died`))
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  require('http').createServer(onRequest).listen(8000)

  console.log(`worker ${process.pid} started`)
}

function onRequest (request, response) {
  console.log(`${process.pid} got request`)
  response.writeHead(404, { 'Context-Type': 'text/plain' }).end(`${process.pid}`)
}