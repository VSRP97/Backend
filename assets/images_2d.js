const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async (req, res) => {
    res.status(200).json(data.images_2d)
})

router.get('/:id/', async (req, res) => {
    try {
        let id = +req.params.id
        res.status(200).json(data.images_2d.filter(n => n.id === id))
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.post('/', async (req, res) => {
    if (req.query.address) {
        let dict = {
            id: data.images_2d_index+1,
            address: req.query.address,
        }
        data.images_2d.push(dict)
        res.status(201).json({'message':'success'})
        data.images_2d_index += 1
    }else{
        res.status(404).json({'message':'failure'})
    }
})

router.delete('/:id', async (req, res) => {
    let id = +req.params.id
    const len = data.images_2d.length
    data.images_2d = data.images_2d.filter(n => n.id !== id)
    if (len === data.images_2d.length) {
        res.status(404).json({Message: 'Failure'})
    }else{
        res.status(200).json({Message: 'Success'})
    }
})

router.patch('/:id', async (req, res) => {
    let id = +req.params.id
    index = data.images_2d.findIndex(i => i.id === id)
    if (index !== -1){
        if (req.query.address) {
            data.images_2d[index].address = req.query.address
        }

        res.status(200).json({Message: 'Success'})
    }else{
        res.status(404).json({Message: 'Failure'})
    }
})

module.exports = router