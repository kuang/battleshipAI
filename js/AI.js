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

var shipGrid = matrix(16, 16, 0);
var probs = matrix(16, 16, 0);
var hits = matrix(16, 16, 0);

var carrier = true;
var battleship = true;
var destroyer = true;
var submarine = true;
var gunboat = true;


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


printBoard(shipGrid);
