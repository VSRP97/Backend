const express = require('express')
const router = express.Router()
const data = require("../data.js")

router.get('/',async (req,res) => {
    if (req.query.id == null){
        res.status(200).json({message: data.players})
    } else {
        player = data.players.find(x => x.id == req.query.id)
        res.status(200).json({message: player})
    }
});

router.post('/',async (req,res) => {
    const player = {
        id: data.players_index + 1,
        name: req.query.name,
        stats: req.query.stats,
        level: req.query.level,
        title: req.query.title,
        model: req.query.model,
        player: req.query.player
    }
    if (has_all_parameters(player)){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        
        data.players.push(player)
        res.status(200).json({
            message: "User added.", 
            object: player
        })
        data.player_character_index += 1        
    }
});

router.delete('/',async (req,res) => {
    if (!req.query.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        player = data.players.find(x => x.id == req.query.id)
        if (!player) {
            res.status(422).json({message: "Invalid request. Non-existing player character."})
        } else {
            data.players.splice(data.players.indexOf(player))
            res.status(200).json({
                message: "Player character deleted.", 
                object: player
            })
        }
    }
});

router.patch('/',async (req,res) => {
    player = get_player(req)
    player.id = req.query.id
    if (has_all_parameters(player) || !player.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        old_player = data.players.find(x => x.id == req.query.id)
        if (!old_player) {
            res.status(422).json({message: "Invalid request. Non-existing user."})
        } else {
            data.players[data.players.indexOf(old_player)] = player
            res.status(200).json({
                message: "User updated.", 
                object: player
            })
        }
    }
});

function get_player(req) {
    return {
        name: req.query.name,
        stats: req.query.stats,
        level: req.query.level,
        title: req.query.title,
        model: req.query.model,
        player: req.query.player
    }
}

function has_all_parameters(player) {
    return !player.name || !player.stats || !player.level ||
    !player.title || !player.model || !player.player
}

module.exports = router
