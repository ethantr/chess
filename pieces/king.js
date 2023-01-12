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


    //Assumes start = this 
    canCastle(board, start, end) {
        const START_X_KING = 4;
        const WHITE_START_Y = Game.WHITE_START_Y;
        const BLACK_START_Y = Game.BLACK_START_Y;
        const ROOK_LEFT_START_X = 0;
        const ROOK_RIGHT_START_X = BOARD_SIZE - 1;

        //Check if king has already castled.
        if (this.firstMovePlayed()) {
            console.error("King has already made first move.")
            return false;
        }
        // //If in check, cannot castle.
        // if (isKingInCheck(board, this.getColour())) {
        //     console.error("King is in check.")
        //     return false;
        // }

        if (START_X_KING !== start.getX()) {
            console.error("Not king starting position X", "Original X:", START_X_KING, "Requested", start.getX())
            return false;
        }


        var colour_y;
        switch (this.getColour()) {
            case WHITE:
                colour_y = WHITE_START_Y;
                break;
            case BLACK:
                colour_y = BLACK_START_Y;
                break;
        }

        if (start.getY() !== colour_y) {
            console.error("King not in" + this.getColour() + "starting position Y.", start.getY());
            return false;
        } else if (end.getY() !== colour_y) {
            console.error("End square not in " + this.getColour() + "starting position Y.");
            return false;
        }

        //Get rook square
        const rook_X = start.getX() > end.getX() ? ROOK_LEFT_START_X : ROOK_RIGHT_START_X;
        const rook_square = board.getSquare(rook_X, end.getY())

        if (rook_square.getPiece().constructor !== Rook) {
            console.error("Square where rook should be does not contain a Rook");
            return false;
        } else if (!this.isSameTeam(rook_square.getPiece())) {
            console.error("Pieces to castle are not same colour.")
            return false;
        }
        else if (rook_square.getPiece().firstMovePlayed()) {
            console.error("Rook has already moved.")
            return false;
        }

        //Check if path is clear
        if (rook_square.getX() == ROOK_LEFT_START_X) {
            for (let index = START_X_KING - 1; index > ROOK_LEFT_START_X; index--) {
                var searchSquare = board.getSquares()[colour_y][index];
                if (!searchSquare.isVacant()) {
                    console.error("Pieces are in between king and rook.")
                    return false;
                }

            }
        } else if (rook_square.getX() == ROOK_RIGHT_START_X) {
            for (let index = ROOK_RIGHT_START_X - 1; index > START_X_KING; index--) {
                var searchSquare = board.getSquares()[colour_y][index];
                if (!searchSquare.isVacant()) {
                    console.error("Pieces are in between king and rook.")
                    return false;
                }

            }
        }
        else {
            console.error("Rook is not in starting position X")
        }
        return true;

    }

    isValidCastle(board, start, end) {
        //Check for correct positions
        const START_X_KING = 4;
        const WHITE_START_Y = BOARD_SIZE - 1;
        const ROOK_LEFT_START_X = 0;
        const ROOK_RIGHT_START_X = BOARD_SIZE - 1;
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
                colour_y = WHITE_START_Y;
                break;
            case BLACK:
                colour_y = BLACK_START_Y;
                break;
        }

        //check if king in correct position
        if (start.getY() !== colour_y) {
            console.error("King not in" + this.getColour() + "starting position Y.", start.getY());
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
            console.error("Rook is not in starting position X")
        }
        return true;
    }

    canMove(board, start, end) {

        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }

        // if (!this.hasCastled() && this.isValidCastle(board, start, end)) {
        //     return true;
        // }
        //Check if a piece on the end position is being replaced
        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }
        var x = getDistX(start, end)
        var y = getDistY(start, end)

        var canMove = x < 2 && y < 2 && x + y > 0

        if (canMove) {
            //TODO: check if this move results in king getting killed.
            return true
        } else if (this.canCastle(board, start, end)) {
            //perform castling move
            return true;

        } else return false;
    }


    getPossibleMoves(board, start) {
        var moves = [];

        for (let x = start.getX() - 2; x <= start.getX() + 2; x++) {
            for (let y = start.getY() - 1; y <= start.getY() + 2; y++) {
                if (this.canMoveSafe(board, start, board.getSquare(x, y))) {
                    moves.push(board.getSquare(x, y));
                }
            }

        }
        return moves;
    }


}