function getPossibleMoves(board,startX,startY) {
    var square = board.getSquare(startX,startY);
    var piece = square.getPiece()
    if (piece === null){
        console.error("Square is vacant. No moves possible.")
        return [];
    }
    return piece.getPossibleMoves(board,square)
}


function moveResultsInCheck(board,start,end){
    var playerColour = start.getPiece().getColour();

    //Simulate board move - regular moves only
    var boardCopy = DeepCopyFactory.copyBoard(board);
    var pieceMovedCopy = DeepCopyFactory.copyPiece(start.getPiece())
    boardCopy.placePiece(pieceMovedCopy, end.getX(), end.getY())
    boardCopy.placePiece(PLACEHOLDER, start.getX(), start.getY())

    return !boardCopy.isKingInCheck(playerColour);


}



class DeepCopyFactory{

    static copyBoard(board){
        var newBoard = new Board();
    
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                let clone = DeepCopyFactory.copySquare(board.getSquare(x,y));
                newBoard.placePiece(clone.getPiece(),clone.getX(),clone.getY())
                //newBoard.getSquares()[y][x] = clone;
                
            }
        }
        return newBoard;
    }



    static copySquare(square){

        var piece = square.getPiece();

        var newPiece = DeepCopyFactory.copyPiece(piece);

        var result = new Square(square.getX(),square.getY(),newPiece);
        return result;
    }


    static copyPiece(piece){

        if (piece === PLACEHOLDER){
            return PLACEHOLDER;
        }

        
        var pieceClass = piece.constructor;
        var pieceColor = piece.getColour();

        
        var newPiece = new pieceClass(pieceColor)
        if(pieceClass === Pawn || pieceClass === Rook || pieceClass === King){
            if(piece.firstMovePlayed()){
                newPiece.playFirstMove()
            }
        }

        return newPiece;
    }
}