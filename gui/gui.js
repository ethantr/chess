class GUI{


    #selectedStartPosition;
    #selectedEndPosition;

    guiBoard;

    constructor(game,board){
        this.game = game;
        this.guiBoard = new GUIBoard(board);
    }


    obtainSelectedSquare(){
        this.#selectedStartPosition = this.guiBoard.getSelectedSquare();
    }
}