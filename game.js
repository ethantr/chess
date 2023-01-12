class Game {

    players = [];

    #board;

    #currentTurn;

    movesPlayed = []
    #status

    static checkmate_status = "CHECKMATE"
    static in_check_status = "CHECK"
    static stalemate_status = "STALEMATE"
    static active_status = "ACTIVE"

    static WHITE_START_Y = BOARD_SIZE - 1;
    static BLACK_START_Y = 0;


    isGameOver(){
        return this.getStatus() === Game.stalemate_status || this.getStatus() === Game.checkmate_status
    }

    getBoard() {
        return this.#board;
    }

    //Current Turn
    currentTurn() {
        return this.#currentTurn
    }

    setCurrentTurn(player) {
        this.#currentTurn = player;
    }

    //Set the next turn
    nextTurn() {
        this.setCurrentTurn(this.whoIsNext())
    }
    // Return who is the next turn
    whoIsNext(){
        if (this.currentTurn() === this.players[0]) {
            return this.players[1]
        } else {
            return this.players[0]
        }
    }

   

    //Sets up the game
    initialise(player1, player2) {

        if (player1.getColour() === player2.getColour()) {
            console.error("Players cannot be matching colours");
        }
        this.players = [];
        this.players.push(player1);
        this.players.push(player2);

        
        this.resetGame()

    }

    resetGame(){
        this.#board = new Board();
        this.#board.cleanBoard();
        this.#board.resetBoard();
        this.movesPlayed = [];
        this.setStatus(Game.active_status);
        if (this.players[0].getColour() === WHITE) {
            this.setCurrentTurn(this.players[0])
        } else {
            this.setCurrentTurn(this.players[1])
        }
    }

    // Refreshes and determines what status the game is in
    updateStatus() {
        this.getBoard().getKingPosition(this.currentTurn().getColour()).getPiece().setInCheck(false);

        this.setStatus(Game.active_status)
        //Check if the current player's king is in check.
        if (this.getBoard().isKingInCheck(this.currentTurn().getColour())) {
            this.setStatus(Game.in_check_status)
            this.getBoard().getKingPosition(this.currentTurn().getColour()).getPiece().setInCheck(true);
        }
        // Check if the move results in a stalemate (a draw).
        var stalemate = false;
        if(this.isStalemate()){
            this.setStatus(Game.stalemate_status)
        }
        // Check if the move results in a checkmate (ending the game with a win for the checking player).
        var checkmate = false;
        if(this.getBoard().isCheckmate(this.currentTurn().getColour())){
            this.setStatus(Game.checkmate_status);
        }
    }

    getStatus() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }

    isStalemate() {
        // Must have at least one legal move and not in check (no legal moves)

        // The game must not have been previously declared a draw by the 50-move rule.

        // The game must not have been previously declared a draw by the threefold repetition rule

        // The game cannot have been previously declared a draw by the insufficient material rule
        var current_king_only = this.#onlyHasKing(this.currentTurn().getColour());
        var oppponent_king_only = this.#onlyHasKing(this.whoIsNext().getColour());
        
        // - Find only 1 white king and 1 black king
        if (current_king_only && oppponent_king_only){
            return true;
        } 

        // - 1 king, 1 king and bishop

        // - 1 king, 1 king and bishop
        
        
        else{
            false;
        }
    }

    #onlyHasKing(player_colour){
        // Only will work if the pieces on the board does not permit two kings.
        var total_pieces = this.getBoard().getPlayerSquares(player_colour).length;
        return total_pieces === 1;
    }


    //Checks if a move results in a pawn being promoted
    isPawnBeingPromoted(move) {
        //Check if pawn is actually being moved
        if (!(move.pieceToMove().constructor === Pawn)) {
            return false;
        }

        var playerColor = move.pieceToMove().getColour();
        //Determine if the end square is correct
        if (playerColor === WHITE) {
            return move.getEnd().getY() === Game.BLACK_START_Y;
        } else if (playerColor === BLACK) {
            return move.getEnd().getY() === Game.WHITE_START_Y;
        }
        else {
            return false;
        }

    }


    //Determines if the move about to be played is a castle
    isCastleMove(move){
        //Checks if king is being moved
        if (!(move.pieceToMove().constructor === King)) {
            return false;
        }
        return (!this.getBoard(this.currentTurn().getColour()) && !move.pieceToMove().hasCastled() && move.pieceToMove().canMoveSafe(this.getBoard(),move.getStart(),move.getEnd()))
    }

    //Plays the selected player's turn, if the move inputted is valid
    playTurn(player, start_X, start_Y, end_X, end_Y, promotion_piece) {
        if(this.isGameOver()){
            console.error("Game is over!")
            return false
        }

        var startSquare = this.getBoard().getSquare(start_X, start_Y);
        var endSquare = this.getBoard().getSquare(end_X, end_Y)
        console.warn("Chosen piece for playing turn", startSquare, "dest", endSquare)
        var move = new Move(player, startSquare, endSquare, promotion_piece);
        return this.makeMove(move, player);
    }

    
    //Performs castle move.
    makeCastleMove(move) {
        const KING_MOVE_DISTANCE = 2;
        var king = move.getStart();
        const ROOK_LEFT_START_X = 0;
        const ROOK_RIGHT_START_X = BOARD_SIZE - 1;

        //Get rook square
        const rook_X = king.getX() > move.getEnd().getX() ? ROOK_LEFT_START_X : ROOK_RIGHT_START_X;
        const rook = this.getBoard().getSquare(rook_X, move.getEnd().getY())


        //Set castled for rook and king.
        king.getPiece().playFirstMove();
        var rookPiece = rook.getPiece();
        rookPiece.playFirstMove();

        //Clear original spaces in the board
        this.getBoard().placePiece(PLACEHOLDER, rook.getX(), rook.getY())
        this.getBoard().placePiece(PLACEHOLDER, king.getX(), king.getY())

        //Determine which side rook is on.
        var distance = king.getX() - rook.getX();

        if (distance > 0) {
            // Rook on right hand side. Perform right moving 
            this.getBoard().placePiece(move.pieceToMove(), king.getX() - KING_MOVE_DISTANCE, king.getY())
            this.getBoard().placePiece(rookPiece, king.getX() - KING_MOVE_DISTANCE + 1, rook.getY())
        } else {
            // Rook on left hand side. Perform left moving 
            this.getBoard().placePiece(move.pieceToMove(), king.getX() + KING_MOVE_DISTANCE, king.getY())
            this.getBoard().placePiece(rookPiece, king.getX() + KING_MOVE_DISTANCE - 1, rook.getY())
        }
        return true;
    }

    //Performs the move if the move is valid
    makeMove(move) {
        var player = move.getPlayer();

        //check if there is actually a piece in the starting position.
        if (move.getStart().isVacant()) {
            console.error("Start position is vacant.", move.getStart().getPiece() === NaN, move.getStart().isVacant())
            return false;
        }

        // Check for valid player
        if (player.getColour() !== this.currentTurn().getColour()) {
            console.error("It is not the players turn.", "Current turn:", this.currentTurn(), "Requested:", player)
            return false;
        }

        //Check if piece to move matches the player
        if (move.pieceToMove().getColour() !== player.getColour()) {
            console.error("Piece colour does not match player colour.", "Move Colour", move.pieceToMove().getColour(), "Player Colour", player.getColour())
            return false;
        }

        // Check for valid move
        if (!move.pieceToMove().canMoveSafe(this.getBoard(), move.getStart(),
            move.getEnd())) {
            console.error("Not a valid move,", move, this.getBoard())
            return false;
        }
        //Pawn first Move
        if (move.pieceToMove().constructor === Pawn && !(move.pieceToMove().firstMovePlayed())) {
            move.pieceToMove().playFirstMove()
        }


        //Rook first Move
        if (move.pieceToMove().constructor === Rook && !(move.pieceToMove().firstMovePlayed())) {
            move.pieceToMove().playFirstMove()
        }


        //King first Move
        if (this.isCastleMove(move)) {
            this.makeCastleMove(move);
            this.movesPlayed.push(move);
             //Update status of game
             this.nextTurn()
             this.updateStatus()
             return true;

        }
        else if (move.pieceToMove().constructor === King && !(move.pieceToMove().firstMovePlayed())) {
            move.pieceToMove().playFirstMove()
        }

        //Pawn promotion move
        if (this.isPawnBeingPromoted(move)) {
            this.movesPlayed.push(move);
            this.getBoard().placePiece(move.getPromotionChoice(), move.getEnd().getX(), move.getEnd().getY())
            this.getBoard().placePiece(PLACEHOLDER, move.getStart().getX(), move.getStart().getY())

            //Update status of game
            this.nextTurn()
            this.updateStatus()
            return true;
        }

        //Kill piece
        var destPiece = move.getEnd().getPiece();
        if (!move.getEnd().isVacant()) {
            destPiece.kill(true);
            move.setPieceKilled(destPiece);
        }

        // store the move
        this.movesPlayed.push(move);
        console.warn("Board before:", this.getBoard())
        console.warn("King BLACK should be at ", this.getBoard().getKingPosition(BLACK))
        this.getBoard().placePiece(move.pieceToMove(), move.getEnd().getX(), move.getEnd().getY())
        this.getBoard().placePiece(PLACEHOLDER, move.getStart().getX(), move.getStart().getY())
        console.warn("Board after:", this.getBoard())
        console.warn("King BLACK NOW at ", this.getBoard().getKingPosition(BLACK))

        //Update status of game
        this.nextTurn()
        this.updateStatus()
        return true;
    }


}

