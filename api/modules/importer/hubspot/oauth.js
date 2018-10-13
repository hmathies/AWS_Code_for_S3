const axios = require('axios')

const oauthRequest = (credentials, res) => {
    const { hubspotClientId, hubspotRedirectUrl } = credentials
    const hubspotScopes = 'timeline%20contacts'
    const hubSpotOAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${hubspotClientId}&scope=${hubspotScopes}&redirect_uri=${hubspotRedirectUrl}`
    res.redirect(hubSpotOAuthUrl)
}

const oauthSuccess = (data, res) => {
    const { hubspotOauthUrlCode, credentials: { hubspotClientId, hubspotClientSecret, hubspotRedirectUrl } } = data
    const grantType = 'authorization_code'
    const hubspotAccessTokenUrl = 'https://api.hubapi.com/oauth/v1/token'
    const axiosPostBody = [
        `grant_type=${grantType}`,
        `client_id=${hubspotClientId}`,
        `client_secret=${hubspotClientSecret}`,
        `redirect_uri=${hubspotRedirectUrl}`,
        `code=${hubspotOauthUrlCode}`
    ].join('&')
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
    console.log(axiosPostBody)

    axios.post(hubspotAccessTokenUrl, axiosPostBody, { headers })
        .then(({ data }) => {
            res.locals.hubspotAccessToken = data.access_token
            res.locals.hubspotRefreshToken = data.refresh_token
            res.json(res.locals)
        })
        .catch(err => {
            console.log(`\n\n\n\n\n==== ERROR ====\n${err}`)
            console.log(err)
            res.json({ err: '/oauth/success' })
        })
}

module.exports = { oauthRequest, oauthSuccess }
