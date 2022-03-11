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
    const player = get_player(req)
    player.id = data.player_index + 1
    if (has_all_parameters(player)){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        
        data.players.push(player)
        res.status(200).json({
            message: "User added.", 
            object: player
        })
        data.player_index += 1        
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
            data.players.splice(data.players.indexOf(player), 1)
            res.status(200).json({
                message: "Player character deleted.", 
                object: player
            })
        }
    }
});

router.patch('/',async (req,res) => {
    player = get_player_patch(req)
    player.id = req.query.id
    if (has_all_parameters_patch(player)|| !player.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        old_player = data.players.find(x => x.id == req.query.id)
        if (!old_player) {
            res.status(422).json({message: "Invalid request. Non-existing user."})
        } else {
            old_player.name = player.name
            old_player.password = player.password
            data.players[data.players.indexOf(old_player)] = old_player
            res.status(200).json({
                message: "User updated.", 
                object: old_player
            })
        }
    }
});

function get_player(req) {
    return {
        name: req.query.name,
        last_login: req.query.last_login,
        password: req.query.password,
        username: req.query.username
    }
}

function get_player_patch(req) {
    return {
        password: req.query.password,
        name: req.query.name
    }
}

function has_all_parameters(player) {
    return !player.name || !player.last_login || !player.password || !player.username
}

function has_all_parameters_patch(player) {
    return !player.password || !player.name
}

module.exports = router
