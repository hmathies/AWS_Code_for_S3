const router = require('express').Router()
const importerController = require('../../modules/importer/importer')

router.post('/getUploadUrl', (req, res) => {
    console.log(req.body)
    const { name, type } = req.body
    importerController.getUploadUrl({ name, type })
        .then(url => res.json({ url }))
})

module.exports = router
