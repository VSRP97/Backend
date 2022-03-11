const express = require('express')
const router = express.Router()
const data = require('../../data')

router.get('/', async (req, res) => {
    let list = JSON.parse(JSON.stringify(data.characters))
    list.map(d => d['expanded_stats'] = data.character_stats.filter(n => n.id == d.stats))
    res.status(200).json(list)
})

router.get('/:id/', async (req, res) => {
    let list
    try {
        let id = +req.params.id
        list = JSON.parse(JSON.stringify(data.characters.filter(n => n.id === id)))
        list.map(d => d['expanded_stats'] = data.character_stats.filter(n => n.id == d.stats))
        res.status(200).json(list)
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.get('/:id/missions', async (req, res) => {
    try {
        let id = +req.params.id
        let char = data.characters.filter(n => n.id === id)
        let avail_missions = data.missions.filter(n => char[0].level >= n.level_requirement)
        let dict = JSON.parse(JSON.stringify(char[0]))
        dict['missions'] = avail_missions
        console.log(dict)
        res.status(200).json(dict)
    } catch (error) {
        res.status(404).json({'message':'failure'})
    }
})

router.post('/', async (req, res) => {
    if (req.query.name && req.query.stats && req.query.level && req.query.title && req.query.model) {
        let dict = {
            id: data.characters_index+1,
            name: req.query.name,
            stats: req.query.stats,
            level: +req.query.level,
            title: req.query.title,
            model: req.query.model,
        }
        data.characters.push(dict)
        res.status(201).json({'message':'success'})
        data.characters_index += 1
    }else{
        res.status(404).json({'message':'failure'})
    }
})

router.delete('/:id', async (req, res) => {
    let id = +req.params.id
    const len = data.characters.length
    data.characters = data.characters.filter(n => n.id !== id)
    if (len === data.characters.length) {
        res.status(404).json({Message: 'Failure'})
    }else{
        res.status(200).json({Message: 'Success'})
    }
})

router.patch('/:id', async (req, res) => {
    let id = +req.params.id
    index = data.characters.findIndex(i => i.id === id)
    if (index !== -1){
        if (req.query.name) {
            data.characters[index].name = req.query.name
        }
        if (req.query.stats) {
            data.characters[index].stats = req.query.stats
        }
        if (req.query.level) {
            data.characters[index].level = +req.query.level
        }
        if (req.query.title) {
            data.characters[index].title = req.query.title
        }
        if (req.query.model) {
            data.characters[index].model = req.query.model
        }

        res.status(200).json({Message: 'Success'})
    }else{
        res.status(404).json({Message: 'Failure'})
    }
})

module.exports = router