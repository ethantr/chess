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

    isPathClear(board, start, end) {
         //Check horizontal path is clear

        if (start.getY() === end.getY()) {
            var start_X = Math.min(start.getX(), end.getX())
            var end_X = Math.max(start.getX(), end.getX())

            //Ensures selected piece is not included in path finding.
            let x = start_X === start.getX() ? start_X + 1 : start_X
            for (x; x < end_X; x++) {
                let square = board.getSquare(x, start.getY())
                if (!square.isVacant()) {
                    var piece = square.getPiece()
                    console.warn(piece)
                    if (piece.getColour() === start.getPiece().getColour() || (x !== end_X && x !== start_X)) {
                    
                        return false;
                    }
                }

            }
        }
        //Check Vertical path is clear
        else if (start.getX() === end.getX()) {
            var start_Y = Math.min(start.getY(), end.getY())
            var end_Y = Math.max(start.getY(), end.getY())
            //Ensures selected piece is not included in path finding.
            let y = start_Y === start.getY() ? start_Y + 1 : start_Y

            for (y; y < end_Y; y++) {
                let square = board.getSquare(start.getX(), y)
                if (!square.isVacant()) {
                
                    if (square.getPiece().getColour() === start.getPiece().getColour() || (y !== end_Y && y !== start_Y)) {
                        
                        return false;
                    }
                }

            }
        }
        return true;
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

        var canMove = x >= 1 && y === 0 || y >= 1 && x === 0
        
        return canMove && this.isPathClear(board,start,end);
    }


    

    getPossibleMoves(board, start) {
        var moves = [];

        //Left Rook
        for (let index = start.getX() - 1; index >= 0; index--) {
            var possibleLeft = board.getSquare(index, start.getY());
            if (this.canMoveSafe(board, start, possibleLeft)) {
                moves.push(possibleLeft);
            }
        }
        //Right rook
        for (let index = start.getX() + 1; index < BOARD_SIZE; index++) {
            var possibleRight = board.getSquare(index, start.getY());
            if (this.canMoveSafe(board, start, possibleRight)) {
                moves.push(possibleRight);
            }
        }
        //Up rook
        for (let index = start.getY() - 1; index >= 0; index--) {
            var possibleUp = board.getSquare(start.getX(), index);

            if (this.canMoveSafe(board, start, possibleUp)) {
                moves.push(possibleUp);
            }
            
        }
        //Down rook
        for (let index = start.getY() + 1; index < BOARD_SIZE; index++) {
            var possibleDown = board.getSquare(start.getX(), index);
       
            if (this.canMoveSafe(board, start, possibleDown)) {
                moves.push(possibleDown);
            } 
           
        }

        return moves;

    }

}