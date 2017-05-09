function matrix(rows, cols, defaultValue) {

    var arr = [];

    // Creates all lines:
    for (var i = 0; i < rows; i++) {

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push(new Array(cols));

        for (var j = 0; j < cols; j++) {
            // Initializes:
            arr[i][j] = defaultValue;
        }
    }

    return arr;
}

var shipGrid = matrix(16, 16, "+");
var probs = matrix(16, 16, 0);
var hits = matrix(16, 16, 0);

var carrier = true; //C
var battleship = true; //B
var destroyer = true; //D
var submarine = true; //S
var gunboat = true; //G


//board is a 2d array
function printBoard(board) {
    var output = "";
    for (var i = 0; i < board.length; i++) {
        // console.log("");
        // console.log("");
        for (var j = 0; j < board[i].length; j++) {
            output += board[i][j] + " ";
        }
        output += "\n";
    }
    console.log(output);
}
// creates sample board for testing
function setSampleBoard() {
    setPieceVert("C", 4, 0, 2);
    setPieceHoriz("B", 6, 3, 10);
    setPieceVert("D", 10, 8, 8);
    setPieceHoriz("S", 12, 10, 3);
    setPieceHoriz("G", 11, 10, 13);

}

// precondition: startRow > endRow
//startRow and endRow are inclusive
function setPieceVert(letter, startRow, endRow, col) {
    for (var i = 0; i <= startRow - endRow; i++) {
        shipGrid[startRow - i][col] = letter;
    }

}

// precondition: startCol > endCol
//startCol and endCol are inclusive
function setPieceHoriz(letter, startCol, endCol, row) {
    for (var i = 0; i <= startCol - endCol; i++) {
        shipGrid[row][startCol - i] = letter;
    }

}
setSampleBoard();
printBoard(shipGrid);
