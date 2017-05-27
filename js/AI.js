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

var carrier = true; //C
var battleship = true; //B
var destroyer = true; //D
var submarine = true; //S
var gunboat = true; //G

//returns range to consider for possible ships
function updateNum() {
  var check_num = 5;

  if (gunboat) {
    check_num = 2;
  }
  if (destroyer || submarine) {
    check_num = 3;
  }
  if (battleship) {
    check_num = 4;
  }
  if (carrier) {
    check_num = 5;
  }
  return check_num;
}
//scans the board for ships sunk
function updateVars() {
  var tcarrier = false;
  var tbattleship = false;
  var tdestroyer = false;
  var tsubmarine = false;
  var tgunboat = false;
  for (var i = 0; i < board_len; i++) {
    for (var j = 0; j < board_len; j++) {
      if (carrier && !tcarrier && shipGrid[i][j] == "C") {
        tcarrier = true;
      }
      if (battleship && !tbattleship && shipGrid[i][j] == "B") {
        tbattleship = true;
      }
      if (destroyer && !tdestroyer && shipGrid[i][j] == "D") {
        tdestroyer = true;
      }
      if (submarine && !tsubmarine && shipGrid[i][j] == "S") {
        tsubmarine = true;
      }
      if (gunboat && !tgunboat && shipGrid[i][j] == "G") {
        tgunboat = true;
      }
    }

  }
  if (carrier && !tcarrier) {
    carrier = false;
    console.log("carrier sunk");
  } else if (battleship && !tbattleship) {
    battleship = false;
    console.log("battleship sunk");
  } else if (destroyer && !tdestroyer) {
    destroyer = false;
    console.log("destroyer sunk");
  } else if (submarine && !tsubmarine) {
    submarine = false;
    console.log("submarine sunk");
  } else if (gunboat && !tgunboat) {
    gunboat = false;
    console.log("gunboat sunk");
  }
}
//called after ever single attack
function updateHit(x, y) {
  if (shipGrid[x][y] != "+") {
    shipGrid[x][y] = "X";

  } else {
    shipGrid[x][y] = "O";
  }
}


//board is a 2d array
function printBoard(board) {

  var output = "";
  for (var i = 0; i < board.length; i++) {
    // console.log("\n");
    // console.log("");
    for (var j = 0; j < board[i].length; j++) {
      output += board[i][j] +
        "     ";
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
      if (shipGrid[i][j] !== "X" && shipGrid[i][j] !== "O") {
        if (probs[i][j] >= max) {
          max = probs[i][j];
          coord[0] = i;
          coord[1] = j;
        }
      }

    }
  }
  return coord;

}
//updates probabilities of each square
function updateProbs() {
  for (var i = 0; i < board_len; i++) {
    for (var j = 0; j < board_len; j++) {
      probs[i][j] = updateCoordProb(i +
        1, j +
        1);
    }
  }
}

/* Probability function. Returns the probability (0-100) that there is a ship in the given tile. */
function updateCoordProb(x, y) {

  //accounting for x, y coordinate
  var output = (Math.pow(x - ((board_len +
      1) / 2), 2) +
    Math.pow(y - ((board_len +
      1) / 2), 2));

  //account for nearby hits

  return output;
}

//returns weighted number of previous hits adjacent (to min number)
/* 
hit numclose away = numclose points
hit numclose-1 away = numclose-1 points, etc
*/
//
function checkNeighbors(x, y) {
  var numclose = updateNum(); //range to consider, 2-5
  var output = 0;


  return output;
  //use numclose
  //checks in horizontal and vertical directions numclose blocks away

}
//returns tuple of starting and ending points, bounded by left/right walls and the maxnum
function left_right_x(maxnum, x) {
  var left = Math.max(0, x - maxnum);
  var right = Math.min(board_len, x + maxnum);
  return [left, right];
}

// setSampleBoard();
// updateProbs();
// printBoard(shipGrid);
// // console.log(selectAttack());
// while (carrier || battleship || destroyer || submarine || gunboat) {
//   var coord = selectAttack();
//   console.log(coord);
//   updateHit(coord[0], coord[1]);
//   updateVars();
//   printBoard(shipGrid);
// }

console.log(left_right_x(5, 2)[0], left_right_x(5, 2)[1]);