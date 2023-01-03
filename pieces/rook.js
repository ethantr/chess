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


    getPossibleMoves(board, start) {
        var moves = [];

        for (let index = start.getX() - 1; index >= 0; index--) {
            var possibleLeft = board.getSquare(index, start.getY());
            if (this.canMove(board, start, possibleLeft) && !possibleLeft.isVacant()) {
                moves.push(possibleLeft);
                break;
            } else if (this.canMove(board, start, possibleLeft)) {
                moves.push(possibleLeft);
            }
            else break;
        }

        for (let index = start.getX() + 1; index < BOARD_SIZE; index++) {
            var possibleRight = board.getSquare(index, start.getY());
            if (this.canMove(board, start, possibleRight) && !possibleRight.isVacant()) {
                moves.push(possibleRight);
                break;
            }
            else if (this.canMove(board, start, possibleRight)) {
                moves.push(possibleRight);
            }
            else break;
        }

        for (let index = start.getY() - 1; index >= 0; index--) {
            var possibleUp = board.getSquare(start.getX(), index);
            if (this.canMove(board, start, possibleUp) && !possibleUp.isVacant()) {
                moves.push(possibleUp);
                break;
            }
            else if (this.canMove(board, start, possibleUp)) {
                moves.push(possibleUp);
            }
            else break;
        }

        for (let index = start.getY() + 1; index < BOARD_SIZE; index++) {
            var possibleDown = board.getSquare(start.getX(), index);
            if (this.canMove(board, start, possibleDown) && !possibleDown.isVacant()) {
                moves.push(possibleDown);
                break;
            }
            else if (this.canMove(board, start, possibleDown)) {
                moves.push(possibleDown);
            } else break;
        }

        return moves;

    }

}