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

    getPossibleMoves(board,start){
        var moves = [];
        
        //Left Rook
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
        //Right rook
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
        //Up rook
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
        //Down rook
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