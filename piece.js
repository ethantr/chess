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

    playFirstMove() {
        this.setCastled(true);
    }

    hasCastled() {
        return this.#hasCastled;
    }

    firstMovePlayed() {
        return this.hasCastled()
    }

    isValidCastle(board, start, end) {
        //Check for correct positions
        const START_X_KING = 4;
        const WHITE_START_Y_ = BOARD_SIZE - 1;
        const ROOK_LEFT_START_X = 0;
        const ROOK_RIGHT_START = BOARD_SIZE - 1;
        const BLACK_START_Y = 0;

        if (this.hasCastled()) {
            console.error("King has already made first move.")
        }


        if (START_X_KING !== start.getX()) {
            console.error("Not king starting position X", "Original X:", START_X_KING, "Requested", start.getX())
            return false;
        } else if (end.isVacant()) {
            console.error("Position where rook should be is vacant");
            return false;
        } else if (end.getPiece().constructor !== Rook) {
            console.error("Square where rook should be does not contain a Rook");
            return false;
        }
        else if (!this.isSameTeam(end.getPiece())) {
            console.error("Pieces to castle are not same colour.")
            return false;
        }
        else if (end.getPiece().firstMovePlayed()) {
            console.error("Rook has already moved.")
            return false;
        }

        var colour_y;
        switch (this.getColour()) {
            case WHITE:
                colour_y = WHITE_START_Y_
            case BLACK:
                colour_y = BLACK_START_Y;
        }

        //check if king in correct position
        if (start.getY() !== colour_y) {
            console.error("King not in" + this.getColor() + "starting position Y.");
            return false;
        } else if (end.getY() !== colour_y) {
            console.error("Rook not in " + this.getColor() + "starting position Y.");
            return false;
        }


        if (end.getX() == ROOK_LEFT_START_X) {
            for (let index = START_X_KING - 1; index > ROOK_LEFT_START_X; index--) {
                var searchSquare = board.getSquares()[colour_y][index];
                if (!searchSquare.isVacant()) {
                    console.error("Pieces are in between king and rook.")
                    return false;
                }

            }
        } else if (end.getX() == ROOK_RIGHT_START_X) {
            for (let index = ROOK_RIGHT_START_X - 1; index > START_X_KING; index--) {
                var searchSquare = board.getSquares()[colour_y][index];
                if (!searchSquare.isVacant()) {
                    console.error("Pieces are in between king and rook.")
                    return false;
                }

            }
        }
        else {
            console.log("Rook is not in starting position X")
        }
        return true;
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        console.log("Checking for valid castle.")
        if (!this.hasCastled() && this.isValidCastle(board, start, end)) {
            return true;
        }
        console.log("Is the end square vacant?", end.isVacant(), end)
        //Check if a piece on the end position is being replaced
        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }
        var x = getDistX(start, end)
        var y = getDistY(start, end)

        if (x + y === 1) {
            //TODO: check if this move results in king getting killed.
            return true;
        } else {
            //perform castling move

        }
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

    firstMovePlayed() {
        return this.#firstMove;
    }

    playFirstMove() {
        this.setFirstMove(false);
    }

    setFirstMove(v) {
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
        if (!this.firstMovePlayed && y === 2 || end.isVacant()) {
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


    #firstMove

    constructor(colour) {
        super(colour);
        this.setFirstMove(false);
    }

    playFirstMove() {
        this.setFirstMove(true);
    }

    setFirstMove(v) {
        this.#firstMove = v;
    }

    firstMovePlayed() {
        return this.#firstMove
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
