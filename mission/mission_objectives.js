const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async (req, res) => {
    res.status(200).json(data.mission_objectives)
})

router.get('/:id', async (req, res) => {
    try {
        let id = +req.params.id
        res.status(200).json(data.mission_objectives.filter(n => n.id === id))
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.post('/', async (req, res) => {
    if (req.query.name && req.query.description && req.query.count && req.query.mission) {
        let dict = {
            id: data.mission_objectives_index+1,
            name: req.query.name,
            description: req.query.description,
            count: +req.query.count,
            mission: req.query.mission
        }
        data.mission_objectives.push(dict)
        res.status(201).json({'message':'success'})
        data.mission_objectives_index += 1
    }else{
        res.status(404).json({'message':'failure'})
    }
})

router.delete('/:id', async (req, res) => {
    let id = +req.params.id
    const len = data.mission_objectives.length
    data.mission_objectives = data.mission_objectives.filter(n => n.id !== id)
    if (len === data.mission_objectives.length) {
        res.status(404).json({Message: 'Failure'})
    }else{
        res.status(200).json({Message: 'Success'})
    }
})

router.patch('/:id', async (req, res) => {
    let id = +req.params.id
    index = data.mission_objectives.findIndex(i => i.id === id)
    if (index !== -1){
        if (req.query.name) {
            data.mission_objectives[index].name = req.query.name
        }
        if (req.query.description) {
            data.mission_objectives[index].description = req.query.description
        }
        if (req.query.count) {
            data.mission_objectives[index].count = +req.query.count
        }

        res.status(200).json({Message: 'Success'})
    }else{
        res.status(404).json({Message: 'Failure'})
    }
})

module.exports = router