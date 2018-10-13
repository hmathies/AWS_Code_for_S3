const Papa = require('papaparse')
const axios = require('axios')

const credentials = require('../../../api_credentials.json').credentials.hubspot

const parseMessages = (req, res, next) => {
    const { connectionsWithEmailsHash, messages } = res.locals
    let csvData = []

    res.locals.hubspotAxiosCall = []

    const parseOptions = {
        header: true,
        skipEmptyLines: true,
        // streams data instead of parsing all at once
        // this GREATLY increases the speed of how the messages are parsed
        step: row => {
            if (csvData.length === 100) {
                const possibleThreadsHash = {}
                const alreadyThreaded = {}
                let currentMessageCount = 0
                let i = 0

                /*************************
                ** start while **
                *************************/
                while (currentMessageCount < csvData.length) {
                    // if `i` reaches the end of `csvData` reset `i` to `0` and add `1` to `currentMessageCount`
                    if (i === csvData.length) {
                        i = 0
                        currentMessageCount++
                    }

                    if (currentMessageCount === csvData.length) break

                    // set the current message
                    const currentMessage = csvData[currentMessageCount]
                    const threadsId = `${currentMessage.From + currentMessage.To + currentMessage.Content + Date.parse(currentMessage.Date)}`
                    const messageId = Date.parse(currentMessage.Date)
                    const messageTime = currentMessage.Date.match(/,\s(\d+:\d{2}\s\w{2})/, match => match)[1].replace(' ', '')

                    // if message has already been threaded reset and start over with the next message
                    if (alreadyThreaded[messageId] || !currentMessage.Content) {
                        i = 0
                        currentMessageCount++
                        continue
                    }

                    // create hash
                    if (!possibleThreadsHash[threadsId]) {
                        possibleThreadsHash[threadsId] = {
                            messages: { [messageId]: `${currentMessage.From} [${messageTime}]: ${currentMessage.Content}` },
                            date: currentMessage.Date,
                            from: currentMessage.From,
                            to: currentMessage.To,
                            subject: currentMessage.Subject,
                            direction: currentMessage.Direction
                        }
                    }

                    // check if participants are the same as current thread
                    if ((currentMessage.To === csvData[i].To && currentMessage.From === csvData[i].From) || (currentMessage.From === csvData[i].To && currentMessage.To === csvData[i].From)) {
                        // make sure current and iterated messages are not the same
                        if (currentMessage.Content !== csvData[i].Content) {
                            // determine whether or not this message was sent between a 24hour period (86,400,000ms)
                            if (Math.abs(Date.parse(currentMessage.Date) - Date.parse(csvData[i].Date)) < 86400000 || Math.abs(Date.parse(csvData[i].Date) - Date.parse(currentMessage.Date)) < 86400000) {
                                const messageId = Date.parse(csvData[i].Date)
                                const messageTime = csvData[i].Date.match(/,\s(\d+:\d{2}\s\w{2})/, match => match)[1].replace(' ', '')

                                // mark the iterated message as already threaded so we can skip over it later
                                if (!possibleThreadsHash[threadsId].messages[messageId]) {
                                    possibleThreadsHash[threadsId].messages[messageId] = `${csvData[i].From} [${messageTime}]: ${csvData[i].Content}`
                                    alreadyThreaded[messageId] = messageId
                                }
                            }
                        }
                    }

                    i++
                }
                /*************************
                ** end while **
                *************************/

                // add emails to applicable threads
                const threadsToSend = {}

                // add `email` prop to each possible thread
                for (const thread in possibleThreadsHash) {
                    const { direction, from, to } = possibleThreadsHash[thread]

                    if (direction === 'INCOMING') {
                        possibleThreadsHash[thread].email = connectionsWithEmailsHash[from]
                    } else {
                        possibleThreadsHash[thread].email = connectionsWithEmailsHash[to]
                    }

                    if (possibleThreadsHash[thread].email) { threadsToSend[thread] = possibleThreadsHash[thread] }
                }

                const hubspotAccessToken = res.locals.hubspotAccessToken || res.locals.data.access_token // depending on authentication route we need to check where `hubspotAccessToken` is defined
                const { hubspotAppId } = credentials
                const method = 'put'
                const url = `https://api.hubapi.com/integrations/v1/${hubspotAppId}/timeline/event/batch`
                const headers = { 'Authorization': `Bearer ${hubspotAccessToken}`, 'Content-Type': 'application/json' }
                const data = { eventWrappers: [] }

                // format threads in a way that HubSpot's `contact` api can read
                for (const threadId in threadsToSend) {
                    const { date, subject, to, from, messages, email } = threadsToSend[threadId]
                    const messageContent = Object.values(messages)

                    data.eventWrappers.push({
                        email,
                        id: threadId,
                        eventTypeId: 26758,
                        timestamp: Date.parse(date),
                        messageSubject: subject,
                        messageTo: to,
                        messageFrom: from,
                        extraData: {
                            messageContent
                        }
                    })
                }

                const request = { method, url, headers, data }
                const hubspotAxiosCall = () => axios(request).catch(err => console.log(`ERROR:\n=====\n${err}\n`))

                res.locals.hubspotAxiosCall.push(hubspotAxiosCall)

                csvData = []
            }

            csvData.push(row.data[0])
        }
    }
    Papa.parse(messages.body, parseOptions)

    next()
}

module.exports = parseMessages
