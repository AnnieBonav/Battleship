/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

/**
 * I use this file to initialize all my Document Object Model interaction, so that my main script is not cloded. This is possible 
 * because I have all my DOM elements (that need to be accesible by other classes) in the Config object
 */
import CONFIG from "../ToolBox/ConfigStorage.js";

//CANVAS
CONFIG.canvas = document.getElementById("game-canvas");
CONFIG.context = CONFIG.canvas.getContext("2d");
CONFIG.canvas.setAttribute('width', CONFIG.settings.width);
CONFIG.canvas.setAttribute('height', CONFIG.settings.height);
CONFIG.context.font = "20px Comic Sans MS";
CONFIG.context.fillStyle = "#000000";
CONFIG.context.textAlign = "center";

CONFIG.lastTimeStamp = 0;

//SCREENS
CONFIG.dom.attackInput = document.getElementById("attack-input");
CONFIG.dom.endTurn = document.getElementById("end-turn");
CONFIG.dom.attackResult = document.getElementById("attack-result");

CONFIG.dom.attackerShipsInformationText = document.getElementById("attacker-ships-information");
CONFIG.dom.attackerShipsInformationText.style.display = "none";

CONFIG.dom.enemyShipsInformationText = document.getElementById("enemy-ships-information");
// CONFIG.dom.enemyShipsInformationText.style.display = "none";

CONFIG.dom.screens.otherScreens = document.getElementById("other-screens");
CONFIG.dom.screens.mainMenu = document.getElementById("main-menu-screen");
CONFIG.dom.screens.startTurn = document.getElementById("start-turn-screen");
CONFIG.dom.turnPlayerInfo = document.getElementById("turn-player-info");


CONFIG.dom.screens.ingame = document.getElementById("ingame-screen");
CONFIG.dom.screens.gameOver = document.getElementById("game-over-screen");
CONFIG.dom.screens.instructions = document.getElementById("instructions-screen");
CONFIG.dom.screens.settings = document.getElementById("settings-screen");

CONFIG.dom.ingamePlayerInfo = document.getElementById("ingame-player-info");

//SETTINGS
CONFIG.dom.settings.winningPercentage = document.getElementById("winning-percentage-input");
CONFIG.dom.settings.player0 = document.getElementById("player-0-name");
CONFIG.dom.settings.player1 = document.getElementById("player-1-name");

CONFIG.dom.buttons.restart = document.getElementById("restart-game");


//WINNING Percentage
// CONFIG.dom.settings.winningPercentage.onfocus = () => {
//     if(CONFIG.dom.settings.winningPercentage.value === '10') {
//         CONFIG.dom.settings.winningPercentage.value = '';
//     }
// }

// CONFIG.dom.settings.winningPercentage.onblur = () => {
//     if(CONFIG.dom.settings.winningPercentage.value === '') {
//         CONFIG.dom.settings.winningPercentage.value = '10';
//     }
// }

//Player 0
CONFIG.dom.settings.player0.onfocus = () => {
    if(CONFIG.dom.settings.player0.value === 'John Doe') {
        CONFIG.dom.settings.player0.value = '';
    }
}

CONFIG.dom.settings.player0.onblur = () => {
    if(CONFIG.dom.settings.player0.value === '') {
        CONFIG.dom.settings.player0.value = 'John Doe';
    }
}

//PLAYER 1
CONFIG.dom.settings.player1.onfocus = () => {
    if(CONFIG.dom.settings.player1.value === 'Jane Doe') {
        CONFIG.dom.settings.player1.value = '';
    }
}

CONFIG.dom.settings.player1.onblur = () => {
    if(CONFIG.dom.settings.player1.value === '') {
        CONFIG.dom.settings.player1.value = 'Jane Doe';
    }
}


CONFIG.dom.settings.lastManStandingCB = document.getElementById('last-man-standing');
CONFIG.dom.settings.destroyedPercentageCB = document.getElementById('destroyed-percentage');
CONFIG.dom.settings.sudenDeathCB = document.getElementById('suden-death');

