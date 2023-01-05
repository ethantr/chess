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

    getPossibleMoves(board,start){
        // Knight has total 8 possible moves.
        var moves = []
        var two_squares = 2;
        var one_square = 1;
        var possibleSquares = [];
        possibleSquares.push(board.getSquare(start.getX()+one_square, start.getY()+two_squares))
        possibleSquares.push(board.getSquare(start.getX()-one_square, start.getY()+two_squares))

        possibleSquares.push(board.getSquare(start.getX()+one_square, start.getY()-two_squares))
        possibleSquares.push(board.getSquare(start.getX()-one_square, start.getY()-two_squares))

        possibleSquares.push(board.getSquare(start.getX()+two_squares, start.getY()-one_square))
        possibleSquares.push(board.getSquare(start.getX()-two_squares, start.getY()-one_square))

        possibleSquares.push(board.getSquare(start.getX()+two_squares, start.getY()+one_square))
        possibleSquares.push(board.getSquare(start.getX()-two_squares, start.getY()+one_square))

        possibleSquares.forEach(square => {
            if (this.canMove(board, start, square)) {
                moves.push(square);
            }
        });
        
        return moves;
    }

}