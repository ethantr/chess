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