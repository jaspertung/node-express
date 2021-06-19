//part 1: install express and set up a basic server
//part 2: use express to serve static files, set up Morgan logging middleware


const express = require('express') //not a core module, but express was installed to node_modules

const hostname = 'localhost'
const port = 3000

const app = express() //call express function which returns server application now available in variable app

//set up server to give same response for every request
app.use((req, res) => { //express callback function called middleware function which has 3 params (req, res, next)
    console.log(req.headers)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
}) 

//start listening to server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})