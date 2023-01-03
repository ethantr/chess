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

    getPossibleMoves(board,start){
        var moves = []
        //Right Down
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX()+index, start.getY()+index);
            if (this.canMove(board, start, possible) && !possible.isVacant()) {
                moves.push(possible);
                break;
            } else if (this.canMove(board, start, possible)) {
                moves.push(possible);
            }
            else break;
        }

        //Right Up
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX()+index, start.getY()-index);
            if (this.canMove(board, start, possible) && !possible.isVacant()) {
                moves.push(possible);
                break;
            } else if (this.canMove(board, start, possible)) {
                moves.push(possible);
            }
            else break;
        }

        //Left Up
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX()-index, start.getY()-index);
            if (this.canMove(board, start, possible) && !possible.isVacant()) {
                moves.push(possible);
                break;
            } else if (this.canMove(board, start, possible)) {
                moves.push(possible);
            }
            else break;
        }

        //Left Down
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX()-index, start.getY()+index);
            if (this.canMove(board, start, possible) && !possible.isVacant()) {
                moves.push(possible);
                break;
            } else if (this.canMove(board, start, possible)) {
                moves.push(possible);
            }
            else break;
        }

        return moves;
    }

}