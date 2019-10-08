const express = require('express')
const multer = require('multer')
const csv = require('csvtojson')
const fs = require('fs')

const upload = multer({ dest: '.csv' })
const router = express.Router()

router.get('/', (req, res) => res.send('Hello from Get'))

router.post('/', upload.single('file'), (req, res) => {
    csv()
    .fromFile(req.file.path)
    .then(jsonObj => {
        res.send(jsonObj)

        fs.unlinkSync(req.file.path, (err) => {
            if(err) {
                throw new Error("Couldn't delete file")
            }
        })
    })
})

module.exports = router