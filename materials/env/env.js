const env = new Env()

class Env {
    constructor() {

        env.ID = 0
        env.tick = 0
    }
}

Env.prototype.newID = function() {

    return env.ID++
}