class ExampleUnit extends GameObject {
    constructor(type, gameID, ownerID, left, top, width, height, network, inputs, outputs) {

        super(type, gameID, ownerID, left, top, width, height)

        const exampleUnit = this

        exampleUnit.fitness = 0

        if (network) exampleUnit.network = network.clone(network.weightLayers, network.activationLayers)
        else {

            exampleUnit.network = new NeuralNetwork()
            exampleUnit.network.construct(inputs.length, outputs.length)
        }

        exampleUnit.network.learn()
    }
}

ExampleUnit.prototype.generateFitness = function() {

    const exampleUnit = this

    exampleUnit.fitness += Math.round(exampleUnit.pos.left * exampleUnit.pos.top)
}