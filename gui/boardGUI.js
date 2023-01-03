function getPieceName(piece) {
    if (piece === PLACEHOLDER) {
        return "null"
    }

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


class GUIBoard {

    //need an object that integrates game, has chosen piece, and chosen square to move.

    #chosen_square

    constructor(board){
        this.board = board
        this.constructGUIBoard()
    }

    getSelectedSquare(){
        return this.#chosen_square;
    }
    setSelectedSquare(square){
        console.warn(square)
        this.#chosen_square = square;
    }



    constructGUIBoard() {
        var table = document.getElementById('board');
        table.innerHTML = ""
        for (let y = 0; y < this.board.getSquares().length; y++) {
            //Create a row in the table.
            var board_row_element = document.createElement('tr');
            table.appendChild(board_row_element);
            //Fill in the row with squares
            for (let x = 0; x < BOARD_SIZE; x++) {

                var data_cell = document.createElement('td');
                board_row_element.appendChild(data_cell);
                var square = document.createElement('div');

                let currentSquare = this.board.getSquares()[y][x];
                var pieceName = getPieceName(currentSquare.getPiece())
                // If not a vacant piece, set the square to a piece.
                if (pieceName !== "null") square.className = "piece " + pieceName;
                data_cell.appendChild(square);
              
                data_cell.addEventListener("click", () => { this.setSelectedSquare(currentSquare); 
                 console.log(getPossibleMoves(this.board,this.getSelectedSquare().getX(),this.getSelectedSquare().getY()) ) }, false);
            }


        }

    }

    modifyText(text){
        
    }

    eventHandler(event) {
        if (event.type === 'fullscreenchange') {
          /* handle a full screen toggle */
        } else /* fullscreenerror */ {
          /* handle a full screen toggle error */
        }


        
      }
      
}
