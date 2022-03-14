/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

/**
 * This is the main object that includes all of the objects that need to be accessible from multiple points, specially the dom
 * and the ones concerning the game.
 */

const CONFIG = {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    canvas: undefined,
    context: undefined,
    lastTimeStamp: undefined,
    dom:{
        screens: {
            otherScreens: undefined,
            startTurn: undefined,
            mainMenu: undefined,
            
            ingame: undefined,
            gameOver: undefined,
            instructions: undefined,
            settings: undefined,
        },
        functions: {
            openMainMenu: undefined,
        },
        settings: {
            winningPercentage: undefined,
            lastManStandingCB: undefined,
            destroyedPercentageCB: undefined,
            sudenDeathCB: undefined,
            player0: undefined,
            player1: undefined,
        },
        buttons: {
            restart: undefined,
        },
        
        turnPlayerInfo: undefined,
        ingamePlayerInfo: undefined,
        attackInput: undefined,
        endTurn: undefined,
        attackResult: undefined,
        attackerShipsInformationText: undefined,
        enemyShipsInformationText: undefined,
    },
    game: {
        currentGame: undefined,
        highestScore: 0,
        tileSize : 70,
        boardMargin: 70,
        tileSeparation: 1.1,
        
    },

    functions:{
        gameLoop: undefined,
    },

    settings: {
        width: 900,
        height: 890,
    },
};

export default CONFIG;
