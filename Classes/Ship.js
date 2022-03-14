/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import BoardPart from "./BoardPart.js";

class Ship extends BoardPart{
    constructor(name, direction){
        super(name, [undefined], [undefined], 0, 0); //the xPos and yPos will fill.up with the positions that the boats have on the board
        this.direction = direction;
        this.size;
        this.partsDestroyed = 0;
        this.init();
    }

    init(){
        this.assignInformation();
    }

    isSinked(){
        if(this.size === this.partsDestroyed)return true;
        return false;
    }

    printShip(){
        let shipInfo;
        shipInfo = `${this.name}: has ${this.size - this.partsDestroyed} 🤍`;
        return shipInfo;
    }

    assignInformation(){
        switch (this.name){
            case "Destroyer":
                this.size = 2;
                break;
            case "Submarine":
                this.size = 3;
                break;
            case "Cruiser":
                this.size = 3;
                break;
                case "Battleship":
                    this.size = 4;
                    break;
            case "Carrier":
                this.size = 5;
                break;
            
        }
    }
}

export default Ship;