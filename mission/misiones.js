const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async (req, res) => {
    let list
    if (req.query.quest_giver_character) {
        list = JSON.parse(JSON.stringify(data.missions.filter(n => n.quest_giver_character === req.query.quest_giver_character)))
        list.map(d => d['objectives'] = data.mission_objectives.filter(n => n.mission === d.name))
        res.status(200).json(list)
    }else{
        list = JSON.parse(JSON.stringify(data.missions))
        list.map(d => d['objectives'] = data.mission_objectives.filter(n => n.mission === d.name))
        res.status(200).json(list)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let id = +req.params.id
        let list = JSON.parse(JSON.stringify(data.missions.filter(n => n.id === id)))
        list.map(d => d['objectives'] = data.mission_objectives.filter(n => n.mission === d.name))
        res.status(200).json(list)
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.post('/', async (req, res) => {
    if (req.query.name && req.query.description && req.query.level_reward && req.query.level_requirement && req.query.quest_giver_character) {
        let dict = {
            id: data.missions_index+1,
            name: req.query.name,
            description: req.query.description,
            level_reward: +req.query.level_reward,
            level_requirement: +req.query.level_requirement,
            quest_giver_character: req.query.quest_giver_character
        }
        data.missions.push(dict)
        res.status(201).json({'message':'success'})
        data.missions_index += 1
    }else{
        res.status(404).json({'message':'failure'})
    }
})

router.delete('/:id', async (req, res) => {
    let id = +req.params.id
    const len = data.missions.length
    data.missions = data.missions.filter(n => n.id !== id)
    if (len === data.missions.length) {
        res.status(404).json({Message: 'Failure'})
    }else{
        res.status(200).json({Message: 'Success'})
    }
})

router.patch('/:id', async (req, res) => {
    let id = +req.params.id
    index = data.missions.findIndex(i => i.id === id)
    if (index !== -1){
        if (req.query.name) {
            data.missions[index].name = req.query.name
        }
        if (req.query.description) {
            data.missions[index].description = req.query.description
        }
        if (req.query.level_reward) {
            data.missions[index].level_reward = +req.query.level_reward
        }
        if (req.query.level_requirement) {
            data.missions[index].level_requirement = +req.query.level_requirement
        }
        if (req.query.quest_giver_character) {
            data.missions[index].quest_giver_character = req.query.quest_giver_character
        }
        res.status(200).json({Message: 'Success'})
    }else{
        res.status(404).json({Message: 'Failure'})
    }
})

module.exports = router