const express = require('express')
const campsiteRouter = express.Router() // use campsiteRouter object to use with express routing methods

campsiteRouter.route('/') //path of just /, not campsites (in server.js)

//single statement that handles all the endpoints for routing to campsites
.all((req, res, next) => {//don't need path because already set in server.js
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
}) 
.get((req, res) => { 
    res.end('Will send all the campsites to you')
})
.post((req, res) => {
    res.end(`Will add the campsites: ${req.body.name} with description: ${req.body.description}`)
})
.put((req, res) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /campsites')
}) 
.delete((req, res) => {
    res.end('Deleting all campsites')
})

module.exports = campsiteRouter

/*//support for REST API endpoints -----------previous version before adding express router and chaining all the methods-------------
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
})*/ 