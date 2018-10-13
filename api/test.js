require('dotenv').config()

// Brandon's credentials
// TO-DO: this stuff should exist in a separate file, and not in GIT
process.env.AWS_ACCESS_KEY_ID = 'AKIAJYELAX4EQ4I55G7A'
process.env.AWS_SECRET_ACCESS_KEY = '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'
const port = 5000

const express = require('express')
const bodyParser = require('body-parser')

const lambda = require('./index.js') // index.js is the entry point
const app = express()
const PORT = process.env.PORT || port

// data handling
app.use(express.json({ limit: 5000000 })) // for parsing application/json || limit set to 5MB
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// routes
const authRoutes = require('./modules/importer/googledrive/auth')
const hubspotRoutes = require('./modules/importer/hubspot/api')
const dataRoutes = require('./routes/importer/dataRoutes')

// headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.post('/', (req, res) => {
    const event = {
        httpMethod: req.method,
        queryStringParameters: null,
        body: req.body
    }
    const context = {}
    const cb = (lambdaErr, lambdaRes) => {
        res.send(JSON.parse(lambdaRes.body))
    }
    lambda.handler(event, context, cb)
})
app.get('/', (req, res) => {
    const event = {
        httpMethod: req.method,
        queryStringParameters: req.query,
        body: req.body
    }
    const context = {}
    const cb = (lambdaErr, lambdaRes) => {
        res.send(JSON.parse(lambdaRes.body))
    }
    lambda.handler(event, context, cb)
})

/*************************
** GOOGLE AUTH ROUTES **
*************************/
app.use('/auth', authRoutes)

/*************************
** HUBSPOT API ROUTES **
*************************/
app.use('/importer/hubspot', hubspotRoutes)
app.use('/importer/data', dataRoutes)

app.listen(PORT, () => console.log(`Server listening at ${PORT}`))
