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
    player_character_index: 2
}

module.exports = data