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
    const play_char = {
        id: data.player_characters_index + 1,
        name: req.query.name,
        stats: req.query.stats,
        level: req.query.level,
        title: req.query.title,
        model: req.query.model,
        player: req.query.player
    }
    if (has_all_parameters(play_char)){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        
        data.player_characters.push(play_char)
        res.status(200).json({
            message: "User added.", 
            object: play_char
        })
        data.player_character_index += 1        
    }
});

router.delete('/',async (req,res) => {
    if (!req.query.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        play_char = data.player_characters.find(x => x.id == req.query.id)
        if (!play_char) {
            res.status(422).json({message: "Invalid request. Non-existing player character."})
        } else {
            data.player_characters.splice(data.player_characters.indexOf(play_char))
            res.status(200).json({
                message: "Player character deleted.", 
                object: play_char
            })
        }
    }
});

router.patch('/',async (req,res) => {
    play_char = get_play_char(req)
    play_char.id = req.query.id
    if (has_all_parameters(play_char) || !play_char.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        old_play_char = data.player_characters.find(x => x.id == req.query.id)
        if (!old_play_char) {
            res.status(422).json({message: "Invalid request. Non-existing user."})
        } else {
            data.player_characters[data.player_characters.indexOf(old_play_char)] = play_char
            res.status(200).json({
                message: "User updated.", 
                object: play_char
            })
        }
    }
});

function get_play_char(req) {
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
    return !play_char.name || !play_char.stats || !play_char.level ||
    !play_char.title || !play_char.model || !play_char.player
}

module.exports = router
