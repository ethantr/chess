function getPossibleMoves(board,startX,startY) {
    var square = board.getSquare(startX,startY);
    var piece = square.getPiece()
    if (piece === null){
        console.error("Square is vacant. No moves possible.")
        return [];
    }
    return piece.getPossibleMoves(board,square)
}