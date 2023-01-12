class Queen extends Piece {

    constructor(colour) {
        super(colour);
    }

    canMove(board, start, end) {
        //if positions are off the board
        if (start.isOffBoard() || end.isOffBoard()) {
            return false;
        }
        
        //Check if 
        if (!end.isVacant() && this.isSameTeam(end.getPiece())) {
            return false;
        }

        var x = getDistX(start, end);
        var y = getDistY(start, end);

        var canMove = x === y && x > 0 || x >= 1 && y === 0 || y >= 1 && x === 0

        return canMove && this.isPathClear(board, start, end);
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
                    //If piece found is not at the end of the path or is the same colour
                    if (start.getPiece().isSameTeam(piece)|| (x !== end_X && x !== start_X)) {
                        console.warn("Horizontal path not clear.")
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
                    if (start.getPiece().isSameTeam(square.getPiece()) || (y !== end_Y && y !== start_Y)) {
                        // console.warn("Vertical path not clear.")
                        return false;
                    }
                }

            }
        }

        //Check diagonal path
        else if (getDistX(start, end) === getDistY(start, end)) {
            //Determine direction of y and x paths
            var y_step = (start.getY() > end.getY()) ? -1 : 1
            var x_step = (start.getX() > end.getX()) ? -1 : 1

            var y = start.getY() + y_step
            var x = start.getX() + x_step
            while (y !== end.getY() && x !== end.getX()) {
                let square = board.getSquare(x, y)
                if (!square.isVacant()) {
                    if (square.getPiece().getColour() === start.getPiece().getColour() || y !== end.getY()) {
                     
                        return false;
                    }
                }
                y += y_step;
                x += x_step;
            }
        }
        return true;
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