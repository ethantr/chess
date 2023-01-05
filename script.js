




var game = new Game(); 
black = new Player(BLACK)
white = new Player(WHITE); 
game.initialise(black,white);
gui = new GUIBoard(game)
// game.nextTurn()
// console.log(game.playTurn(new Player(BLACK),1,0,2,2));
// game.nextTurn()
// console.log(game.playTurn(new Player(BLACK),4,0,7,0));
console.log(game.playTurn(white,0,6,0,4))
game.playTurn(black,1,1,1,3)
gui.constructGUIBoard()



window.addEventListener("keydown", event => {
    if (event.key == "r") {
      gui.constructGUIBoard();
      console.log("refreshed board.")
      var playerTurnElement = document.getElementsByClassName('player-turn');

    }
  });


  