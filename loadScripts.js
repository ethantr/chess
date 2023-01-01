function loadScripts(){
    var directory = 'pieces/';
    var extension = '.js';
    var files = ['piece','pawn', 'king', 'queen','bishop','knight','rook'];  
    for (var file of files){ 
        var path = directory + file + extension; 
        var script = document.createElement("script");
        script.src = path;
        document.head.appendChild(script);
    } 
  }

  loadScripts();
  