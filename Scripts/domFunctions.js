/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

/**
 * I use this file to create all my functions related to the dom. This way my code is not cloded, everything is centralized and it is easier to follow along.
 * This is possible because of my CONFIG object
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import Game from "../Classes/Game.js";
import Player from "../Classes/Player.js"


//BUTTONS
document.getElementById("attack-button").onclick = () =>{
    CONFIG.game.currentGame.attackTry(CONFIG.game.currentGame.currentAttacker, CONFIG.game.currentGame.currentEnemy, document.getElementById("attack-panel").innerHTML.charAt(0), document.getElementById("attack-panel").innerHTML.charAt(1) + document.getElementById("attack-panel").innerHTML.charAt(2));
}

document.getElementById("end-turn").onclick = () =>{
    CONFIG.game.currentGame.endTurn(CONFIG.game.currentGame.currentAttacker); //Make endTurn work
    finishTurn();
}

document.getElementById("info-button").onclick = () =>{
    if(CONFIG.dom.attackerShipsInformationText.style.display === "none"){
        CONFIG.game.currentGame.updateShipsInfo();
        CONFIG.dom.attackerShipsInformationText.style.display = "flex";
        // CONFIG.dom.enemyShipsInformationText.style.display = "flex";
    }else if (CONFIG.dom.attackerShipsInformationText.style.display === "flex"){
        CONFIG.dom.attackerShipsInformationText.style.display = "none";
        // CONFIG.dom.enemyShipsInformationText.style.display = "none";
    }
}

/**
 * This makes a listener for the "restart-game-button" onclick action. So that, when that happens,
 * everything that is needed to have a new game is reset. The player will not go through the main Menu
 */
document.getElementById("restart-game-button").onclick = () =>{
    CONFIG.dom.screens.ingame.style.display = "none";
    CONFIG.dom.screens.otherScreens.style.display = "flex";
    startGame();
}

document.getElementById("mainMenu-gameOver").onclick = () =>{
    window.setTimeout(CONFIG.dom.functions.openMainMenu, 0);
}

/**
 * 
 */
CONFIG.dom.functions.openMainMenu = function (){
    // document.getElementById("loading-image").style.display="none";
    CONFIG.dom.screens.otherScreens.style.display="flex";
    CONFIG.dom.screens.mainMenu.style.display="flex";
    CONFIG.dom.screens.ingame.style.display="none";
    CONFIG.dom.screens.instructions.style.display="none";
    CONFIG.dom.screens.settings.style.display="none";

    //INITIAL SETTINGS
    CONFIG.dom.settings.lastManStandingCB.checked = true;
    chooseWinningWay(); //I call this so that one of my difficulties is checked
    // gameOverScreen.style.display="none";
}


/**
 * startGame() Opens the screen of the first turn of the game
 * First it hides whichever "otherScreen" it might come from 
 * (which can be mainMenu, instructions or settings) and then it 
 * opens the screen of the first Turn.
 * 
 */
function startGame(){ //Opens the first startTurn
    CONFIG.game.currentGame = new Game(new Player("Annie", 0), new Player("Bernhard", 1));

    CONFIG.dom.screens.mainMenu.style.display="none";
    CONFIG.dom.screens.instructions.style.display="none";
    CONFIG.dom.screens.settings.style.display="none";
    CONFIG.dom.screens.startTurn.style.display="flex";

    CONFIG.game.currentGame.players[0].name = CONFIG.dom.settings.player0.value;
    CONFIG.game.currentGame.players[1].name = CONFIG.dom.settings.player1.value;
    
    CONFIG.dom.attackInput.style.display = "flex"; //I make sure this is showing (It can be hidden if the game just got restarted)
    CONFIG.dom.attackResult.innerHTML = ""; //I make sure this does not contain anything (It can if the game just got restarted)
    CONFIG.dom.ingamePlayerInfo.innerHTML = `Attempt #${CONFIG.game.currentGame.currentTurn}`;

    CONFIG.dom.turnPlayerInfo.innerHTML = `
    Captain ${CONFIG.game.currentGame.players[CONFIG.game.currentGame.currentAttacker].name}, it is your turn!`;

    CONFIG.game.currentGame.defineWinningType(); //I call this function so that which winning type is checked and the game can have a type endinng
    
    
}


