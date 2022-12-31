class Game {

    players = [];

    #board;

    #currentTurn;

    movesPlayed = []

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

        this.movesPlayed = [];
    }

    playTurn(player, startX, startY, endX, endY) {

        console.log(this.getBoard());
        // if (isNaN(this.getBoard())) {
        //     console.error("board does not exist.", this.getBoard());
        //     return false;
        // }
        var startSquare = this.getBoard().getSquare(startX, startY);
        var endSquare = this.getBoard().getSquare(endX, endY);
        console.log("Chosen piece ", startSquare, "dest", endSquare)
        var move = new Move(player, startSquare, endSquare);
        return this.makeMove(move, player);
    }

    makeCastleMove(move){
        const KING_MOVE_DISTANCE = 2;
        var king = move.getStart();
        var rook = move.getEnd();

        move.pieceToMove().setCastled(true);

        var rookPiece = move.getEnd().getPiece()

        this.getBoard().placePiece(PLACEHOLDER,rook.getX(),rook.getY())
        this.getBoard().placePiece(PLACEHOLDER,king.getX(),king.getY())
        var distance = king.getX() - rook.getX();
        if(distance > 0){
            console.log("RIGHT MOVE")
            //Perform right moving 
            this.getBoard().placePiece(move.pieceToMove(),king.getX()-KING_MOVE_DISTANCE,king.getY())
            this.getBoard().placePiece(rookPiece,king.getX()-KING_MOVE_DISTANCE+1,rook.getY())
        } else{
            //perform left moving.
            console.log("LEFT MOVE")
            this.getBoard().placePiece(move.pieceToMove(),king.getX()+KING_MOVE_DISTANCE,king.getY())
            this.getBoard().placePiece(rookPiece,king.getX()-KING_MOVE_DISTANCE+1,rook.getY())
        }

        return true;
    }

    makeMove(move) {
        console.log(move)
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
        if (!move.pieceToMove().canMove(this.getBoard(), move.getStart(),
            move.getEnd())) {
            console.error("Cannot move..")
            return false;
        }

        if(move.pieceToMove().constructor === King){
            move.setIsCastle(move.pieceToMove().isValidCastle(this.getBoard(),move.getStart(),move.getEnd()))
        }
        if(move.isCastleMove()){
            console.error("make castle move")
            this.makeCastleMove(move);
            this.nextTurn()
            this.movesPlayed.push(move);
            return true
        }

        //kill piece
        var destPiece = move.getEnd().getPiece();
        if (!move.getEnd().isVacant()){
            destPiece.kill(true);
            move.setPieceKilled(destPiece);
        }

         // store the move
         this.movesPlayed.push(move);
        this.getBoard().placePiece(move.pieceToMove(),move.getEnd().getX(),move.getEnd().getY())
        this.getBoard().placePiece(PLACEHOLDER,move.getStart().getX(),move.getStart().getY())

        this.nextTurn()
        return true;
    }

}

