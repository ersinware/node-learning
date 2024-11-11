self.addEventListener('push', event => {
    const notificationInfo = event.data.json()

    self.registration.showNotification(notificationInfo.title, {
        body: 'body text',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png',
        actions: [
            {
                action: 'coffee-action',
                title: 'Coffee',
                type: 'button',
            },
            {
                action: 'doughnut-action',
                type: 'button',
                title: 'Doughnut',
            }
        ]
    })
})

self.addEventListener('notificationclick', event => {
    console.log(event.action)
    event.notification.close();
    event.waitUntil(clients.openWindow('http://localhost:3000'));
})