class Game {
    constructor() {

        const game = this

        game.ID = env.newID()
        game.players = {}
        game.objects = {}
        game.running = true

        env.games[game.ID] = game
    }
}

Game.prototype.init = function(inputs, outputs, network) {

    const game = this

    // Create players

    new Player('person', game.ID)

    // Create x number of units

    for (let i = 0; i < 10; i++) {

        new ExampleUnit('example', game.ID, Object.keys(game.players)[0], 10, 10, 100, 100, inputs, outputs, network)
    }
}

Game.prototype.reset = function() {

    const game = this

    game.players = {}

    for (const type in game.objects) {

        for (const ID in game.objects[type]) {

            const gameObj = game.objects[type][ID]

            gameObj.delete()
        }
    }

    game.running = true
}

Game.prototype.visualize = function() {

    const game = this

    for (const type in game.objects) {

        for (const ID in game.objects[type]) {

            const gameObj = game.objects[type][ID]

            gameObj.draw()
        }
    }
}