/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import BoardPart from "./BoardPart.js";

class Mark extends BoardPart{
    constructor(name, xPos, yPos, width, height, type){
        super(name, xPos, yPos, width, height);
        this.img;
        this.type = type; //This checks for the type of mark that it will be, while the name is the tile it belongs to. It can be water/ship/destroyedS
        this.init();
    }

    init(){
        this.img = new Image();
        this.assignImages();
    }

    render(){
        CONFIG.context.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
    }

    assignImages(){
        switch(this.type){
            case "Water":
                this.img.src = "./Assets/Images/Water_Mark.png";
                break;
            case "Ship":
                this.img.src = "./Assets/Images/Ship_Mark.png";
                break;
        }
    }

    changeType(){
        this.type = "destroyedS"; //This changes it from a ship to a Destroyed Ship
        this.img.src = "./Assets/Images/Destroyed_Mark.png";
    }
}

export default Mark;