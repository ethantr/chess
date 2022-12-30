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

        move.setIsCastle(move.pieceToMove().canMove(this.getBoard(), move.getStart(),
        move.getEnd()))
        if(move.isCastleMove()){
            console.error("needs to castle.")
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

