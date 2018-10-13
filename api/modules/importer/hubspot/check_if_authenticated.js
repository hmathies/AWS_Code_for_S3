const axios = require('axios')

const { HUBSPOT_CLIENT_ID, HUBSPOT_CLIENT_SECRET, HUBSPOT_REDIRECT_URL } = process.env

const checkIfAuthenticated = (req, res, next) => {
    const { hubspotAccessToken, hubspotRefreshToken, connections, messages } = req.body
    const hubspotAccessTokenInformationUrl = `https://api.hubapi.com/oauth/v1/access-tokens/${hubspotAccessToken}`

    axios(hubspotAccessTokenInformationUrl)
        .then(() => {
            res.locals.hubspotAccessToken = hubspotAccessToken
            res.locals.connections = connections
            res.locals.messages = messages
            next()
        })
        // TO-DO: It probably won't be an error that comes back
        .catch(err => {
            console.log('catch')
            console.error(err)
            const method = 'post'
            const url = 'https://api.hubapi.com/oauth/v1/token'
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
            const data = `grant_type=refresh_token&client_id=${HUBSPOT_CLIENT_ID}&client_secret=${HUBSPOT_CLIENT_SECRET}&redirect_uri${HUBSPOT_REDIRECT_URL}&refresh_token=${hubspotRefreshToken}`

            axios({ method, url, headers, data })
                .then(({ data }) => {
                    res.locals.data = data
                    res.locals.connections = connections
                    res.locals.messages = messages
                    next()
                })
                .catch(err => {
                    console.log('\n\n\n\n\n==== SECOND ERROR ====')
                    console.error(err)
                    console.log('\n==== SECOND ERROR ====')
                    next()
                })
        })
}

module.exports = checkIfAuthenticated
