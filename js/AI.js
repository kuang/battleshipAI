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
var board_len = 10;
var shipGrid = matrix(board_len, board_len, "+");
var probs = matrix(board_len, board_len, 0);
var hits = matrix(board_len, board_len, 0);

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
            output += board[i][j] + "     ";
        }
        output += "\n";
    }
    console.log(output);
}
// creates sample board for testing
function setSampleBoard() {
    setPieceVert("C", 4, 0, 2);
    setPieceHoriz("B", 6, 3, 8);
    setPieceVert("D", 4, 2, 6);
    setPieceHoriz("S", 9, 7, 3);
    setPieceHoriz("G", 9, 8, 7);

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
    for (var i = 0; i < board_len; i++) {
        for (var j = 0; j < board_len; j++) {
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
    for (var i = 0; i < board_len; i++) {
        for (var j = 0; j < board_len; j++) {
            probs[i][j] = updateCoordProb(i + 1, j + 1);
        }
    }
}

/*
 * Probability function. Returns the probability (0-100) that there is a ship in the given tile.
 */
function updateCoordProb(x, y) {


    //accounting for x, y coordinate
    var output = (Math.pow(x - ((board_len + 1) / 2), 2) + Math.pow(y - ((board_len + 1) / 2), 2));

    //account for nearby hits





    return output;
}

function checkNeighbors()[

]

setSampleBoard();
updateProbs();
printBoard(probs);
console.log(selectAttack());
// printBoard(probs);
var total = 0;
for (var i = 0; i < board_len; i++) {
    for (var j = 0; j < board_len; j++) {
        total += probs[i][j];
    }
}
console.log(total);
console.log(probs[0][0]);
console.log(probs[9][9]);
