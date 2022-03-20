class GameObj {
    constructor(type, gameID, ownerID, left, top, width, height, imageSource) {

        const gameObj = this

        gameObj.type = type
        gameObj.gameID = gameID
        gameObj.ownerID = ownerID

        gameObj.pos = new Pos(left, top, width, height)

        gameObj.width = width
        gameObj.height = height

        gameObj.imageSource = imageSource

        gameObj.id = newID()

        if (!game.objects[type]) game.objects[type] = {}
        game.objects[type][gameObj.id] = gameObj
    }
}

GameObject.prototype.draw = function() {

    const gameObj = this

    game.cm.drawImage(document.getElementById(gameObj.imageSource), gameObj.pos.left, gameObj.pos.top, gameObj.width, gameObj.height)
}

GameObject.prototype.delete = function() {

    const gameObj = this

    if (gameObj.network) gameObj.network.visualsParent.remove()

    delete game.objects[gameObj.type][gameObj.id]
}

GameObject.prototype.move = function(left, top) {

    const gameObj = this

    // Check if the new pos is out of map bounds, stopping if it is

    if (left < 0 || left + gameObj.width >= env.games[gameObj.gameID].width || top < 0 || top + gameObj.height >= env.games[gameObj.gameID].height) return

    // Otherwise assign the new left and top to the gameObj's pos

    gameObj.pos.left = left
    gameObj.pos.right = left + gameObj.width
    gameObj.pos.top = top
    gameObj.pos.bottom = top + gameObj.width
}