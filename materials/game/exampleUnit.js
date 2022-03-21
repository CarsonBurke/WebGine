class ExampleUnit extends GameObject {
    constructor(type, gameID, ownerID, left, top, width, height, inputs, outputs, network) {

        super(type, gameID, ownerID, left, top, width, height)

        const exampleUnit = this

        exampleUnit.fitness = 0

        if (network) exampleUnit.network = network.clone(inputs, outputs)
        else exampleUnit.newNetwork(inputs, outputs)

        exampleUnit.network.learn()
    }
}

ExampleUnit.prototype.generateFitness = function() {

    const exampleUnit = this

    exampleUnit.fitness += Math.round(exampleUnit.pos.left * exampleUnit.pos.top)
}