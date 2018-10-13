
module.exports = {
    authenticate: args => {
        const { credentials } = args
        const data = args.config

        const sendAccount = (credentials, data) => {
            //    console.log({credentials:credentials, data:data});
            if (data.accounts[credentials.username]) {
                const account = {
                    info: data.accounts[credentials.username].info,
                    orgs: data.organizations.filter(function (org) { return org.users.indexOf(credentials.username) >= 0 }),
                    token: data.token
                }
                //       console.log ({ account:account });
                return { account }
            } else {

            }
        }

        return new Promise(function (resolve, reject) {
            const crypto = require('crypto')
            const password = crypto.createHash('md5').update(credentials.password).digest('hex')
            //    console.log({password:password});
            if (data.accounts[credentials.username] && data.accounts[credentials.username].password === password) {
                data.token = { start: (new Date()).getTime(), key: '123456789' }
                resolve(sendAccount(credentials, data))
            } else {
                reject(new Error('Username/password not found'))
            }
        }) // Promise
    }
}
