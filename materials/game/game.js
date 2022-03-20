class Game {
    constructor() {

        const game = this

        game.ID = env.newID()

        game.width = 600
        game.height = 600

        game.running = true
        game.winner
    }
}