const express = require('express')
const router = express.Router()
const data = require("../../data.js")

router.get('/',async (req,res) => {
    if (req.query.id == null){
        res.status(200).json({message: data.character_stats})
    } else {
        char_stat = data.character_stats.find(x => x.id == req.query.id)
        res.status(200).json({message: char_stat})
    }
});

router.post('/',async (req,res) => {
    const char_stat = get_char_stat(req)
    char_stat.id = data.character_stat_index + 1
    if (has_all_parameters(char_stat)){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        data.character_stats.push(char_stat)
        res.status(200).json({
            message: "Character stat added.", 
            object: char_stat
        })
        data.character_stat_index += 1       
    }
});

router.delete('/',async (req,res) => {
    if (!req.query.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        char_stat = data.character_stats.find(x => x.id == req.query.id)
        if (!char_stat) {
            res.status(422).json({message: "Invalid request. Non-existing player character."})
        } else {
            data.character_stats.splice(data.character_stats.indexOf(char_stat), 1)
            res.status(200).json({
                message: "Character stat deleted.", 
                object: char_stat
            })
        }
    }
});

router.patch('/',async (req,res) => {
    char_stat = get_char_stat(req)
    char_stat.id = req.query.id
    if (has_all_parameters(char_stat) || !char_stat.id){
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        old_char_stat = data.character_stats.find(x => x.id == req.query.id)
        if (!old_char_stat) {
            res.status(422).json({message: "Invalid request. Non-existing user."})
        } else {
            data.character_stats[data.character_stats.indexOf(old_char_stat)] = char_stat
            res.status(200).json({
                message: "Character stat updated.", 
                object: char_stat
            })
        }
    }
});

function get_char_stat(req) {
    return {
        attribute_1: req.query.attribute_1,
        attribute_2: req.query.attribute_2,
        attribute_3: req.query.attribute_3,
        life: 20 * req.query.attribute_1,
        power: req.query.attribute_1 * 10 + req.query.attribute_2 * 25,
        magic: req.query.attribute_3 * 100 
    }
}

function has_all_parameters(char_stat) {
    return !char_stat.attribute_1 || !char_stat.attribute_2 || !char_stat.attribute_3
}

module.exports = router