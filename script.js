

var pos = new Square(1,1,new Queen(WHITE));
var pos2 = new Square(1,1,new Pawn(WHITE));
console.log(pos)
console.log(pos2)
console.log(pos.getPiece().canMove(1,pos,pos2))