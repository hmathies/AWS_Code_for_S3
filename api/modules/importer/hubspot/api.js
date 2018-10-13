const router = require('express').Router()
const axios = require('axios')
// const papaparse = require('papaparse')
const { RateLimiter } = require('limiter')

// const database = require('../../database.js')()
const credentials = require('../../../api_credentials.json').credentials.hubspot
let hubspotAccessToken
let hubspotRefreshToken

/*************************
** MIDDLEWARE **
*************************/
const checkIfAuthenticated = require('./check_if_authenticated')
const { oauthRequest, oauthSuccess } = require('./oauth')
const parseConnections = require('./parse_connections')
const parseMessages = require('./parse_messages')

router.post('/test', checkIfAuthenticated, (req, res) => {
    const { data } = res.locals
    res.json({ data, foo: 'bar' })
})

/*************************
** /oauth **
*************************/
// send user to HubSpot OAuth URL
router.get('/oauth', (req, res) => {
    oauthRequest(credentials, res)
})

// after successful authentication HubSpot returns a `code` in the URL, `?code=xxx`
// then we swap this code, along with other information, for an `access_token` and a `refresh_token`
router.get('/oauth/success',
    (req, res, next) => {
        const data = {
            credentials,
            hubspotOauthUrlCode: req.query.code
        }
        oauthSuccess(data, res, next)
    }
)

router.get('/oauth/credentials', (req, res) => {
    res.json({ hubspotAccessToken, hubspotRefreshToken })
})

/*************************
** /upload/contacts/batch **
*************************/
// upload many contacts at one time
router.post('/upload/contacts/batch', (req, res) => {
    const { body: { data } } = req.body
    const url = `https://api.hubapi.com/contacts/v1/contact/batch/?hapikey=${credentials.hapiKey}`
    const postBody = []

    for (const val of data) {
        // https://developers.hubspot.com/docs/methods/contacts/batch_create_or_update
        // HubSpot API does **NOT** support creating a user with an empty email address
        // so we need to skip over that user for now and notify the user attempting to import
        // that these users will not appear in HubSpot or in the Influent Metrics Dashboard
        if (!val['Email Address']) continue

        // need to format the request body appropriately in order for HubSpot API to recognize our data
        const connect = {
            email: val['Email Address'],
            properties: [
                {
                    property: 'firstname',
                    value: val['First Name']
                },
                {
                    property: 'lastname',
                    value: val['Last Name']
                },
                {
                    property: 'company',
                    value: val.Company
                }
            ]
        }

        postBody.push(connect)
    }

    axios.post(url, postBody)
        .then(({ status, statusText }) => {
            res.json({ status, statusText })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

/*************************
** /upload/events/ **
*************************/
router.put('/upload/events', (req, res) => {
    const { hubspotAccessToken } = req.body
    const method = 'put'
    const url = `https://api.hubapi.com/integrations/v1/${credentials.appId}/timeline/event`
    const headers = { 'Authorization': `Bearer ${hubspotAccessToken}`, 'Content-Type': 'application/json' }
    const data = {
        id: Date.parse('11/1/17, 12:52 PM'),
        eventTypeId: 26758,
        email: 'test1@gmail.com',
        messageDate: 'messageDate',
        messageSubject: 'messageSubject',
        messageTo: 'test1',
        messageFrom: 'messageFrom',
        messageContent: 'messageContent'
    }

    axios({ method, url, headers, data })
        .then(data => {
            console.log(data)
            res.send('We did it!')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

/*************************
** /upload/events/batch **
*************************/
router.post('/upload/events/batch', checkIfAuthenticated, parseConnections, parseMessages, (req, res) => {
    const limiter = new RateLimiter(10, 2000) // allow 10 request per 2seconds

    // HubSpot only allows 10 request/second
    // this means we need to throttle our API calls with the help of `node-rate-limiter` aka `limiter`
    res.locals.hubspotAxiosCall.forEach(call => {
        limiter.removeTokens(1, err => {
            // so far I have yet to see this `err` condition thrown
            if (err) { console.log(err) }

            call()
        })
    })

    res.status(204).send({
        statusCode: 204,
        statusMessage: 'Batch event upload has been successful'
    })
})

module.exports = router
