/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

/**
 * This file runs my main functions, including the gameLoop.
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import Game from "../Classes/Game.js"
import Player from "../Classes/Player.js"


const init = () => {
    CONFIG.game.currentGame = new Game(new Player("Annie", 0), new Player("Bernhard", 1));
    
    CONFIG.lastTimeStamp = performance.now();
    requestAnimationFrame(CONFIG.functions.gameLoop);
}

CONFIG.functions.gameLoop = function () { //Only renders when the game is Active
    if(CONFIG.game.currentGame.isActive === true){
        CONFIG.timePassedSinceLastRender = performance.now();
        render();
        requestAnimationFrame(CONFIG.functions.gameLoop);
    }
}

const render = () => {
    CONFIG.context.clearRect(0, 0, CONFIG.settings.width, CONFIG.settings.height);
    //Developer mode
    /*
    if(document.getElementById("is-debugging").checked){
        if(document.getElementById("player-1").checked === true){
            CONFIG.game.currentGame.players[0].render();
        }else{
            CONFIG.game.currentGame.players[1].render();
        }
    }else{
        if(CONFIG.game.currentGame.currentAttacker === 0){
        CONFIG.game.currentGame.players[0].render();
        }else if(CONFIG.game.currentGame.currentAttacker === 1){
            CONFIG.game.currentGame.players[1].render();
        }
    }
    */
    
        if(CONFIG.game.currentGame.currentAttacker === 0){
        CONFIG.game.currentGame.players[0].render();
        }else if(CONFIG.game.currentGame.currentAttacker === 1){
            CONFIG.game.currentGame.players[1].render();
        }
        
}

window.addEventListener("load", () => {
    window.setTimeout(CONFIG.dom.functions.openMainMenu, 0);
    init();
});