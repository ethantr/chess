class Player{
    #colour
    constructor(colour){
        this.#colour = colour;
    }

    isAI(){
        return this.constructor ===  AI;
    }

    getColour(){
        return this.#colour;
    }

}

class AI extends Player{

    constructor(colour){
        super(colour)
    }


    
}