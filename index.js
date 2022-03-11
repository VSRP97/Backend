const express= require('express');

let app=express()

app.use(express.json())
const missions = require('./mission/misiones')
const mission_objectives = require('./mission/mission_objectives')
const characters = require('./player/character/caracter') 

app.use('/missions', missions)
app.use('/mission_objectives', mission_objectives)
app.use('/characters', characters)

play_char = require('./player/player_characters.js')
app.use('/player_character', play_char)

player = require('./player/player.js')
app.use('/player', player)

character_stats = require("./player/character/character_stats.js")
app.use('/character_stat', character_stats)

app.get('/',async(req,res)=>{
    res.status(200).json({'message':'success'})
});

app.listen(8080);