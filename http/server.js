const port = 4000
const express = require('express')
const app = express()
const PORT = process.env.PORT || port

app.use('/dashboard/:product', (req, res) => {
    const { product } = req.params
    const routing = {
        port: product === 'personalizer' ? 443 : product === 'importer' ? 8080 : 0,
        product
    }
    const index = require('./index.js')(routing)
    res.send(index)
})

app.use(express.static('.'))
app.use(express.static('../ui'))

app.listen(PORT, () => console.log(`Server listening at ${PORT}`))
