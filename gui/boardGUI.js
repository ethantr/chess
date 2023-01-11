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
    #start_square
    #end_square;
    possible_moves;
    game;


    constructor(game) {
        this.game = game;
        this.setSelectedSquare(null)
        this.setEndSquare(null)
        this.setStartSquare(null)
        this.possible_moves = [];
        this.board = game.getBoard()
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

    setStartSquare(square){
        this.#start_square = square;
    }

    getStartSquare(){
        return this.#start_square;
    }

    setEndSquare(square){
        this.#end_square = square;
    }

    getEndSquare(){
        return this.#end_square;
    }


    performAction(square){
        console.warn(square)
        this.holdSelectedSquare(square);

        if (this.getStartSquare() !== null && this.getEndSquare() !== null){
            console.log("Condition is met")
            this.game.playTurn(this.game.currentTurn(),this.getStartSquare().getX(),this.getStartSquare().getY(),this.getEndSquare().getX(),this.getEndSquare().getY())
            this.setStartSquare(null)
            this.setEndSquare(null)
            this.constructGUIBoard();
        }
        else if(this.getStartSquare() !== null){
            var potentialMoves = getPossibleMoves(this.board, this.getStartSquare().getX(), this.getStartSquare().getY())
            if(potentialMoves.length === 0){
                this.setStartSquare(null)
            } else 
            this.highlightPossibleMoves(potentialMoves);
        }


    }

    holdSelectedSquare(square){
        if(this.getStartSquare() === null && !square.isVacant() && this.getEndSquare() == null && square.getPiece().getColour() === game.currentTurn().getColour()){
            this.setStartSquare(square)
            console.log("Start square set")
            
        } 
        else if (square.isVacant && this.getStartSquare() == null){
            return
        }
        else if(this.getStartSquare().getPiece() !== PLACEHOLDER){
            this.setEndSquare(square)
            console.log("End square set")
        } 
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
            this.performAction(currentSquare);
            
            // this.setSelectedSquare(currentSquare);
            // console.log(this.highlightPossibleMoves(getPossibleMoves(this.board, this.getSelectedSquare().getX(), this.getSelectedSquare().getY())))
        }, false);

        this.html_board[y][x] = data_cell;
        data_cell.style.boxSizing = "border-box";
        return data_cell;
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
        this.highlightSquare(this.getStartSquare().getX(),this.getStartSquare().getY())
    }

    removeHighlightSquare(x,y){
        var cell = this.html_board[y][x];
        cell.style.background = ""
        cell.style.border= ""; 
    }

    highlightSquare(x,y){
        var cell = this.html_board[y][x];
        cell.style.background = "orange"
        
        cell.style.border= "2px solid darkred"; 
    }

    highlightEnemySquare(x,y){
        var cell = this.html_board[y][x];
        cell.style.background = "rgba(255, 140, 140, 1)"
        
        cell.style.border= "5px solid darkred"; 
    }

}
