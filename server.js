//part 1: install express and set up a basic server
//part 2: use express to serve static files, set up Morgan logging middleware

//part 1: set up REST API endpoints using Express routing methods
//part 2: create express router module


const express = require('express') //not a core module, but express was installed to node_modules
const morgan = require('morgan')
const campsiteRouter = require('./routes/campsiteRouter')
const promotionRouter = require('./routes/promotionRouter')
const partnerRouter = require('./routes/partnerRouter')

const hostname = 'localhost'
const port = 3000

const app = express() //call express function which returns server application now available in variable app
app.use(morgan('dev')) //use development version of morgan for more info
app.use(express.json()) // when server receives requests with JSON formatted data in body, middleware function will parse into JS properties of request object to use data in JS

app.use('/campsites', campsiteRouter) //specify root path here, not in campsiteRouter.js
app.use('/promotions', promotionRouter)
app.use('/partners', partnerRouter)

//set up express to serve files from public folder (for static)
app.use(express.static(__dirname + '/public'))
// __dirname: special variable in Node that refers to absolute path of the current directory it's in
// default to index.html

//set up server to give same response for every request
app.use((req, res) => { //express callback function called middleware function which has 3 params (req, res, next)
    //console.log(req.headers) ----morgan will handle logging request info now
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
}) 

//start listening to server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})