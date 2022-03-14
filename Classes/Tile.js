/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import Mark from "./Mark.js";
import BoardPart from "./BoardPart.js";

class Tile extends BoardPart{
    constructor(name, xPos, yPos, width, height){
        super(name, xPos, yPos, width, height);

        this.checked = false; //(is)checked checks whether a player has checked what is in that Tile, or not
        this.type = "Water"; //Can be: water/ship. This will be considering this player's Board.
        this.mark;
        this.init();
    }

    init(){
        this.img = new Image();
        this.assignImage();
    }

    check(){ //This function is called to mark the check on the tile, it adds the mark to it
        
    }

    assignImage(){ //I need the type of the tile to change to the name of the ship so I can check when a specific ship has been destroyed
        switch(this.type){
            case "Water":
                this.img.src = "./Assets/Images/Water.png";
                break;
            case "Carrier":
                this.img.src = "./Assets/Images/Ships/Carrier.png";
                break;
            case "Battleship":
                this.img.src = "./Assets/Images/Ships/Battleship.png";
                break;
            case "Cruiser":
                this.img.src = "./Assets/Images/Ships/Cruiser.png";
                break;
            case "Submarine":
                this.img.src = "./Assets/Images/Ships/Submarine.png";
                break;
            case "Destroyer":
                this.img.src = "./Assets/Images/Ships/Destroyer.png";
                break;
        }
    }

    changeType(newType){ //This is used to add boats
        this.type = newType;
        this.assignImage();
    }

    render(){
        CONFIG.context.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
        this.mark?.render(); //The question mark lets me avoid rendering if no mark has been created
    }

    
    addMark(type){
        this.mark = new Mark(this.name, this.xPos, this.yPos, this.width, this.height, type); //It creates a mark with the same values as the tile, so that it is on top of it.
    }

    changeMark(){
        this.mark.changeType();
    }
}

export default Tile;