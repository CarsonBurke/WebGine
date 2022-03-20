class Game {
    constructor() {

        const game = this

        game.ID = env.newID()

        game.running = true
    }
}

Game.prototype.init = function() {

    const game = this

    // Create players

    new Player('person')
}

Game.prototype.visualize = function() {

    const game = this


}