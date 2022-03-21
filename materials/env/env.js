class Env {
    constructor() {

        const env = this

        env.games = {}
        env.IDIndex = 0
        env.width = 600
        env.height = 600
        env.lastReset = 0

        env.tick = 0
        env.roundTick = 0
        env.topScore = 0
        env.currentScore = 0
        env.gamesAmount = 10
        env.speed = 1
    }
}

const env = new Env()

Env.prototype.init = function() {

    // Get the existing canvas environment

    env.canvas = document.getElementsByClassName('env')[0]

    // Style canvas

    env.canvas.width = env.width
    env.canvas.height = env.height

    // Create canvas manager by configuring canvas context

    env.cm = env.canvas.getContext('2d')

    // Turn off anti-aliasing

    env.cm.imageSmoothingEnabled = false

    //

    for (let i = 0; i < env.gamesAmount; i++) {

        new Game()
    }
}

Env.prototype.newID = function() {

    return env.IDIndex++
}

Env.prototype.run = function() {

    env.tick += 1
    env.roundTick += 1

    const stats = [
        'tick',
        'roundTick',
        'gamesAmount',
        'topScore',
        'currentScore',
        'speed'
    ]

    if (env.tick - env.lastReset > 1000) env.reset()

    for (const statType of stats) {

        document.getElementById(statType).innerText = env[statType]
    }

    //

    for (const gameID in env.games) {

        const game = env.games[gameID]

        for (const type in game.objects) {

            if (type != 'default') continue

            for (const ID in game.objects[type]) {

                const gameObj = game.objects[type][ID]

                gameObj.move(gameObj.pos.left + Math.random() * 5 - Math.random() * 5, gameObj.pos.top + Math.random() * 5 - Math.random() * 5)
            }
        }
    }

    //

    // Store the current transformation matrix

    env.cm.save()

    // Use the identity matrix while clearing the canvas

    env.cm.setTransform(1, 0, 0, 1, 0, 0)
    env.cm.clearRect(0, 0, env.width, env.height)

    //

    // Restore the transform

    env.cm.restore()

    //

    Object.values(env.games)[0].visualize()
}

Env.prototype.reset = function() {

    env.lastReset = env.tick
    env.roundTick = 0
}