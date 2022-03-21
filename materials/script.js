env.init()

const runners = []

class Runner {
    constructor() {

        const runner = this

        runners.shift()

        runner.ID = newID()

        runners.push(runner.ID)
    }
}

Runner.prototype.wait = function(miliseconds) {

    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

Runner.prototype.runTick = async function() {

    const runner = this

    while (1 == 1) {

        if (!runners.includes(runner.ID)) return

        await runner.wait(env.speed - 1000)

        env.run()
    }
}

Runner.prototype.run = async function() {

    const runner = this

    let i = 0

    while (i < env.speed) {

        runner.runTick()

        i++
    }
}

document.getElementById('changeSpeed').addEventListener('click', changeSpeed)

changeSpeed()

function changeSpeed() {

    env.speed = parseInt(document.getElementById('newSpeed').value) || env.speed

    const runner = new Runner()
    runner.run()
}