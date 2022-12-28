function getPieceName(piece){
    var result = ""
    switch (piece.constructor) {
        case Knight:
            result += "knight"
            break;
        case Pawn:
            result += "pawn"
            break;
        case King:
            result += "king"
            break;
        case Queen:
            result += "queen";
            break;
        case Rook:
            result += "rook"
            break
        case Bishop:
            result += "bishop"
            break
        default:
            return "null";
    }
    result += "-" + piece.getColour().toLowerCase();
    return result;
}


function constructGUIBoard(board) {
    var table = document.getElementById('board');
    for (let index = 0; index < board.getSquares().length; index++) {
        //Create a row in the table.
        var board_row_element = document.createElement('tr');
        table.appendChild(board_row_element);
        //Fill in the row with squares
        for (let j = 0; j < BOARD_SIZE; j++) {

            var data_cell = document.createElement('td');
            board_row_element.appendChild(data_cell);
            var square = document.createElement('div');

            let currentSquare = board.getSquares()[index][j];
            var pieceName = getPieceName(currentSquare.getPiece())
            // If not a vacant piece, set the square to a piece.
            if (pieceName !== "null") square.className = "piece " + pieceName;
            console.log("piece " + getPieceName(currentSquare.getPiece()))
            data_cell.appendChild(square);
        }

    }

}