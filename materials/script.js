function wait(miliseconds) {

    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

let restart = false

document.addEventListener('change', (function() { restart = true }))
document.addEventListener('change', changeSpeed)

function changeSpeed() {

    speedMultiplier = document.getElementById('newSpeed').value || speedMultiplier

    let i = 0

    while (i < speedMultiplier) {

        if (restart) {

            restart = false
            return
        }

        runTick()

        async function runTick() {

            while (1 == 1) {

                await wait(speedMultiplier - 1000)

                runEnv()
            }
        }

        i++
    }
}