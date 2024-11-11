const workers = require('worker_threads')

console.log('in worker.js: ' + workers.isMainThread)

workers.parentPort.on('message', msg => console.log(`sent from main: ${msg}`))

async function asyncLoop () {
  let x = 0
  while (x < workers.workerData.value) {
    workers.parentPort.postMessage(`asyncLoop, x: ${x}`)
    x++
  }
}

setTimeout(() => asyncLoop().then(() => workers.parentPort.postMessage('async loop done')), 5000)