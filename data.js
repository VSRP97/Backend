const data = {
    missions: [
        {
        id: 1,
        name: 'The beginning of the end',
        description: 'It begins',
        level_reward: 100,
        level_requirement: 1,
        quest_giver_character: 'Patches'
        }
    ],
    missions_index: 1,

    mission_objectives: [
        {
            id: 1,
            name: 'The end of the beginning',
            description: 'It ends?',
            count: 1,
            mission: 'The beginning of the end'
        }
    ],
    mission_objectives_index: 1,

    characters: [
        {
            id: 1,
            name: 'Thomas Anderson',
            stats: '1',
            level: 999,
            title: 'The Chosen One',
            model: 'Keanu Reeves'
        }
    ],
    characters_index: 1,

    items: [
        {
        id: 1,
        name: 'The Cube',
        level: 100,
        description: 'THE CUBE',
        image: 'CUBE',
        sell_price: 420
        }
    ],
    items_index: 1,

    player_characters: [
        {
            id: 1,
            name: "play_char1",
            stats: "pro",
            level: 5,
            title: "noob",
            model: "a model",
            player: "idk"
        },
        {
            id: 2,
            name: "play_char2",
            stats: "noob",
            level: 10,
            title: "pro",
            model: "a different model",
            player: "idk x2"
        }
    ],

    players: [
        {
            id: 1,
            name: "a name",
            last_login: new Date("2020-09-15"),
            password: "password1234",
            username: "user.name"
        }
    ],
    
    character_stats: [
        {
            id: 1,
            attribute_1: 2,
            attribute_2: 3,
            attribute_3: 4,
            life: 20 * 2,
            power: 2 * 10 + 3 * 25,
            magic: 4 * 100           
        }
    ],
    player_character_index: 2,
    player_index: 1,
    character_stat_index: 1
}

module.exports = data