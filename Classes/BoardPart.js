/**
 * Ana Bonavides Aguilar
 * cc211010
 * Battleship: final Client-Side-Coding Project
 */

import CONFIG from "../ToolBox/ConfigStorage.js";
import GameObject from "./GameObject.js";

class BoardPart extends GameObject{
    constructor(name, xPos, yPos, width, height){
        super(name);
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
}

export default BoardPart