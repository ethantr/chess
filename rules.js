function getPossibleMoves(board,startX,startY) {
    var square = board.getSquare(startX,startY);
    var piece = square.getPiece()
    if (piece === null){
        console.error("Square is vacant. No moves possible.")
        return [];
    }
    return piece.getPossibleMoves(board,square)
}


function isKingInCheck(board,playerColour){
    console.log("Checking if " + playerColour + " king is in check")

    //Find position of king
    var kingSquare = board.getKingPosition(playerColour)
   

    //Get opponent pieces and check if they can capture king
    for (var y = 0; y < BOARD_SIZE;y++){
        for (var x = 0; x < BOARD_SIZE;x++){
            var searchSquare = board.getSquare(x,y);

            if(!searchSquare.isVacant() && searchSquare.getPiece().canMove(board,searchSquare,kingSquare)){
                console.log(searchSquare.getPiece() + " at " + searchSquare.getX() +", "+searchSquare.getY() + " can check")
                return true;
            }
        }
    }
    return false;

}


// function isValidMove(pieceToMove,start,end,board){
//     return pieceToMove.canMove(board,start,end) && !moveResultsInCheck(board,start,end)

// }


function moveResultsInCheck(board,start,end){
    var playerColour = start.getPiece().getColour();

    //Simulate board move
    var boardCopy = DeepCopyFactory.copyBoard(board);
    boardCopy.placePiece(start.getPiece(), end.getX(), end.getY())
    boardCopy.placePiece(PLACEHOLDER, start.getX(), start.getY())

    return !isKingInCheck(boardCopy,playerColour);


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

        //TO DO
        var eliminated = null;
        var firstMovePlayed = false;
        
        
        var newPiece = new pieceClass(pieceColor)
        if(pieceClass === Pawn || pieceClass === Rook || pieceClass === King){
            if(piece.firstMovePlayed()){
                newPiece.playFirstMove()
            }
        }

        return newPiece;
    }
}