class Board {

    #squares
    constructor() {
        this.#squares = new Array(BOARD_SIZE);

        for (var i = 0; i < BOARD_SIZE; i++) {
            this.#squares[i] = new Array(BOARD_SIZE);
        }

        console.log(this.#squares)
        this.resetBoard()
        // this.constructGUIBoard()
    }

    getSquares() {
        return this.#squares;
    }

    getSquare(x, y) {
        return this.#squares[y][x];
    }


    placePiece(piece, x, y) {
        this.#squares[y][x] = new Square(x, y, piece);
    }


    cleanBoard() {
        for (let index = 0; index < this.#squares.length; index++) {
            for (let j = 0; j < this.#squares.length; j++) {
                this.#squares[index][j] = new Square(index, j, PLACEHOLDER)
            }
        }
    }




    resetBoard() {
        for (let index = 2; index < this.#squares.length; index++) {
            for (let j = 0; j < this.#squares.length; j++) {
                this.#squares[index][j] = new Square(index, j, PLACEHOLDER)
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



}