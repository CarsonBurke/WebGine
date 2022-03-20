class Env {
    constructor() {

        const env = this

        env.ID = 0
        env.tick = 0

        env.width = 600
        env.height = 600

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
}

Env.prototype.newID = function() {

    return env.ID++
}

Env.prototype.run = function() {

    env.tick += 1

    const stats = [
        'tick',
        'roundTick',
        'gamesAmount',
        'topScore',
        'currentScore',
        'speed'
    ]

    for (const statType of stats) {

        document.getElementById(statType).innerText = env[statType]
    }
}