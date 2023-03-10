class Pawn extends Piece {

    #firstMove

    constructor(colour) {
        super(colour);
        this.setFirstMove(false)
    }

    firstMovePlayed() {
        return this.#firstMove;
    }

    playFirstMove() {
        this.setFirstMove(true);
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
        var y = start.getY() - end.getY();


        if (x === 0 && y === 0) {
            return false;
        }

        var two_squares = 2;
        var one_square = 1;


        if (this.getColour() === BLACK) {
            two_squares = -2;
            one_square = -1;
        }

        // For first move moving two squares
        if (!this.firstMovePlayed() && y === two_squares && x === 0 && end.isVacant()) {
            return true;
        }
        // Diagonal kill 
        else if (x === 1 && y === one_square && !end.isVacant()) {
            return true
        }
        // Move one forward 
        else if (y === one_square && x === 0 && end.isVacant()) {
            return true;
        } else {
            return false;
        }
    }


    getPossibleMoves(board, start) {
        var moves = []
        var two_squares = 2;
        var one_square = 1;

        //Determine direction
        if (this.getColour() === BLACK) {
            two_squares = -2;
            one_square = -1;
        }
        //Check one square forward
        var possible1 = board.getSquare(start.getX(), start.getY() - one_square);
        if (this.canMoveSafe(board, start, possible1)) {
            moves.push(possible1);
        }
        //Check two squares forward - first turn
        var possible2 = board.getSquare(start.getX(), start.getY() - two_squares);
        if (!this.firstMovePlayed() && this.canMoveSafe(board, start, possible2)) {
            moves.push(possible2);
        }
        // Check if can kill left
        var possibleLeft = board.getSquare(start.getX() - 1, start.getY() - one_square);
        if (this.canMoveSafe(board, start, possibleLeft)) {
            moves.push(possibleLeft);
        }
        // Check if can kill right
        var possibleRight = board.getSquare(start.getX() + 1, start.getY() - one_square);
        if (this.canMoveSafe(board, start, possibleRight)) {
            moves.push(possibleRight);
        }

        return moves;
    }

}