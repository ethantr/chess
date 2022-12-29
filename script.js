





var game = new Game();  
game.initialise(new Player(BLACK),new Player(WHITE));

gui = new GUIBoard(game.getBoard())
game.nextTurn()
console.log(game.playTurn(new Player(BLACK),1,0,2,2));
gui.constructGUIBoard(gui.board)
