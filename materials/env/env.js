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
        env.topFitness = 0
        env.currentFitness = 0
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

    env.initGames()
}

Env.prototype.initGames = function() {

    const inputs = [
            { name: 'X pos', value: 0 },
            { name: 'Y pos', value: 0 },
        ],
        outputs = [
            { name: 'Move left' },
            { name: 'Move right' },
            { name: 'Move up' },
            { name: 'Move down' },
        ]

    //

    for (let i = 0; i < env.gamesAmount; i++) {

        const game = new Game()
        game.init(inputs, outputs)
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
        'topFitness',
        'currentFitness',
        'speed'
    ]

    for (const statType of stats) {

        document.getElementById(statType).innerText = env[statType]
    }

    // Store the current transformation matrix

    env.cm.save()

    // Use the identity matrix while clearing the canvas

    env.cm.setTransform(1, 0, 0, 1, 0, 0)
    env.cm.clearRect(0, 0, env.width, env.height)

    //

    // Restore the transform

    env.cm.restore()

    //

    /* Object.values(env.games)[0].visualize() */

    // Record units

    const units = []

    //

    for (const gameID in env.games) {

        const game = env.games[gameID]

        for (const ID in game.objects.example) {

            const gameObj = game.objects.example[ID]

            units.push(gameObj)

            gameObj.inputs = [
                { name: 'X pos', value: gameObj.pos.left },
                { name: 'Y pos', value: gameObj.pos.top },
            ]

            gameObj.outputs = [
                { name: 'Move left', operation: () => gameObj.move(gameObj.pos.left - 10, gameObj.pos.top) },
                { name: 'Move right', operation: () => gameObj.move(gameObj.pos.left + 10, gameObj.pos.top) },
                { name: 'Move up', operation: () => gameObj.move(gameObj.pos.left, gameObj.pos.top - 10) },
                { name: 'Move down', operation: () => gameObj.move(gameObj.pos.left, gameObj.pos.top + 10) },
            ]

            gameObj.network.forwardPropagate(gameObj.inputs)
            gameObj.network.updateVisuals()
            gameObj.network.visualsParent.style.display = 'none'

            // Find last layer

            const lastLayer = gameObj.network.layers[Object.keys(gameObj.network.layers).length - 1],
                lastLayerPerceptrons = Object.values(lastLayer.perceptrons)
                /* 
                            for (const perceptron of lastLayerPerceptrons) {

                                if (perceptron.activateValue <= 0) continue

                                gameObj.outputs[perceptron.name].operation()
                            }
                 */

            // Sort perceptrons by activateValue and get the largest one

            const perceptronWithLargestValue = lastLayerPerceptrons.sort((a, b) => a.activateValue - b.activateValue).reverse()[0]

            if (perceptronWithLargestValue.activateValue > 0) {

                gameObj.outputs[perceptronWithLargestValue.name].operation()
            }

            gameObj.generateFitness()
        }

        game.visualize()
    }

    //

    const fittestUnit = env.findFittestUnit(units)

    fittestUnit.network.visualsParent.style.display = 'flex'

    if (fittestUnit.fitness > env.topFitness) env.topFitness = fittestUnit.fitness
    env.currentFitness = fittestUnit.fitness

    //

    if (env.tick - env.lastReset > 1000) {

        env.reset(fittestUnit)
    }
}

Env.prototype.findFittestUnit = function(units) {

    return fitestUnit = units.sort((a, b) => a.fitness - b.fitness)[units.length - 1]
}

Env.prototype.reset = function(fittestUnit) {

    env.lastReset = env.tick
    env.roundTick = 0

    for (const gameID in env.games) {

        const game = env.games[gameID]

        game.reset()
        game.init(fittestUnit.inputs, fittestUnit.outputs, fittestUnit.network)
    }

    fittestUnit.delete()
}