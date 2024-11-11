const eventEmitter = new (require("events").EventEmitter)()

eventEmitter.on("newListener", (eventName, listener) => {
    console.log(`new listener is added for ${eventName}`)
})

// you can give a reference of a function as parameter
eventEmitter.once("eventOne", () => {
    console.log("eventOne, once")
})

eventEmitter.on("eventOne", (value) => {
    console.log(`eventOne, on (first), value: ${value}`)
})

eventEmitter.on("eventOne", (value) => {
    console.log(`eventOne, on (second), value: ${value}`)
})

eventEmitter.emit("eventOne", "sent value")
eventEmitter.emit("eventOne", "second sent value")
/* you can give a reference of a function as parameter
 eventEmitter.removeAllListeners("eventOne") */
