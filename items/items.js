const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async (req, res) => {
    res.status(200).json(data.items)
})

router.get('/:id/', async (req, res) => {
    try {
        let id = +req.params.id
        res.status(200).json(data.items.filter(n => n.id === id))
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.post('/', async (req, res) => {
    if (req.query.name && req.query.level && req.query.description && req.query.image && req.query.sell_price) {
        let dict = {
            id: data.items_index+1,
            name: req.query.name,
            level: +req.query.level,
            description: req.query.description,
            image: req.query.image,
            sell_price: +req.query.sell_price
        }
        data.items.push(dict)
        res.status(201).json({'message':'success'})
        data.items_index += 1
    }else{
        res.status(404).json({'message':'failure'})
    }
})

router.delete('/:id', async (req, res) => {
    let id = +req.params.id
    const len = data.items.length
    data.items = data.items.filter(n => n.id !== id)
    if (len === data.items.length) {
        res.status(404).json({Message: 'Failure'})
    }else{
        res.status(200).json({Message: 'Success'})
    }
})

router.patch('/:id', async (req, res) => {
    let id = +req.params.id
    index = data.items.findIndex(i => i.id === id)
    if (index !== -1){
        if (req.query.name) {
            data.items[index].name = req.query.name
        }
        if (req.query.level) {
            data.items[index].level = +req.query.level
        }
        if (req.query.description) {
            data.items[index].description = req.query.description
        }
        if (req.query.image) {
            data.items[index].image = req.query.image
        }
        if (req.query.sell_price) {
            data.items[index].sell_price = +req.query.sell_price
        }

        res.status(200).json({Message: 'Success'})
    }else{
        res.status(404).json({Message: 'Failure'})
    }
})

module.exports = router