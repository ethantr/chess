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


    getBoard() {
        return this.#board;
    }

    currentTurn() {
        return this.#currentTurn
    }

    nextTurn() {
        if (this.currentTurn() === this.players[0]) {
            this.setCurrentTurn(this.players[1])
        } else {
            this.setCurrentTurn(this.players[0])
        }
    }

    setCurrentTurn(player) {
        this.#currentTurn = player;
    }


    initialise(player1, player2) {
        if (player1.getColour() === player2.getColour()) {
            console.error("Players cannot be matching colours");
        }
        this.players.push(player1);
        this.players.push(player2);

        if (player1.getColour() === WHITE) {
            this.setCurrentTurn(player1)
        } else {
            this.setCurrentTurn(player2)
        }
        this.#board = new Board();
        this.#board.cleanBoard();
        this.#board.resetBoard()

        this.movesPlayed = [];
        this.setStatus(Game.active_status);

    }


    updateStatus() {

        this.setStatus(Game.active_status)
        //Check if the current player's king is in check.
        if (isKingInCheck(this.getBoard(), this.currentTurn().getColour())) {
            this.setStatus(Game.in_check_status)
        }
        // Check if the move results in a stalemate (a draw).
        var stalemate = false;
        // Check if the move results in a checkmate (ending the game with a win for the checking player).
        var checkmate = false;
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
        // - Find only 1 white king and 1 black king
        // - 1 king, 1 king and bishop
        // - 1 king, 1 king and bishop
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

    isCastleMove(move){
        if (!(move.pieceToMove().constructor === King)) {
            console.warn("Not king selected.")
            return false;
        }
        return (!move.pieceToMove().hasCastled() && move.pieceToMove().canMoveSafe(this.getBoard(),move.getStart(),move.getEnd()))
    }

    //Plays the selected player's turn, if the move inputted is valid
    playTurn(player, start_X, start_Y, end_X, end_Y, promotion_piece) {

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
             //updateStatusFunction
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
            //updateStatusFunction
            return true;
        }

        // Castle move


        //Check if castle
        // if (move.pieceToMove().constructor === King) {
        //     if (!move.pieceToMove().hasCastled()) {
        //         move.setIsCastle(true)
        //         this.nextTurn()
        //         this.movesPlayed.push(move);
        //         return true
        //     } else {
        //         move.pieceToMove().playFirstMove()
        //     }
        // }
        //kill piece
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
        //updateStatusFunction
        return true;
    }


}

