const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async (req, res) => {
    if (req.query.quest_giver_character) {
        res.status(200).json(data.missions.filter(n => n.quest_giver_character === req.query.quest_giver_character))
    }else{
        res.status(200).json(data.missions)
    }
})

router.post('/', async (req, res) => {
    if (req.query.name && req.query.description && req.query.level_reward && req.query.level_requirement && req.query.quest_giver_character) {
        let dict = {
            name: req.query.name,
            description: req.query.description,
            level_reward: +req.query.level_reward,
            level_requirement: +req.query.level_requirement,
            quest_giver_character: req.query.quest_giver_character
        }
        data.missions.push(dict)
        res.status(201).json({'message':'success'})
    }else{
        res.status(404).json({'message':'failure'})
    }
})

module.exports = router