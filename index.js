const express= require('express');
const data = require('./data.js')
let app=express()

app.use(express.json())
const missions = require('./mission/misiones')
const mission_objectives = require('./mission/mission_objectives')
const characters = require('./player/character/caracter') 
const play_char = require('./player/player_characters.js')
const player = require('./player/player.js')
const character_stats = require("./player/character/character_stats.js")
const items = require('./items/items')
const models_3d = require('./assets/models_3d')
const images_2d = require('./assets/images_2d')

app.use('/missions', missions)
app.use('/mission_objectives', mission_objectives)
app.use('/characters', characters)
app.use('/player_character', play_char)
app.use('/player', player)
app.use('/character_stat', character_stats)
app.use('/items', items)
app.use('/models_3d', models_3d)
app.use('/images_2d', images_2d)

app.get('/',async(req,res)=>{
    res.status(200).json({'message':'success'})
});

app.post('/login', async (req, res) => {
    if (!req.query.username || !req.query.password) {
        res.status(422).json({message: "Invalid request. Not enough parameters"})
    } else {
        const player = data.players.find(x => x.username == req.query.username)
        if (!player) {
            res.status(422).json({message: "Invalid request. Non-existing player"})
        } else if (player.password != req.query.password){
            res.status(422).json({message: "Invalid request. Incorrect password"})
        } else {
            player.last_login = new Date()
            data.players[data.players.indexOf(player)] = player
            res.status(200).json({
                message: "User logged in succesfully.", 
                object: player
            })
        }
    }
})

app.listen(8080);