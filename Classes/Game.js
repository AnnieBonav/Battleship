/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

/**
 * A game includes all of the obejcts that form my, yes, game. Hence, I have everything centralized.
 */

import CONFIG from "../ToolBox/ConfigStorage.js";

class Game{
    constructor(player1, player2){
        this.players = [player1, player2];
        this.currentAttacker = 0; //The strating currentAttacker will be the player 1
        this.currentEnemy = 1; //And the starting currentEnemy will be player 2
        this.currentTurn = 0;
        this.isActive = false;
        this.gameEnded = false;
        this.winningType;
    }

    /**
     * This can be in a nicer place than in the class, but, for now, it is the way of knowing which winning type the game is going to have, depending on the optionn that the player chose on the settiongs 
     * (if they did not pick any, the default is "lastMan Standing")
     * Another winningType I would like to implement (make work) is the "destroyedPercentage", which let's the person that has thestroyed a certain ammount of the enemy's ships win
    */
    defineWinningType(){ //
        if(CONFIG.dom.settings.lastManStandingCB.checked === true){
            this.winningType = "lastManStanding";
        }
        // else if(CONFIG.dom.settings.destroyedPercentageCB.checked === true){
        //     this.winningType = "destroyedPercentage";
        // }
        else if(CONFIG.dom.settings.sudenDeathCB.checked === true){
            this.winningType = "sudenDeath";
        }
        console.log(this.winningType);
    }


    startTurn(){
        if(this.currentAttacker === 0){
            this.currentTurn ++; //Every time that it is players 0 turn the turns will add one
        }
        CONFIG.dom.ingamePlayerInfo.innerHTML = `
        Attempt #${this.currentTurn}`;
    }
    
    attackTry(attackerNumber, enemyNumber, letter, number){ //playerNumber is the player we are attacking (enemy) and the tile is what we are trying to attack the enemie's board
        let xPosition = CONFIG.lettersArray.indexOf(letter); //Turns the letter into a number
        let yPosition = number -1; //Assigns the number to its correct value (one less, because arrays start at 0)
        
        if(this.validateUnchecked(attackerNumber, xPosition, yPosition) === false) return;

        if(this.players[enemyNumber].board.tiles[xPosition][yPosition].type === "Water"){//If the tile hit in the ennemy is water, then it will console that it hit water and it will add a water mark on the attacker's board
            CONFIG.dom.attackResult.innerHTML = `
            <p class = "attack-result-text">You have hit water in ${letter + number}...
            <br>
            Donn't worry! We will get it next time!</p>
            `;
            this.players[attackerNumber].board.tiles[xPosition][yPosition].addMark("Water");
            
        }else{ //If it is not water, then it is one of the ships. The ship that is hit can be known based on the type that the tile has (as it was changed when we created the ships) this way, we can  add a "destroyedPart pf the ship on the specifi ship on the array opf ships that the board has"
            this.attack(attackerNumber, enemyNumber, xPosition, yPosition);
        }//Still need to check whether the ship sinks or not

        this.players[attackerNumber].checkedTiles.push(this.players[attackerNumber].board.tiles[xPosition][yPosition].name); //I add the tile to the list of checked tiles from the Player
        console.log(this.players[attackerNumber].checkedTiles);
        
        this.finishAttackTry();
    }

    attack(attackerNumber, enemyNumber, xPosition, yPosition){
        let shipHit = this.players[enemyNumber].board.tiles[xPosition][yPosition].type; //This gets the name of the Ship that was hit, based on the tile`s type (which is the name of the Ship, as we added it while creating the boats)
        let indexOfShip = this.players[enemyNumber].board.ships.findIndex(ship => {
            return ship.name === shipHit;
        });
        CONFIG.dom.attackResult.innerHTML = `
            <p class = "attack-result-text">You have hit a ship in ${CONFIG.lettersArray[xPosition] + (yPosition + 1)}...
            Well done Captain!</p>
        `;
        //console.log(`You have hit a ship, it was the ${shipHit} This is the index: ${indexOfShip}, and this is the name based on the index: ${this.players[enemyNumber].board.ships[indexOfShip].name}`); 
        this.players[attackerNumber].board.tiles[xPosition][yPosition].addMark("Ship");//If the tile hit in the ennemy is ship, then it will console that it hit a ship and it will add a ship mark on the attacker's board
        this.players[enemyNumber].board.ships[indexOfShip].partsDestroyed ++; //After knowing which ship has been attacked, I need to add that "destroyedPart to the ship on the enemies Boats array", and then increase the score of the Attacker
        let smtGotSinked = this.checkSink(attackerNumber, enemyNumber, indexOfShip, xPosition, yPosition);
        this.checkWinning(smtGotSinked); //smtGotSinked let me check if this player won if the type of winning is "sudenDeath"
        //console.log(this.players[enemyNumber].board.ships);
    }

