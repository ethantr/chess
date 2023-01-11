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

        var canMove = x === y && x > 0
        return canMove && this.isPathClear(board,start,end);
    }

    isPathClear(board, start, end) {
        //Check diagonal path
        if(getDistX(start,end) === getDistY(start,end)){
            //Determine direction of y and x paths
            var y_step = (start.getY() > end.getY())? -1 : 1
            var x_step = (start.getX() > end.getX())? -1 : 1

            var y = start.getY() + y_step
            var x = start.getX() + x_step
            while(y !== end.getY() && x !== end.getX()){
                let square = board.getSquare(x, y)
                if (!square.isVacant()){
                    if (square.getPiece().getColour() === start.getPiece().getColour() || y !== end.getY()){
                        console.warn("Diagonal path not clear.")
                        return false;
                    }
                }
                y += y_step;
                x+=x_step;
            }
        }
        return true;
    }

    getPossibleMoves(board, start) {
        var moves = []
         //Right Down
         for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX() + index, start.getY() + index);
            if (this.canMoveSafe(board, start, possible)) {
                moves.push(possible);
            }
        }

        //Right Up
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX() + index, start.getY() - index);
    
            if (this.canMoveSafe(board, start, possible)) {
                moves.push(possible);
            }
    
        }

        //Left Up
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX() - index, start.getY() - index);
        
            if (this.canMoveSafe(board, start, possible)) {
                moves.push(possible);
            }
        }

        //Left Down
        for (let index = 1; index < BOARD_SIZE; index++) {
            var possible = board.getSquare(start.getX() - index, start.getY() + index);

            if (this.canMoveSafe(board, start, possible)) {
                moves.push(possible);
            }
        }

        return moves;
    }

}