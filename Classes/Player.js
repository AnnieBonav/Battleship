/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import Board from "./Board.js";
import GameObject from "./GameObject.js";

class Player extends GameObject{
    constructor(name, number){
        super(name);
        this.number = number;
        this.checkedTiles = []; //This stores the tiles that the player has attacked (from the enemy)
        this.init();
    }

    init(){
        if(this.number === 0){
            this.board = new Board("Board1");
        }else if (this.number === 1){
            this.board = new Board("Board2");
        }
    }

    render(){
        this.board.render();
    }
}

export default Player;