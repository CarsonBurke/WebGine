class GameObject {
    constructor(type, gameID, ownerID, left, top, width, height) {

        const gameObj = this

        gameObj.type = type
        gameObj.gameID = gameID
        gameObj.ownerID = ownerID

        gameObj.pos = new Pos(left, top, width, height)

        gameObj.width = width
        gameObj.height = height

        gameObj.ID = newID()

        const game = env.games[gameObj.gameID]

        if (!game.objects[type]) game.objects[type] = {}
        game.objects[type][gameObj.ID] = gameObj
    }
}

GameObject.prototype.draw = function() {

    const gameObj = this

    env.cm.drawImage(document.getElementById(gameObj.type), gameObj.pos.left, gameObj.pos.top, gameObj.width, gameObj.height)
}

GameObject.prototype.delete = function() {

    const gameObj = this

    if (gameObj.network) gameObj.network.visualsParent.remove()

    delete env.games[gameObj.gameID].objects[gameObj.type][gameObj.ID]
}

GameObject.prototype.move = function(left, top) {

    const gameObj = this

    // Check if the new pos is out of map bounds, stopping if it is

    if (left < 0 || left + gameObj.width >= env.width || top < 0 || top + gameObj.height >= env.height) return

    // Otherwise assign the new left and top to the gameObj's pos

    gameObj.pos.left = left
    gameObj.pos.right = left + gameObj.width
    gameObj.pos.top = top
    gameObj.pos.bottom = top + gameObj.height
}


GameObject.prototype.newNetwork = function(inputs, outputs) {

    const gameObj = this

    // Create neural network

    const network = new NeuralNetwork()

    // Create layers

    const layerCount = 3

    for (let i = 0; i < layerCount; i++) network.addLayer()

    // Create perceptrons

    // Create input perceptrons

    for (let i = 0; i < inputs.length; i++) network.layers[0].addPerceptron()

    // Create hidden perceptrons

    const hiddenPerceptronsNeed = 5

    // Loop through layers

    for (const layerName in network.layers) {

        // Filter only hidden layers

        const layersCount = Object.keys(network.layers).length

        if (layerName > 0 && layerName < layersCount - 1) {

            const layer = network.layers[layerName]

            for (let i = 0; i < hiddenPerceptronsNeed; i++) layer.addPerceptron()
        }
    }

    // Create output perceptrons

    for (let i = 0; i < outputs.length; i++) network.layers[layerCount - 1].addPerceptron()

    //

    network.init(inputs, outputs)

    gameObj.network = network
}