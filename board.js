class Board {

    #squares
   
    constructor() {
        this.#squares = new Array(BOARD_SIZE);

        for (var i = 0; i < BOARD_SIZE; i++) {
            this.#squares[i] = new Array(BOARD_SIZE);
        }

    }

    getSquares() {
        return this.#squares;
    }

    getSquare(x, y) {
        if (x >= BOARD_SIZE || x < 0 || y >= BOARD_SIZE || y < 0) {
            console.warn("out of bounds")
            return new Square(-10, -10, PLACEHOLDER);
        }
        return this.getSquares()[y][x];
    }


    placePiece(piece, x, y) {
        this.#squares[y][x] = new Square(x, y, piece);
    }


    cleanBoard() {
        for (let y = 0; y < this.#squares.length; y++) {
            for (let x = 0; x < this.#squares.length; x++) {
                this.getSquares()[y][x] = new Square(x, y, PLACEHOLDER)
            }
        }
    }




    resetBoard() {
        for (let y = 2; y < this.#squares.length; y++) {
            for (let x = 0; x < this.#squares.length; x++) {
                this.#squares[y][x] = new Square(x, y, PLACEHOLDER)
            }

        }
        this.placePiece(new Rook(BLACK), 0, 0);
        this.placePiece(new Rook(BLACK), 7, 0);
        this.placePiece(new Rook(WHITE), 0, 7);
        this.placePiece(new Rook(WHITE), 7, 7);
        this.placePiece(new Knight(BLACK), 1, 0);
        this.placePiece(new Knight(BLACK), 6, 0);
        this.placePiece(new Knight(WHITE), 1, 7);
        this.placePiece(new Knight(WHITE), 6, 7);
        this.placePiece(new Bishop(BLACK), 2, 0);
        this.placePiece(new Bishop(BLACK), 5, 0);
        this.placePiece(new Bishop(WHITE), 2, 7);
        this.placePiece(new Bishop(WHITE), 5, 7);
        this.placePiece(new Queen(BLACK), 3, 0)
        this.placePiece(new Queen(WHITE), 3, 7)
        this.placePiece(new King(BLACK), 4, 0)
        this.placePiece(new King(WHITE), 4, 7)
        for (let index = 0; index < BOARD_SIZE; index++) {
            this.placePiece(new Pawn(WHITE), index, 6)
            this.placePiece(new Pawn(BLACK), index, 1)
        }
    }

    constructGUIBoard() {
        var table = document.getElementById('board');
        for (let index = 0; index < this.#squares.length; index++) {
            //Create a row in the table.
            var board_row_element = document.createElement('tr');
            table.appendChild(board_row_element);
            //Fill in the row with squares
            for (let j = 0; j < BOARD_SIZE; j++) {

                var data_cell = document.createElement('td');
                board_row_element.appendChild(data_cell);
                var square = document.createElement('div');

                let currentSquare = this.#squares[index][j];
                var pieceName = getPieceName(currentSquare.getPiece())
                // If not a vacant piece, set the square to a piece.
                if (pieceName !== "null") square.className = "piece " + pieceName;
                console.log("piece " + getPieceName(currentSquare.getPiece()))
                data_cell.appendChild(square);
            }

        }

    }


    getKingPosition(playerColour) {

        for (var y = 0; y < BOARD_SIZE; y++) {
            for (var x = 0; x < BOARD_SIZE; x++) {
                var searchSquare = this.getSquare(x, y);
                if (!searchSquare.isVacant() && searchSquare.getPiece().constructor === King && searchSquare.getPiece().getColour() === playerColour) {
                    return searchSquare;
                }
            }
        }
    }

    isKingInCheck(playerColour) {

        //Find position of king
        var kingSquare = this.getKingPosition(playerColour)


        //Get opponent pieces and check if they can capture king
        for (var y = 0; y < BOARD_SIZE; y++) {
            for (var x = 0; x < BOARD_SIZE; x++) {
                var searchSquare = this.getSquare(x, y);

                if (!searchSquare.isVacant() && searchSquare.getPiece().canMove(this, searchSquare, kingSquare)) {
                    console.log(searchSquare.getPiece() + " at " + searchSquare.getX() + ", " + searchSquare.getY() + " can check")
                    return true;
                }
            }
        }
        return false;

    }

    getPlayerSquares(player_colour){
        var player_squares = []
        for (var y = 0; y < BOARD_SIZE; y++) {
            for (var x = 0; x < BOARD_SIZE; x++) {
                var searchSquare = this.getSquare(x, y);
                if (!searchSquare.isVacant() && searchSquare.getPiece().getColour() === player_colour) {
                    player_squares.push(searchSquare)
                }
            }
        }
        return player_squares
    }

    // Returns the squares with the requested pieces (colour,type)
    getPieces(player_colour,type){
        var squares = []
        for (var y = 0; y < BOARD_SIZE; y++) {
            for (var x = 0; x < BOARD_SIZE; x++) {
                var searchSquare = this.getSquare(x, y);
                if (!searchSquare.isVacant() && searchSquare.getPiece().getColour() === player_colour && searchSquare.getPiece().constructor === type) {
                    squares.push(searchSquare)
                }
            }
        }
        return squares
    }

    isCheckmate(player_colour) {
        console.log('checking for checkmate')

        //Find position of king
        var kingSquare = this.getKingPosition(player_colour);
        var kingLegalMoves = getPossibleMoves(this, kingSquare.getX(), kingSquare.getY())
        // Check for legal king moves to squares that are not under attack
        if (kingLegalMoves.length >= 1) {
            console.warn(player_colour+" King can make moves",kingLegalMoves)
            return false
        }

        //Get player pieces
         const playerSquares = this.getPlayerSquares(player_colour)
         var checkmate = true;
         playerSquares.forEach(square => {
            const num_possible_moves = getPossibleMoves(this,square.getX(),square.getY()).length
            if (num_possible_moves >= 1) {
                checkmate = false;
            }
         });

         return checkmate;


        // May be efficient steps to implement:
        // Verify if the king is in check, if not there's no need to continue.
        // Identify the attacker piece.
        // Check if the attacking piece can be captured by own pieces or if there's any blocking move.
    }



    setDebugBoard(){
        this.cleanBoard();
        this.placePiece(new Queen(WHITE), 3, 7)
        this.placePiece(new King(BLACK), 4, 0)
        this.placePiece(new King(WHITE), 4, 7)
    }


}