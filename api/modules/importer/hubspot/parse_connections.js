const Papa = require('papaparse')

const parseConnections = (req, res, next) => {
    const { connections } = res.locals

    const parseOptions = { header: true, skipEmptyLines: true }
    const csvData = Papa.parse(connections.body, parseOptions).data // `data` is an array containing all the "body" of the CSV uploaded from our `connections` object
    const connectionsWithEmailsHash = {}

    // filter out any connections that DO NOT contain an email address
    const connectionsWithEmails = csvData.filter(connection => connection['Email Address'] !== '')
        .map(connection => {
            return (
                // push these users to `connectionsWithEmailsHash`
                connectionsWithEmailsHash[`${connection['First Name']} ${connection['Last Name']}`] = connection['Email Address']
            )
        })

    res.locals.connectionsWithEmailsHash = connectionsWithEmails

    next()
}

module.exports = parseConnections
