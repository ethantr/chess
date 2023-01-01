function getPossibleMoves(board,startX,startY) {
    var square = board.getSquare(startX,startY);
    var piece = square.getPiece()
    return piece.getPossibleMoves(board,square)
}