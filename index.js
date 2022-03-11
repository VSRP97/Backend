const express= require('express');

let app=express()

app.use(express.json())
const missions = require('./mission/misiones')
const mission_objectives = require('./mission/mission_objectives')
const characters = require('./player/character/caracter') 
const play_char = require('./player/player_characters.js')
const player = require('./player/player.js')
const character_stats = require("./player/character/character_stats.js")
const items = require('./items/items')

app.use('/missions', missions)
app.use('/mission_objectives', mission_objectives)
app.use('/characters', characters)
app.use('/player_character', play_char)
app.use('/player', player)
app.use('/character_stat', character_stats)
app.use('/items', items)

app.get('/',async(req,res)=>{
    res.status(200).json({'message':'success'})
});

app.listen(8080);