module.exports = function (args) {
    const { aws } = args
    const { event } = args

    const dynamo = new aws.DynamoDB.DocumentClient()

    const queryProfiles = (config, id, days, currentDay, profiles, callback, exclusiveStartKey) => {
        // days: how many days to query
        // currentDay: current query counter
        const d = (new Date((new Date()).setDate((new Date()).getDate() - currentDay)))
            .toLocaleDateString(undefined, { timeZone: config.settings.timezone })
            .split('/')
        const d2 = (d.length === 1) ? d[0].split('-') : [d[2], d[0], d[1]]
        const date = parseInt(d2[0]) * 10000 + parseInt(d2[1]) * 100 + parseInt(d2[2])
        const query = {
            TableName: `profile_${id}`,
            IndexName: 'timestamp_date-timestamp-index',
            KeyConditionExpression: 'timestamp_date = :ts_key',
            ExpressionAttributeValues: { ':ts_key': date },
            ScanIndexForward: 'false'
        }

        if (exclusiveStartKey) query.ExclusiveStartKey = exclusiveStartKey
        dynamo.query(query, (err, data) => {
            if (err) {
                console.error(`Unable to query the table, but resuming. Error JSON: ${JSON.stringify(err, null, 2)}`)
                data = {}
            } else {
                profiles = profiles.concat(data.Items)
                console.log({ query_results: { currentDay, size: profiles.length } })
            }
            if (data.lastEvaluatedKey) {
                queryProfiles(config, id, days, currentDay, profiles, callback, data.lastEvaluatedKey)
                console.log({ paging_profiles: data.lastEvaluatedKey })
            } else {
                currentDay++
                if (currentDay < days) {
                    queryProfiles(config, id, days, currentDay, profiles, callback)
                    console.log({ paging_date_profiles: currentDay })
                } else {
                    callback(profiles)
                }
            }
        })
    }

    const processSpec = (config, criteria) => {
        const codes = []
        criteria.map(steps => {
            const code = []
            // loop through all the criteria for this group definition
            if (steps.active) {
                const { params } = steps
                let subject = ''
                switch (params[0]) {
                    case 'viewed-uri':
                        subject = 'uri'
                        break
                    case 'query':
                        subject = 'query'
                        break
                    case 'viewed-page-hostname':
                        subject = 'host'
                        break
                    case 'referring-page-url':
                        subject = 'referrer'
                        break
                    case 'entry-page-uri':
                        subject = 'session-entry-uri'
                        break
                    case 'entry-page-hostname':
                        subject = 'session-entry-hostname'
                        break
                    case 'entry-referring-page-url':
                        subject = 'session-entry-referrer'
                        break

                    case 'country': case 'zip': case 'state':
                        subject = `geo_${params[0]}`
                        break
                    case 'clientIp':
                        subject = 'clientIp'
                        break
                    case 'city-state':
                        subject = 'geo_city'
                        // TO-DO split city/state by comma?
                        break
                    case 'distance':
                        subject = 'distance'
                        break

                    case 'sessions-count':
                        subject = 'counter_session'
                        break
                    case 'page-view-count':
                        subject = 'counter_view'
                        break
                    case 'duration':
                        subject = 'session_duration'
                        break

                    case 'hour-of-day':
                        subject = 'hourofday'
                        break
                    case 'time-of-day':
                        subject = 'timeofday'
                        break
                    case 'day-of-week':
                        subject = 'dayofweek'
                        break
                    case 'date-of-month':
                        subject = 'dateofmonth'
                        break

                    case 'device-type':
                        subject = 'device_type'
                        break
                    case 'device-os':
                        subject = 'device_os'
                        break
                    case 'device-browser':
                        subject = 'device_browser'
                        break
                    case 'device-version':
                        subject = 'device_version'
                        break
                    case 'device-platform':
                        subject = 'device_platform'
                        break

                    case 'profile-attribute':
                        subject = 'profile-attribute'
                        break
                }

                switch (subject) {
                    case 'uri': case 'host': case 'referrer': case 'query': case 'session-entry-uri': case 'session-entry-hostname': case 'session-entry-referrer':
                    case 'geo_country': case 'geo_zip': case 'geo_state': case 'geo_city': case 'clientIp':
                    case 'device_type': case 'device_os': case 'device_browser': case 'device_version': case 'device_platform':
                        switch (params[1]) {
                            case 'current-page':
                                code.push(subject)
                                break
                            case 'previous-page':
                                code.push(['lastview', subject])
                                break
                            case 'current-session':
                                code.push(subject) // TO-DO
                                break
                            case 'previous-session':
                                code.push(subject) // TO-DO
                                break
                        }
                        code.push(params[2])
                        code.push(targetSet(params[3]))
                        break

                    case 'distance':
                        switch (params[2]) {
                            case 'current-session':
                                // params1 = ref to location
                                const location = config.settings.locations.filter(l => l.id === params[1])
                                if (location && location.length) {
                                    const geo = location[0].coordinates
                                    code.push(['distance', [geo[0], geo[1]]])
                                }
                                break
                            case 'previous-session':
                                // TO-DO
                                break
                            case 'first-session':
                                // TO-DO
                                break
                        }
                        code.push(params[3])
                        code.push(targetSet(params[4]))

                        break

                    case 'counter_session':
                        code.push(subject)
                        code.push(params[1])
                        code.push(targetSet(params[2]))
                        break
                    case 'counter_view': case 'session_duration':
                        switch (params[1]) {
                            case 'current-session':
                                code.push(subject)
                                break
                            case 'previous-session':
                                code.push(subject) // TO-DO
                                break
                            case 'first-session':
                                code.push(subject) // TO-DO
                                break
                        }
                        code.push(params[2])
                        code.push(targetSet(params[3]))
                        break

                    case 'hourofday': case 'timeofday': case 'dayofweek': case 'dateofmonth':
                        switch (params[1]) {
                            case 'current-session-start':
                                code.push([subject, 'sessionStartTime'])
                                break
                            case 'previous-session-start':
                                // TO-DO
                                break
                            case 'previous-session-end':
                                // TO-DO
                                break
                            case 'first-session-start':
                                // TO-DO
                                break
                            case 'first-session-end':
                                // TO-DO
                                break
                            case 'current-page':
                                code.push([subject])
                                break
                            case 'previous-page':
                                code.push([subject, ['lastview', 'timestamp']])
                                break
                        }
                        code.push(params[2])
                        code.push(targetSet(params[3]))
                        break

                    case 'profile-attribute':
                        code.push(params[1])
                        code.push(params[2])
                        code.push(targetSet(params[3]))
                        break
                }
                codes.push(code)
            }
        })
        if (codes.length) return codes
    }

    const targetSet = val => {
        val = `${val}`
        let value = ''
        if (val.indexOf('|') < 0) value = !isNaN(val) ? +val : val
        else value = val.split('|')
        return value
    }

    return {
        getProfile: args => {
            const { id } = args
            const profileId = event.queryStringParameters.p
            const timestamp = event.queryStringParameters.t

            console.log(`getProfile:: profile_id=${profileId}`)
            return new Promise((resolve, reject) => {
                if (!profileId) reject(new Error(`No profile_id passed`))
                let query
                if (timestamp) {
                    query = {
                        TableName: `profile_${id}`,
                        ScanIndexForward: false,
                        KeyConditionExpression: 'profile_id = :pid, #ts=:timestamp',
                        ExpressionAttributeNames: {
                            '#ts': 'timestamp'
                        },
                        ExpressionAttributeValues: {
                            ':pid': profileId,
                            ':timestamp': timestamp
                        },
                        Limit: 1
                    }
                } else {
                    query = {
                        TableName: `profile_${id}`,
                        ScanIndexForward: false,
                        KeyConditionExpression: 'profile_id = :pid',
                        ExpressionAttributeValues: {
                            ':pid': profileId
                        }
                    }
                }
                dynamo.query(query, (err, data) => {
                    if (err) {
                        console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2))
                    } else {
                        // console.log(JSON.stringify({'query_result':data}))
                        if (data.Items) {
                            resolve({ profile: data })
                        }
                    }
                })
            })
        },

        getProfiles: args => {
            const { config } = args
            const { id } = args
            const group = event.queryStringParameters.g
            const date = event.queryStringParameters.d
            // console.log(`getProfiles:: config=${JSON.stringify(config)}`)
            const parse = require('./parse.js')
            let currentDay = 0
            if (date) {
                const d = {
                    y: parseInt(date.substring(0, 4)),
                    m: parseInt(date.substring(4, 6)) - 1,
                    d: parseInt(date.substring(6, 8))
                }
                const fromTime = (new Date(d.y, d.m, d.d)).getTime()
                const d2 = (new Date()).toLocaleDateString(undefined, { timeZone: config.settings.timezone }).split('/')
                const d3 = (d2.length === 1) ? d2[0].split('-') : [d2[2], d2[0], d2[1]]
                const toTime = (new Date(d3[0], d3[1] - 1, d3[2])).getTime()
                currentDay = Math.floor((toTime - fromTime) / (1000 * 60 * 60 * 24))
            }
            const days = 1

            return new Promise(resolve => {
                queryProfiles(config, id, days, currentDay, [], profiles => {
                    // The one case I can find where callbacks are better than promises: a recursive function which needs to short-circuit under some condition
                    const getProfileViews = items => {
                        const itemsInView = 50
                        const s = {}
                        const p = {}
                        const metrics = { sessions: 0, visitors: 0, views: 0, matches: 0, duration: 0 }
                        if (items) {
                            metrics.views = items.length
                            items.map(k => {
                                if (!s[k.profile_id]) { s[k.profile_id] = {} }
                                if (!s[k.profile_id][k.counter_session]) { s[k.profile_id][k.counter_session] = { visitDuration: 0 } }
                                s[k.profile_id][k.counter_session].visitDuration = s[k.profile_id][k.counter_session].visitDuration < k.session_duration ? k.session_duration : s[k.profile_id][k.counter_session].visitDuration
                                if (!p[k.profile_id] || p[k.profile_id].timestamp < k.timestamp) p[k.profile_id] = k
                            })
                        }
                        const profiles = []
                        Object.keys(s).map(k1 => {
                            p[k1].visitDuration = 0
                            Object.keys(s[k1]).map(k2 => {
                                metrics.sessions++
                                p[k1].visitDuration += s[k1][k2].visitDuration
                            })
                            metrics.duration += p[k1].visitDuration
                            profiles.push(p[k1])
                        })
                        metrics.visitors = profiles.length
                        metrics.duration = metrics.sessions ? Math.floor(metrics.duration / metrics.sessions) : 0
                        const profilesViewsDuration = profiles.slice()
                        const profilesViewsVisits = profiles.slice()
                        const profilesViewsAccessed = profiles.slice()
                        profilesViewsDuration.sort((a, b) => b.visitDuration - a.visitDuration)
                        profilesViewsVisits.sort((a, b) => b.counter_session - a.counter_session)
                        profilesViewsAccessed.sort((a, b) => b.timestamp - a.timestamp)
                        const profilesViews = {
                            metrics,
                            profiles: {
                                duration: profilesViewsDuration.slice(0, itemsInView),
                                visits: profilesViewsVisits.slice(0, itemsInView),
                                accessed: profilesViewsAccessed.slice(0, itemsInView)
                            }
                        }
                        return profilesViews
                    }

                    const items = {}
                    if (group === 'all') {
                        items.all = profiles
                    } else if (group) {
                        items.groups = {}
                        const p = profiles.filter(key => {
                            const code = JSON.parse(JSON.stringify(config.code.groups[group]))
                            return (parse.inGroup(code, { profile: key }))[0]
                        })
                        items.groups[group] = getProfileViews(p)
                    } else {
                        items.groups = {}
                        items.metrics = (getProfileViews(profiles)).metrics
                        Object.keys(config.code.groups).map(group => {
                            const p = profiles.filter(key => {
                                const code = JSON.parse(JSON.stringify(config.code.groups[group]))
                                return (parse.inGroup(code, { profile: key }))[0]
                            })
                            items.groups[group] = getProfileViews(p)
                        })
                    }
                    console.log({ getProfiles_postItems: profiles.length })
                    resolve({ config, profiles: items })
                })
            })
        },

        upload: args => {
            const { event } = args
            return new Promise((resolve, reject) => {
                if (event === null) {
                    reject(new Error('Error detected'))
                }
                resolve({ uploaded: { success: true, body: event } })
            })
        },

        genCode: config => {
            config.code = { groups: {}, actions: {} }
            // It should show up as:
            //      'group': [ ['param1', 'param2', 'param3'],['param1', 'param2', 'param3'],['param1', 'param2', 'param3'] ]
            Object.keys(config.groups).map(group => {
                const spec = config.groups[group].criteria
                config.code.groups[group] = processSpec(config, spec)
            })
            Object.keys(config.actions).map(action => {
                config.code.actions[action] = []
                config.actions[action].steps.map(step => {
                    const ruleItems = []
                    let ruleStep = {}
                    if (step.active) {
                        const spec = step.where.concat(step.when)
                        let code = processSpec(config, spec)
                        // TO-DO: is there any reason to distinguish [] from null?
                        if (!code) code = []
                        step.rules.map(rule => {
                            const ruleGroups = []
                            rule.groups.map(group => {
                                if (config.code.groups[group]) {
                                    // if we've defined group (it's not disabled), add group
                                    ruleGroups.push(code.concat(config.code.groups[group]))
                                }
                            })
                            // there is no group spec, so just use when/where
                            if (!rule.groups.length) ruleGroups.push(code)
                            rule.type = step.type
                            // end with array of all possible first-match criteria, along with the rule what
                            ruleItems.push({ criteria: ruleGroups, rule })
                        })
                        ruleStep = { stepId: step.id, rules: ruleItems, rulePick: step.rulePick || 'first' }
                    }
                    // add steps to action list for each step
                    if (ruleItems.length) config.code.actions[action].push(ruleStep)
                })
            })
            return config
        }

    }
}
