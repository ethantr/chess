var game = new Game(); 
black = new Player(BLACK)
white = new Player(WHITE); 
game.initialise(black,white);
gui = new GUIBoard(game)



//Debug
window.addEventListener("keydown", event => {
    if (event.key == "r") {
      gui.constructGUIBoard();
      console.log("refreshed board.")
      game.updateStatus()
    }
  });


  