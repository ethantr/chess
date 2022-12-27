class Square {
    #piece
    #x
    #y
    constructor(x, y, piece) {
        this.setPiece(piece)
        this.setY(y)
        this.setX(x)
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setY(y) {
        this.#y = y
    }
    setX(x) {
        this.#x = x;
    }

    setPiece(piece) {
        this.#piece = piece;
    }

    getPiece() {
        return this.#piece;
    }
}