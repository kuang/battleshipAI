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

//returns coordinate as an array of length 2 of highest probability.
function selectAttack() {
    var coord = [-1, -2];
    var max = 0;
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            if (probs[i][j] >= max) {
                max = probs[i][j];
                coord[0] = i;
                coord[1] = j;
            }
        }
    }
    return coord;

}
//updates probabilities of each square
function updateProbs() {
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            probs[i][j] = updateCoordProb(i, j);
        }
    }
}

/*
 * Probability function. Returns the probability (0-100) that there is a ship in the given tile.
 */
function updateCoordProb(x, y) {

    var output = 1 / (Math.abs((7.5 - x) * (7.5 - y)));
    output *= 100;




    return output;
}


setSampleBoard();
updateProbs();
printBoard(shipGrid);
console.log(selectAttack());