    checkWinning(smtGotSinked){
        switch (this.winningType){
            case "lastManStanding":
                if(this.players[this.currentEnemy].board.currentLives() <= 0){
                    console.log(`Game Over! Captain ${this.players[this.currentAttacker].name} won!`)
                    this.gameOver();
                }else{
                    console.log(this.players[this.currentEnemy].board.currentLives());
                    console.log(this.maxPoints);
                }
                break;
            case "destroyedPercentage":
                console.log("Destroyed Percentage");

                break;
            case "sudenDeath":
                if(smtGotSinked === true){
                    //console.log(`Game Over! Captain ${this.players[this.currentAttacker].name} won!`)
                    this.gameOver();
                }
                break;
        }
    }

    gameOver(){
        CONFIG.dom.attackResult.innerHTML = `
            <p class = "attack-result-text">Captain ${this.players[this.currentAttacker].name} has won!
            <br>
            Donn't worry ${this.players[this.currentEnemy].name} you will get them next time!</p>
        `;
        CONFIG.dom.buttons.restart.style.display = "flex";
        CONFIG.dom.attackInput.style.display = "none";
        CONFIG.dom.endTurn.style.display = "none";
        this.gameEnded = true;
        console.log("Game Over");
    }

    checkSink(attackerNumber, enemyNumber, indexOfShip){
        let xPosition;
        let yPosition;
        if(this.players[enemyNumber].board.ships[indexOfShip].isSinked() === true){
            //console.log(`You have sinked the enemie's ${this.players[enemyNumber].board.ships[indexOfShip].name}. Good job!`);
            CONFIG.dom.attackResult.innerHTML += `
            <p class = "attack-result-text">This has sinked the enemie's ${this.players[enemyNumber].board.ships[indexOfShip].name}!</p>
            `;

            // CONFIG.dom.enemyShipsInformationText.innerHTML +=`
            // <p>${this.players[enemyNumber].board.ships[indexOfShip].name}</p>`;

            //I need to change the mark from an attakced ship to a destroyed one, on the Attacker's board
            for(let i = 0; i < this.players[enemyNumber].board.ships[indexOfShip].size; i++){
                xPosition = this.players[enemyNumber].board.ships[indexOfShip].xPos[i];
                yPosition = this.players[enemyNumber].board.ships[indexOfShip].yPos[i];
                this.players[attackerNumber].board.tiles[xPosition][yPosition].changeMark(); //I change the mark in each of the tiles that make up the ship
            }
            return true;
        }
    }

    updateShipsInfo(){
        CONFIG.dom.attackerShipsInformationText.innerHTML = "OUR SHIPS";
        this.players[this.currentAttacker].board.ships.forEach(boat => {
            CONFIG.dom.attackerShipsInformationText.innerHTML += `
            <br>${boat.printShip()}
            `;
        });
        
;
        //this.currentAttacker
    }

    finishAttackTry(){
        if(this.gameEnded !== true){
            CONFIG.dom.attackInput.style.display = "none"; //Whenever I want to try multiple attacks I ocmment this, so I can keep doing it
            CONFIG.dom.endTurn.style.display = "flex";
        }
        
    }

    /**e
     * endTurn does everything that must happen after the turn ends
     * @param {*} attackerNumber Receives the currentAttacker number so that, based on it, it can change all the variables required for the next player's turn
     */
    endTurn(attackerNumber){
        if(attackerNumber === 0){ //Changes who the current attacker will be
            this.currentAttacker = 1;
            this.currentEnemy = 0;
        }else if(attackerNumber === 1){
            this.currentAttacker = 0;
            this.currentEnemy = 1;
        }
        this.isActive = false; //Changes the game isActive to be false, so that we don't have to be onn the gameLoop whenn the boards are not shwoing
        CONFIG.dom.turnPlayerInfo.innerHTML = `
        Captain ${CONFIG.game.currentGame.players[CONFIG.game.currentGame.currentAttacker].name}, it is your turn!`; //Then it changes the turnPlayerInfo to the new player's Name, so that they can know it is their Turn

        CONFIG.dom.endTurn.style.display = "none"; //I hide the division tha has the endTurn button, so that the other player doesn't start their turn with it
        CONFIG.dom.attackInput.style.display = "flex"; //And I make the attackInput appear, so that the other player can see it when their turn starts
        CONFIG.dom.attackResult.innerHTML = ""; //Remove the atttack Result
    }
    /**
     * 
     * @param {*} attackerNumber is the current attacker. We need it as we need to check 
     * if the tile they are trying to attack is already on their attacked tiles. If it is, 
     * then it means that it should not count as a valid attack, because they have alreayd checked it.
     * @param {*} xPosition is the xPosition of the tryingAttack (the column)
     * @param {*} yPosition is the yPosition of the tryingAttack (the row)
     * @returns 
     */
    validateUnchecked(attackerNumber, xPosition, yPosition){
        if(this.players[attackerNumber].checkedTiles.includes(this.players[attackerNumber].board.tiles[xPosition][yPosition].name)){
            CONFIG.dom.attackResult.innerHTML += `
            <p class = "attack-result-text">We have already checked this spot, Captain, try another one!</p>
            `;
            console.log("This tile has already been checked");
            return false;
        }
        return true;
    }


}

export default Game;