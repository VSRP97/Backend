const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async (req, res) => {
    res.status(200).json(data.models_3d)
})

router.get('/:id/', async (req, res) => {
    try {
        let id = +req.params.id
        res.status(200).json(data.models_3d.filter(n => n.id === id))
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.post('/', async (req, res) => {
    if (req.query.address) {
        let dict = {
            id: data.models_3d_index+1,
            address: req.query.address,
        }
        data.models_3d.push(dict)
        res.status(201).json({'message':'success'})
        data.models_3d_index += 1
    }else{
        res.status(404).json({'message':'failure'})
    }
})

router.delete('/:id', async (req, res) => {
    let id = +req.params.id
    const len = data.models_3d.length
    data.models_3d = data.models_3d.filter(n => n.id !== id)
    if (len === data.models_3d.length) {
        res.status(404).json({Message: 'Failure'})
    }else{
        res.status(200).json({Message: 'Success'})
    }
})

router.patch('/:id', async (req, res) => {
    let id = +req.params.id
    index = data.models_3d.findIndex(i => i.id === id)
    if (index !== -1){
        if (req.query.address) {
            data.models_3d[index].address = req.query.address
        }

        res.status(200).json({Message: 'Success'})
    }else{
        res.status(404).json({Message: 'Failure'})
    }
})

module.exports = router