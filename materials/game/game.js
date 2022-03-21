class Game {
    constructor() {

        const game = this

        game.ID = env.newID()
        game.players = {}
        game.objects = {}
        game.running = true

        env.games[game.ID] = game

        game.init()
    }
}

Game.prototype.init = function() {

    const game = this

    // Create players

    new Player('person', game.ID)

    // Create units

    new GameObject('default', game.ID, Object.keys(game.players)[0], 50, 50, 100, 100, 'defaultSprite')
}

Game.prototype.visualize = function() {

    const game = this

    for (const type in game.objects) {

        for (const ID in game.objects[type]) {

            const object = game.objects[type][ID]

            object.draw()
        }
    }
}