/**
 * startTurn() is the function that gets called when the player clicks on "startTurn"
 * within the "turnScreen". This will take into consideration which is the current attacker,
 * so that they can see their board and start with their turn.
 * It starts by hiding the division where the "otherScreens" live in, then the "startTurn" screen
 * and, finnally, it opens the ingame.
 */
function startTurn(){
    document.getElementById("attack-panel").innerHTML = "A1";
    CONFIG.game.currentGame.isActive = true; //Start the gameLoop so it is rendered;
    requestAnimationFrame(CONFIG.functions.gameLoop);
    
    CONFIG.dom.screens.otherScreens.style.display="none";
    CONFIG.dom.screens.startTurn.style.display="none";
    CONFIG.dom.screens.ingame.style.display="flex";

    CONFIG.game.currentGame.startTurn();
    //CONFIG.game.currentGame.currentTurn ++;
}

function finishTurn(){
    CONFIG.dom.screens.otherScreens.style.display="flex";
    CONFIG.dom.screens.startTurn.style.display="flex";
    CONFIG.dom.screens.ingame.style.display="none";
}

function openInstructions(){
    CONFIG.dom.screens.mainMenu.style.display="none";
    CONFIG.dom.screens.instructions.style.display="flex";
    CONFIG.dom.screens.gameOver.style.display="none";
}

function openSettings(){
    CONFIG.dom.screens.mainMenu.style.display="none";
    CONFIG.dom.screens.settings.style.display="flex";
}

//Main Menu Screen buttons
document.getElementById("startGame-mainMenu").addEventListener("click", startGame);
document.getElementById("instructions-mainMenu").addEventListener("click", openInstructions);
document.getElementById("settings-mainMenu").addEventListener("click", openSettings);

document.getElementById("mainMenu-instructions").addEventListener("click", CONFIG.dom.functions.openMainMenu);
document.getElementById("startGame-instructions").addEventListener("click", startGame);

document.getElementById("mainMenu-settings").addEventListener("click", CONFIG.dom.functions.openMainMenu);
document.getElementById("startGame-settings").addEventListener("click", startGame);

//Start Game Screenn button
document.getElementById("start-turn-button").addEventListener("click", startTurn);



const chooseWinningWay = () => {
    if(CONFIG.dom.settings.lastManStandingCB.checked === true) {
      document.getElementById('selectLastManStanding').style = "background-color: #008E99";
    } else {
      document.getElementById('selectLastManStanding').style = "background-color: #98D0D4";
    }
  
    // if(CONFIG.dom.settings.destroyedPercentageCB.checked === true) {
    //   document.getElementById('selectDestroyedPercentage').style = "background-color: #008E99";
    // } else {
    //   document.getElementById('selectDestroyedPercentage').style = "background-color: #98D0D4";
    // }
    
    if(CONFIG.dom.settings.sudenDeathCB.checked === true) {
      document.getElementById('selectSudenDeath').style = "background-color: #008E99";
    } else {
      document.getElementById('selectSudenDeath').style = "background-color: #98D0D4";
    }
}

document.getElementById('selectLastManStanding').onclick = () => {
    CONFIG.dom.settings.lastManStandingCB.checked = true;
    chooseWinningWay();
}

// document.getElementById('selectDestroyedPercentage').onclick = () => {
//     CONFIG.dom.settings.destroyedPercentageCB.checked = true;
//     chooseWinningWay();
// }

document.getElementById('selectSudenDeath').onclick = () => {
    CONFIG.dom.settings.sudenDeathCB.checked = true;
    chooseWinningWay();
}