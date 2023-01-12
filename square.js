const BOARD_SIZE = 8;

class Square {
    #piece
    #x
    #y
    constructor(x, y, piece) {
        this.setPiece(piece)
        this.setY(y)
        this.setX(x)
    }
    
    isOffBoard(){
        return this.getX() >= BOARD_SIZE || this.getX() < 0 || this.getY() < 0 || this.getY() >= BOARD_SIZE
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

    isVacant() {
        return this.getPiece() === PLACEHOLDER
    }

    getPiece() {
        return this.#piece;
    }
}