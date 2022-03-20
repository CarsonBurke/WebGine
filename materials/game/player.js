class Player {
    constructor(name, game) {

        const player = this

        player.name = name
        player.game = game

        player.ID = env.newID()
    }
}