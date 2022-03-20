env.init()

function wait(miliseconds) {

    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

let restart = false

document.addEventListener('change', (function() { restart = true }))
document.addEventListener('change', changeSpeed)

function changeSpeed() {

    env.speed = document.getElementById('newSpeed').value || env.speed

    let i = 0

    while (i < env.speed) {

        if (restart) {

            restart = false
            return
        }

        runTick()

        async function runTick() {

            while (1 == 1) {

                await wait(env.speed - 1000)

                env.run()
            }
        }

        i++
    }
}