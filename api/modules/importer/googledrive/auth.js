const router = require('express').Router()
const { google } = require('googleapis')
const axios = require('axios')

const credentials = require('../../../api_credentials.json').credentials.google
const { clientId, clientSecret } = credentials
const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, 'http://localhost:5000/auth/success')
const scopes = ['https://www.googleapis.com/auth/drive']
// const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes, prompt: 'consent' });
const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes })
let googleCredentials

/*************************
** / **
*************************/
router.get('/', (req, res) => {
    res.redirect(url)
})

/*************************
** /success **
*************************/
router.get('/success', (req, res) => {
    const { code } = req.query

    oauth2Client.getToken(code)
        .then(({ tokens }) => {
            oauth2Client.setCredentials(tokens)

            axios(`https://www.googleapis.com/drive/v3/files?access_token=${tokens.access_token}`)
                .then(({ data }) => {
                    googleCredentials = { ...data, ...tokens }
                    res.redirect('http://origin.dashboard.influentmetrics.io/?dev=true&p=importer')
                })
                .catch(err => {
                    console.log(`\n\n\n\n\n===== ERRROR =====\n${err}`)
                })
        })
})

/*************************
** /credentials **
*************************/
router.get('/credentials', (req, res) => res.send(googleCredentials))

/*************************
** /create **
*************************/
router.post('/create', (req, res) => {
    const { name } = req.body
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })

    const resource = { name, mimeType: 'application/vnd.google-apps.folder' }

    drive.files.create({ resource, fields: 'id' }, (err, file) => {
        if (err) { console.log(err) }
        res.status(500).json(err)

        console.log(file, '\n', file.id)
        res.status(201).json({ file, id: file.id })
    })
})

/*************************
** /upload **
*************************/
router.post('/upload', (req, res) => {
    const { name, type, body } = req.body
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })

    const resource = { name, mimeType: type }
    const media = { mimeType: type, body }

    drive.files.create({ resource, media })
        .then(({ data }) => res.send(data))
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

/*************************
** /logout **
*************************/
router.get('/logout', (req, res) => {
    oauth2Client.revokeCredentials((err, result) => {
        if (err) { return res.status(500).send({ error: err }) }

        res.send({ success: result })
    })
})

module.exports = router
