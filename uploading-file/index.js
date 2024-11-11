const express = require('express')
const app = express()

// Summary; if you have binary (non-alphanumeric) data (or a significantly sized payload) to transmit, use multipart/form-data.
// Otherwise, use application/x-www-form-urlencoded.
//
// The MIME types you mention are the two Content-Type headers for HTTP POST requests that user-agents (browsers) must support.
// The purpose of both of those types of requests is to send a list of name/value pairs to the server. Depending on the type and amount of
// data being transmitted, one of the methods will be more efficient than the other. To understand why, you have to look at what each is
// doing under the covers.
//
// For application/x-www-form-urlencoded, the body of the HTTP message sent to the server is essentially one giant query string -- name/value pairs
// are separated by the ampersand (&), and names are separated from values by the equals symbol (=). An example of this would be:
// MyVariableOne=ValueOne&MyVariableTwo=ValueTwo
//
// According to the specification:
//     [Reserved and] non-alphanumeric characters are replaced by `%HH', a percent sign and two hexadecimal digits representing the ASCII code of the character
//
// That means that for each non-alphanumeric byte that exists in one of our values, it's going to take three bytes to represent it. For large binary files,
// tripling the payload is going to be highly inefficient.
//
// That's where multipart/form-data comes in. With this method of transmitting name/value pairs, each pair is represented as a "part" in a MIME message
// (as described by other answers). Parts are separated by a particular string boundary (chosen specifically so that this boundary string does not occur
// in any of the "value" payloads). Each part has its own set of MIME headers like Content-Type, and particularly Content-Disposition, which can give each
// part its "name." The value piece of each name/value pair is the payload of each part of the MIME message. The MIME spec gives us more options when
// representing the value payload -- we can choose a more efficient encoding of binary data to save bandwidth (e.g. base 64 or even raw binary).
//
// Why not use multipart/form-data all the time? For short alphanumeric values (like most web forms), the overhead of adding all of the MIME headers is
// going to significantly outweigh any savings from more efficient binary encoding.

//

// app.use(express.json()) looks at requests where the Content-Type: application/json header is present and transforms the
// text-based JSON input into JS-accessible variables under req.body. app.use(express.urlencoded({extended: true})
// does the same for URL-encoded requests. the extended: true precises that the req.body object will contain values of any
// type instead of just strings.
// These do not handle multipart bodies, due to their complex and typically large nature.
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const busboy = require('busboy')
const { createWriteStream } = require('fs')

app.post('/', (req, res) => {
    const bb = busboy({ headers: req.headers })

    // file null gelirse? validation?
    // Emitted for each new file found.

    // !!
    // Note: If you listen for this event, you should always consume the stream whether you care about its contents or not (you can simply do stream.resume();
    // if you want to discard/skip the contents), otherwise the 'finish'/'close' event will never fire on the busboy parser stream. However,
    // if you aren't accepting files, you can either simply not listen for the 'file' event at all or set limits.files to 0, and any/all
    // files will be automatically skipped (these skipped files will still count towards any configured limits.files and limits.parts limits though).
    bb.on('file', (name, fileStream, info) => {
        console.log('FILE')
        console.log('name: ', name)
        console.log('fileStream: ', fileStream)
        console.log('info: ', info)

        fileStream
            .on('data', data => {
                console.log(name, 'got', data.length, 'bytes')
            })
            .on('close', () => {
                console.log(name, 'done')
            })

        fileStream.pipe(createWriteStream('uploads/ ' + info.filename))
    })

    // field null gelirse?
    bb.on('field', (name, val, info) => {
        console.log('FIELD')
        console.log('name: ', name)
        console.log('val: ', val)
        console.log('info: ', info)
    })

    bb.on('close', () => {
        console.log('CLOSE')

        res.writeHead(303, { Connection: 'close', Location: '/' }).end()
    })

    req.pipe(bb)
})

app.listen(3000, () => console.log('listening'))