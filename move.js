class Move {

    #player
    #start //square of start position
    #end // square of end position
    #piece_moved
    #piece_killed
    #castle_move

    constructor(player, start, end) {
        this.setPlayer(player);
        this.setStartPosition(start)
        this.setEndPosition(end)
        this.setPieceMoved(start.getPiece());
    }

    setPlayer(player) {
        this.#player = player;
    }

    setPieceMoved(move_piece) {
        this.#piece_moved = move_piece;
    }

    setStartPosition(start) {
        this.#start = start;
    }

    setEndPosition(end) {
        this.#end = end;
    }

    getPlayer() {
        return this.#player;
    }

    getStart() {
        return this.#start
    }

    getEnd() {
        return this.#end;
    }

    pieceToMove() {
        return this.#piece_moved
    }

    isCastleMove() {
        return this.#castle_move;
    }

    setIsCastle(castle) {
        this.#castle_move = castle;
    }

    setPieceKilled(killed) {
        this.#piece_killed = killed;
    }

    getPieceKilled() {
        return this.#piece_killed;
    }

    // constructor(player, start, end, piece_moved, piece_killed) {
    //     this.setPlayer(player);
    //     this.setStartPosition(start);
    //     this.setEndPosition(end);
    //     this.setPieceMoved(piece_moved);
    //     this.setPieceKilled(piece_killed);
    // }
}