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
        if (piece === PLACEHOLDER){
            return false;
        }
        return piece.getColour() === this.getColour()
    }

    canMove(board, start, end) {

    }
}


class King extends Piece {

    #hasCastled

    constructor(colour) {
        super(colour)
        this.setCastled(false);

    }

    setCastled(castledPerformed) {
        this.#hasCastled = castledPerformed;
    }

    hasCastled() {
        return this.#hasCastled;
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        console.log("Is the end square vacant?", end.isSquareVacant(),end)
        //Check if a piece on the end position is being replaced
        if (!end.isSquareVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }
        var x = getDistX(start, end)
        var y = getDistY(start, end)

        if (x + y === 1) {
            //TODO: check if this move results in king getting killed.
            return true;
        } else {
            //perform castling move
            console.log("Checking for valid castle.")
            return this.isValidCastle(start, end)
        }
    }

    isValidCastle(start, end) {
        //Check for correct positions
        return false;
    }

}



class Knight extends Piece {

    constructor(colour) {
        super(colour);
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }


        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }

        var x = getDistX(start, end);
        var y = getDistY(start, end);

        return x * y === 2;
    }

}


class Pawn extends Piece {

    #firstMove

    constructor(colour) {
        super(colour);
        this.setFirstMove(true)
    }

    firstMovePlayed(){
        return this.#firstMove;
    }

    playFirstMove(){
        this.setFirstMove(false);
    }

    setFirstMove(v){
        this.#firstMove = v;
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }

        var x = getDistX(start, end);
        var y = getDistY(start, end);

        // For first move moving two squares
        if(!this.firstMovePlayed && y ===2 || end.isVacant()){
            return true;
        }
        // Check for moving pawn greater than moving distance
        if (y !== 1) {
            return false;
        }

        // TODO: fix for correct direction
        if (x === 0 && end.isVacant()) {
            return true;
        } else if (x === 1 && !end.isVacant()) {
            return true;
        } else {
            return false;
        }


    }

}

class Rook extends Piece {

    constructor(colour) {
        super(colour);
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }

        var x = getDistX(start, end);
        var y = getDistY(start, end);

        return x >= 1 && y === 0 || y >= 1 && x === 0;
    }

}

class Bishop extends Piece {

    constructor(colour) {
        super(colour);
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }

        var x = getDistX(start, end);
        var y = getDistY(start, end);

        return x === y && x > 0;
    }

}


class Queen extends Piece {

    constructor(colour) {
        super(colour);
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }

        var x = getDistX(start, end);
        var y = getDistY(start, end);

        return x === y && x > 0 || x >= 1 && y === 0 || y >= 1 && x === 0;
    }

}
