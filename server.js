//part 1: install express and set up a basic server
//part 2: use express to serve static files, set up Morgan logging middleware

//part 1: set up REST API endpoints using Express routing methods
//part 2: create express router module


const express = require('express') //not a core module, but express was installed to node_modules
const morgan = require('morgan')

const hostname = 'localhost'
const port = 3000

const app = express() //call express function which returns server application now available in variable app
app.use(morgan('dev')) //use development version of morgan for more info
app.use(express.json()) // when server receives requests with JSON formatted data in body, middleware function will parse into JS properties of request object to use data in JS

//support for REST API endpoints
app.all('/campsites', (req, res, next) => {//routing method for all HTTP methods to create default, so any HTTP requests to this path will trigger this method
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next() //pass control of applicaiton routing to the next relevant routing method (ex. if post request, skips get method)
}) 

//-----------handle GET request for campsites path
app.get('/campsites', (req, res) => { //don't need to set res statusCode and setHeader because already in app.all
    res.end('Will send all the campsites to you')
})

//-----------handle POST request for campsites path
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsites: ${req.body.name} with description: ${req.body.description}`) // assume data is JSON so need to parse with express.json()
})

//------------handle PUT requests for campsitse path
app.put('/campsites', (req, res) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /campsites')
}) 

//------------handle DELETE requests for campsite path
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites')
}) 

//------GET route parameter to end of path
app.get('/campsites/:campsiteId', (req, res) => { //store campsiteId value as route param named campsiteId
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`)
}) 

//------POST route parameter
app.post('/campsites/:campsiteId', (req, res) => { 
    res.statusCode = 403
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`)
}) 

//------PUT route parameter
app.put('/campsites/:campsiteId', (req, res) => { 
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`)
    res.end(`Will update the campsite: ${req.body.name} 
        with description: ${req.body.description}`) //sent as JSON formatted response of request message, then echoing back in response as text
}) 

//------DELETE route parameter
app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`) //deleting specific campsite, not all of them
}) 

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