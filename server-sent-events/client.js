let eventSource

document.getElementById('btnConnect').addEventListener('click', () => {
  if (eventSource)
    return

  eventSource = new EventSource('http://localhost:3000/event')

  eventSource.onopen = () => {
    console.log('onopen')
  }

  eventSource.onmessage = event => {
    console.log(event.data)
  }

  eventSource.onerror = error => {
    console.error(error)
  }
})

document.getElementById('btnClose').addEventListener('click', () => {
  eventSource.close()
})