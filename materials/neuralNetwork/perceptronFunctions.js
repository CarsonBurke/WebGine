Perceptron.prototype.mutateWeights = function() {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // Mutate weights

    for (let i = 0; i < perceptron.weights.length; i++) {

        perceptron.weights[i] += (Math.random() * network.learningRate - Math.random() * network.learningRate)
    }
}

Perceptron.prototype.updateVisual = function() {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // If perceptron's activateValue is 0

    if (Math.floor(perceptron.activateValue * 100) / 100 == 0) {

        // Display 0

        perceptron.visual.innerText = 0

        // Style outline

        perceptron.visual.style.outlineColor = network.inactiveColor

        // And stop

        return
    }

    // Style outline

    perceptron.visual.style.outlineColor = network.activeColor

    // Show perceptrons activateValue

    perceptron.visual.innerText = (perceptron.activateValue).toFixed(2)
    return
}

Perceptron.prototype.findWeightCount = function(inputs) {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // Config weightCount with an account for the bias

    let weightCount = 1

    // If perceptron's layerName is 0

    if (perceptron.layerName == 0) {

        weightCount += inputs.length
        return weightCount
    }

    // If perceptron's layerName is more than 0

    if (perceptron.layerName > 0) {

        // Find previous layer

        const previousLayer = network.layers[perceptron.layerName - 1]

        // Find number of perceptrons in previous layer

        let previousLayerPerceptronCount = Object.keys(previousLayer.perceptrons).length

        // Change iterations to number of perceptrons in previous layer

        weightCount += previousLayerPerceptronCount
        return weightCount
    }
}

Perceptron.prototype.createWeights = function(inputs) {

    const perceptron = this

    // Create one weight perceptron in previous layer

    perceptron.weights = []

    const weightCount = perceptron.findWeightCount(inputs)

    // Iterate for number of perceptrons in previous layer

    for (let i = 0; i < weightCount; i++) {

        perceptron.weights.push(1)
    }

    perceptron.mutateWeights()
}

Perceptron.prototype.updateWeights = function() {

    const perceptron = this

    // Reset weight results

    perceptron.weightResults = []

    for (let i = 0; i < perceptron.inputs.length; i++) {

        // Assign weight to input and add value to weightResults

        perceptron.weightResults.push(perceptron.inputs[i] * perceptron.weights[i])
    }
}

Perceptron.prototype.activate = function() {

    const perceptron = this

    // Reset activateValue

    perceptron.activateValue = 0

    // Combine all weightResults into activateValue

    for (const weightResult of perceptron.weightResults) perceptron.activateValue += weightResult

    // Implement convert activateValue to 0 if negative

    perceptron.activateValue = Math.max(perceptron.activateValue, 0)
}

Perceptron.prototype.run = function(inputs) {

    const perceptron = this

    // Assign inputs

    perceptron.inputs = inputs

    // Run commands to convert the inputs into an activateValue

    perceptron.updateWeights()
    perceptron.activate()
}