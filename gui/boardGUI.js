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

    html_board;
    #chosen_square
    possible_moves;

    constructor(board) {
        this.possible_moves = [];
        this.board = board
        this.html_board = new Array(BOARD_SIZE);
        for (let index = 0; index < this.html_board.length; index++) {
            this.html_board[index] = new Array(BOARD_SIZE);
            
        }
        this.constructGUIBoard()
        
    }

    getSelectedSquare() {
        return this.#chosen_square;
    }
    setSelectedSquare(square) {
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

                board_row_element.appendChild(this.constructSquareHTML(x,y));
                // var data_cell = document.createElement('td');
                // board_row_element.appendChild(data_cell);
                // var square = document.createElement('div');

                // let currentSquare = this.board.getSquares()[y][x];
                // var pieceName = getPieceName(currentSquare.getPiece())
                // // If not a vacant piece, set the square to a piece.
                // if (pieceName !== "null") square.className = "piece " + pieceName;
                // data_cell.appendChild(square);

                // data_cell.addEventListener("click", () => {
                //     this.setSelectedSquare(currentSquare);
                //     console.log(getPossibleMoves(this.board, this.getSelectedSquare().getX(), this.getSelectedSquare().getY()))
                // }, false);
            }


        }

    }

    constructSquareHTML(x, y) {
        var data_cell = document.createElement('td');
        var square = document.createElement('div');

        let currentSquare = this.board.getSquare(x,y);
        if(currentSquare.isOffBoard()){
            return;
        }
        var pieceName = getPieceName(currentSquare.getPiece())
        // If not a vacant piece, set the square to a piece.
        if (pieceName !== "null") square.className = "piece " + pieceName;
        data_cell.appendChild(square);

        data_cell.addEventListener("click", () => {
            
            this.setSelectedSquare(currentSquare);
            console.log(this.highlightPossibleMoves(getPossibleMoves(this.board, this.getSelectedSquare().getX(), this.getSelectedSquare().getY())))
        }, false);

        this.html_board[y][x] = data_cell;
        data_cell.style.boxSizing = "border-box";
        return data_cell;
    }

    eventHandler(event) {
        if (event.type === 'fullscreenchange') {
            /* handle a full screen toggle */
        } else /* fullscreenerror */ {
            /* handle a full screen toggle error */
        }



    }

    highlightPossibleMoves(moves){

        this.possible_moves.forEach(element =>{
            this.removeHighlightSquare(element.getX(),element.getY())
        });
        this.possible_moves = moves;
        this.possible_moves.forEach(element => {
            if(element.getPiece()!== PLACEHOLDER){
                this.highlightEnemySquare(element.getX(),element.getY())
            } else
            this.highlightSquare(element.getX(),element.getY())
        });
        //this.highlightSquare(this.getSelectedSquare().getX(),this.getSelectedSquare().getY())
    }

    removeHighlightSquare(x,y){
        var cell = this.html_board[y][x];
        cell.style.background = ""
        cell.style.border= ""; 
    }

    highlightSquare(x,y){
        var cell = this.html_board[y][x];
        cell.style.background = "rgba(220, 255, 220, 1)"
        
        cell.style.border= "2px solid darkred"; 
    }

    highlightEnemySquare(x,y){
        var cell = this.html_board[y][x];
        cell.style.background = "rgba(255, 140, 140, 1)"
        
        cell.style.border= "5px solid darkred"; 
    }

}
