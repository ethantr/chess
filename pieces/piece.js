const WHITE = "WHITE";
const BLACK = "BLACK"
const PLACEHOLDER = null;

function getDistX(start, end) {
    return Math.abs(start.getX() - end.getX());
}

function getDistY(start, end) {
    return Math.abs(start.getY() - end.getY())
}

class Piece {

    #colour
    #eliminated
    constructor(colour) {
        this.setColour(colour)
        this.#eliminated = false;
    }

    setColour(colour) {
        this.#colour = colour;
    }

    getColour() {
        return this.#colour;
    }

    kill() {
        this.#eliminated = true;
    }

    isEliminated() {
        return this.#eliminated;
    }

    isSameTeam(piece) {
        if (piece === PLACEHOLDER) {
            return false;
        }
        return piece.getColour() === this.getColour()
    }

    canMove(board, start, end) {

    }

    canCheck(board, start, end) {

        var possibleMoves = this.getPossibleMoves(board,start,end);
        possibleMoves.forEach(square => {
            if(square.getX() === end.getX() && square.getY() === end.getY()){
                return true;
        }
        });
        return false;
    }

    canMoveSafe(board,start,end){
        return this.canMove(board,start,end) && moveResultsInCheck(board,start,end)
    }
}

















