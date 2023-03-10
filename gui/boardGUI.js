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
    temp_move;
    game;
    selection_box;


    constructor(game) {
        this.game = game;
        this.setSelectedSquare(null)
        this.setEndSquare(null)
        this.setStartSquare(null)
        this.possible_moves = [];
        // this.board = game.getBoard()
        this.html_board = new Array(BOARD_SIZE);
        for (let index = 0; index < this.html_board.length; index++) {
            this.html_board[index] = new Array(BOARD_SIZE);

        }
        this.constructGUIBoard()
        this.updatePlayerTurnBox();
        this.updateGameStatus()

    }

    getSelectedSquare() {
        return this.#chosen_square;
    }
    setSelectedSquare(square) {
        console.warn(square)
        this.#chosen_square = square;
    }

    setStartSquare(square) {
        this.#start_square = square;
    }

    getStartSquare() {
        return this.#start_square;
    }

    setEndSquare(square) {
        this.#end_square = square;
    }

    getEndSquare() {
        return this.#end_square;
    }


    // Checks if pawn is about to promote
    isPawnPromoting() {
        const WHITE_FINISH = 0;
        const BLACK_FINISH = BOARD_SIZE - 1;
        var pawn_is_moved = this.getStartSquare().getPiece().constructor === Pawn
        var can_move = this.getStartSquare().getPiece().canMoveSafe(this.game.getBoard(),this.getStartSquare(),this.getEndSquare());
        var white_condition = this.game.currentTurn().getColour() === WHITE && this.getEndSquare().getY() === WHITE_FINISH
        var black_condition = this.game.currentTurn().getColour() === BLACK && this.getEndSquare().getY() === BLACK_FINISH;

        return can_move && pawn_is_moved && (white_condition || black_condition);
    }


    performAction(square) {
        console.warn(square)
        this.holdSelectedSquare(square);

        if (this.getStartSquare() !== null && this.getEndSquare() !== null) {
            console.log("Condition is met")

            //Check for promoting pawn
            if (this.isPawnPromoting()) {
                //Prompt for promotion
                console.warn("Promoting pawn")
                this.constructPawnPromotionBox(this.game.currentTurn().getColour())
                return;
            } else {
                this.game.playTurn(this.game.currentTurn(), this.getStartSquare().getX(), this.getStartSquare().getY(), this.getEndSquare().getX(), this.getEndSquare().getY())
            }
            this.updateGameStatus()
            this.setStartSquare(null)
            this.setEndSquare(null)
            this.constructGUIBoard();
            this.updatePlayerTurnBox();
        }
        else if (this.getStartSquare() !== null) {
            var potentialMoves = getPossibleMoves(this.game.getBoard(), this.getStartSquare().getX(), this.getStartSquare().getY())
            if (potentialMoves.length === 0) {
                this.setStartSquare(null)
            } else
                this.highlightPossibleMoves(potentialMoves);
        }


    }

    holdSelectedSquare(square) {
        if (this.getStartSquare() === null && !square.isVacant() && this.getEndSquare() == null && square.getPiece().getColour() === game.currentTurn().getColour()) {
            this.setStartSquare(square)
            console.log("Start square set")

        }
        else if (square.isVacant && this.getStartSquare() == null) {
            return
        }
        else if (this.getStartSquare().getPiece() !== PLACEHOLDER) {
            this.setEndSquare(square)
            console.log("End square set")
        }
    }


    constructGUIBoard() {
        var table = document.getElementById('board');
        table.innerHTML = ""
        for (let y = 0; y < this.game.getBoard().getSquares().length; y++) {
            //Create a row in the table.
            var board_row_element = document.createElement('tr');
            table.appendChild(board_row_element);
            //Fill in the row with squares
            for (let x = 0; x < BOARD_SIZE; x++) {

                board_row_element.appendChild(this.constructSquareHTML(x, y));
            }


        }

    }

    constructSquareHTML(x, y) {
        var data_cell = document.createElement('td');
        var square = document.createElement('div');

        let currentSquare = this.game.getBoard().getSquare(x, y);
        if (currentSquare.isOffBoard()) {
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



    highlightPossibleMoves(moves) {

        this.possible_moves.forEach(element => {
            this.removeHighlightSquare(element.getX(), element.getY())
        });
        this.possible_moves = moves;
        this.possible_moves.forEach(element => {
            if (element.getPiece() !== PLACEHOLDER) {
                this.highlightEnemySquare(element.getX(), element.getY())
            } else
                this.highlightSquare(element.getX(), element.getY())
        });
        this.highlightSquare(this.getStartSquare().getX(), this.getStartSquare().getY())
    }

    removeHighlightSquare(x, y) {
        var cell = this.html_board[y][x];
        cell.style.background = ""
        cell.style.border = "";
    }

    highlightSquare(x, y) {
        var cell = this.html_board[y][x];
        cell.style.background = "rgba(255, 145, 0, 0.497)"

        cell.style.border = "2px solid darkred";
    }

    highlightEnemySquare(x, y) {
        var cell = this.html_board[y][x];
        cell.style.background = "rgba(255, 140, 140, 1)"

        cell.style.border = "5px solid darkred";
    }


    // Update Player Turn Box


    updatePlayerTurnBox() {
        var playerTurn = game.currentTurn().getColour();
        const playerNameLabel = document.getElementById('current-player-label')
        const playerImg = document.getElementById('current-player-img')
        playerNameLabel.textContent = playerTurn;
        playerImg.src = 'assets/pawn-' + playerTurn.toLowerCase() + ".png"
    }



    constructPawnPromotionBox(colour) {
        this.selection_box = document.createElement('div')
        this.selection_box.className = "pawn-promotion-selector";

        //Label
        const label = document.createElement('h3');
        label.textContent = "Choose Piece to Promote to"
        this.selection_box.appendChild(label)

        //Buttons Construction
        const promotion_list = document.createElement('div')
        promotion_list.className = "promote-selection-list"
        this.selection_box.appendChild(promotion_list)

        promotion_list.appendChild(this.createPromotionInput("queen",colour)) 
        promotion_list.appendChild(this.createPromotionInput("rook",colour)) 
        promotion_list.appendChild(this.createPromotionInput("bishop",colour)) 
        promotion_list.appendChild(this.createPromotionInput("knight",colour)) 
        
        document.body.appendChild(this.selection_box);
    }

    createPromotionInput(piece,colour){
        const input = document.createElement('input');
        input.className = "pawn-select";
        input.type = "image";
        var newPiece = piece + "|"+colour;
        console.log(newPiece)
        input.value = newPiece;
        var src_string = "assets/"+piece+"-"+colour.toLowerCase()+".png"
        console.log(src_string)
        input.src = src_string;
        input.onclick = function() {gui.performPawnPromotion(piece,colour)}
        console.log(input.onclick)
        //input.addEventListener('click',this.pawnPromote)
        return input;
    }

    removePawnPromotionBox() {
        document.body.removeChild(this.selection_box)
        this.selection_box = null;
    }

    performPawnPromotion(piece,colour){
        var promotion_piece;
        switch(piece){
            case "queen":
                promotion_piece = new Queen(colour)
                break;
            case "rook":
                promotion_piece = new Rook(colour)
                break;
            case "bishop":
                promotion_piece = new Bishop(colour)
                break;
            default:
                promotion_piece = new Knight(colour)
                break
            
        }
        this.game.playTurn(this.game.currentTurn(), this.getStartSquare().getX(), this.getStartSquare().getY(), this.getEndSquare().getX(), this.getEndSquare().getY(),promotion_piece)
        this.setStartSquare(null)
        this.setEndSquare(null)
        this.constructGUIBoard();
        this.updatePlayerTurnBox();
        this.removePawnPromotionBox();
    }


    updateGameStatus(){
        
        const status_label = document.getElementById('status-label')
        var status = game.getStatus()
        if(status === Game.active_status){
            status = "";
        }
        var newLabel = status;
        status_label.textContent = newLabel
    }


    resetGame(){
        console.warn("Resetting game")
        this.game.resetGame()
        this.constructGUIBoard();
        this.updatePlayerTurnBox();
        this.updateGameStatus()
    }
    
}
