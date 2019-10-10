const express = require('express')
const multer = require('multer')
const csv = require('csvtojson')
const fs = require('fs')

const upload = multer({ dest: '.csv' })
const router = express.Router()

router.get('/', (req, res) => res.send('Hello from Get'))

router.post('/', upload.single('file'), (req, res) => {

    const fileName = req.file.originalname
    const fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1))
    console.log(fileExtension)
    if(fileExtension !== 'csv' && fileExtension !== 'txt') {
        res.status(200).send({
            error: {
                message: 'Only CSV and txt files are accepted formats.'
            }
        })
    }
    csv()
    .fromFile(req.file.path)
    .then(jsonObj => {
        fs.unlinkSync(req.file.path, (err) => {
            if(err) {
                throw new Error("Couldn't delete file")
            }
        })
        res.status(200).send(jsonObj)
    })
})

module.exports = router