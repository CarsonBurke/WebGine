class ExampleUnit extends GameObject {
    constructor(type, gameID, ownerID, left, top, width, height, inputs, outputs, network) {

        super(type, gameID, ownerID, left, top, width, height)

        const exampleUnit = this

        exampleUnit.fitness = 0

        if (network) {

            exampleUnit.network = network.clone(inputs, outputs)
                /* exampleUnit.network.learn() */
        } else exampleUnit.newNetwork(inputs, outputs)

        exampleUnit.inputs = inputs
        exampleUnit.outputs = outputs
    }
}

ExampleUnit.prototype.generateFitness = function() {

    const exampleUnit = this

    exampleUnit.fitness += Math.round(exampleUnit.pos.left * exampleUnit.pos.top)
}