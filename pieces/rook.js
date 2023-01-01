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


    getPossibleMoves(){
       
    }

}