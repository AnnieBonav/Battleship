/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import Tile from "./Tile.js";
import GameObject from "./GameObject.js";
import Ship from "./Ship.js";
import { randomNumberBetween } from "../ToolBox/ToolBox.js";

class Board extends GameObject{
    constructor(name){
        super(name);
        this.tiles = [[],[],[],[],[],[],[],[], [],[]]; //Type Tile
        this.ships = []; //Type Boat
        this.init();
    }

    currentLives(){
        let currentLives = 0;
        this.ships.forEach(ship => {
            currentLives += (ship.size - ship.partsDestroyed);
        });
        return currentLives;
    }

    init(){
        this.createTiles();
        this.createShips();
        this.assignPositions();
        this.addShips();
    }

    /**
     * Creates all my board with tiles of type water. After the boats are created, these tiles will be changed to type ship (and the image will correspond with the ship)
     */
    createTiles(){
        let tileName;
        for(let i = 0; i < 10; i++){ //Columns = Letters
            for(let j = 0; j < 10; j++){ //Rows = Numbers
                tileName = CONFIG.lettersArray[i]; //I give the first part of the tile's name (the letter).
                tileName += j; //I gove the second part of the tile's name (the number).
                this.tiles[i][j] = new Tile(tileName, i * CONFIG.game.tileSize * CONFIG.game.tileSeparation + CONFIG.game.boardMargin, j * CONFIG.game.tileSize * CONFIG.game.tileSeparation + CONFIG.game.boardMargin, CONFIG.game.tileSize, CONFIG.game.tileSize);
                if(j === 0 ){
                    
                    CONFIG.context.fillText(CONFIG.lettersArray[i], i * CONFIG.game.tileSize * CONFIG.game.tileSeparation + CONFIG.game.tileSize/2 + CONFIG.game.boardMargin, CONFIG.game.boardMargin / 10 * 9 );
                    CONFIG.context.fill();
                }
                tileName = undefined;
            }
            CONFIG.context.fillText(i, CONFIG.game.boardMargin * 4/5, i * CONFIG.game.tileSize * CONFIG.game.tileSeparation + CONFIG.game.tileSize/3*2 + CONFIG.game.boardMargin );
        }
    }

    /**
     * Fills-up the array of ships with one ship of each category
     */
    createShips(){
        this.ships[0] = new Ship("Destroyer", "horizontal"); //xPos = letter yPos = number
        this.ships[1] = new Ship("Submarine", "horizontal");
        this.ships[2] = new Ship("Cruiser", "horizontal");
        this.ships[3] = new Ship("Battleship", "horizontal");
        this.ships[4] = new Ship("Carrier", "horizontal");

        console.log(this.ships);
    }

    /**
     * I assign the positions of the boats. It oculd be more randomized. But, for now the x position is completely random and
     * the y position is given by the i of the current ship
     */
     assignPositions(){ //Could be more random
        let xPosition;

        for(let i = 0; i < this.ships.length; i++){
            xPosition = randomNumberBetween(0,10 - this.ships[i].size);
            this.ships[i].xPos[0] = xPosition; //I assign the starting position of the ships
            this.ships[i].yPos[0] = i;
            this.ships[i].number = i;
        }
    }

    /*
    assignPositions(){ //This is one of my tries on it being more random...I sould love that it was as random as being able to create vertical and horizontal, but for now it is not like that. Nevertheless, I will continue to work in this code
        let xPosition;
        let yPositions = [];
        let yPosition;
        let validYPos;
        for(let i = 0; i < this.ships.length; i++){
            validYPos = false;
            xPosition = randomNumberBetween(0,10 - this.ships[i].size);
            while(validYPos === false){
                yPosition = randomNumberBetween(0,10);
                if(yPositions.includes(yPosition) === false){
                    yPositions.push(yPosition);
                    validYPos = true;
                }
            }
            this.ships[i].xPos[0] = xPosition; //I assign the starting position of the ships
            this.ships[i].yPos[0] = yPosition;
            this.ships[i].number = i;

            console.log(this.ships[i]);
        }

        console.log("Finished Assign");
    }*/

    /**
     * Add the ships to the board (in other words, changes the type from Water to the name of the ship)
     */
    addShips(){ //I can make the assignment random in the future
        this.ships.forEach(ship => {
            if(ship.direction === "horizontal"){
                for(let i = 0; i < ship.size; i++){
                    if(i !== 0){ //If I am not checking the first position of the Ship (Which is already saved on the xPos array) then I will add the otehr positions as the addition of  1 and the last position
                        ship.xPos[i] = ship.xPos[i-1] + 1; 
                        ship.yPos[i] = ship.yPos[0]; 
                    }
                    this.tiles[ship.xPos[i]][ship.yPos[i]].changeType(ship.name);
                }
            }
            else{
                for(let i = 0; i < ship.size; i++){
                    this.tiles[ship.xPos][ship.yPos + i].changeType(ship.name);
                }
            }
        });
        
    }

    render(){
        for(let i = 0; i < 10; i++){
            this.tiles[i].forEach(tile => {
                tile.render();
            });
        }
        
    }
}

export default Board;