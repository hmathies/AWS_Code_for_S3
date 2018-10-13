const { Client } = require('pg')

const { RDS_HOST, RDS_DBNAME, RDS_USERNAME, RDS_PASSWORD, RDS_PORT } = process.env

module.exports = function database () {
    const client = new Client({
        host: RDS_HOST,
        database: RDS_DBNAME,
        user: RDS_USERNAME,
        password: RDS_PASSWORD,
        port: RDS_PORT
    })

    client.connect()
        .then(() => console.log('Connected'))
        .catch(err => console.log(err))

    return client
}
