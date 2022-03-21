Perceptron.prototype.mutateWeights = function() {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // Mutate weights

    for (let i = 0; i < perceptron.weights.length; i++) {

        perceptron.weights[i] += Math.random() * network.learningRate /* (Math.random() * network.learningRate + Math.random() * network.learningRate * -1) */
    }
}

Perceptron.prototype.updateVisual = function() {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // If perceptron's activateValue is 0

    if (perceptron.activateValue == 0) {

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

Perceptron.prototype.createWeights = function(inputCount) {

    const perceptron = this

    // Create one weight perceptron in previous layer

    perceptron.weights = []

    // Iterate for number of perceptrons in previous layer

    for (let i = 0; i < inputCount; i++) {

        perceptron.weights.push(0)
    }
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