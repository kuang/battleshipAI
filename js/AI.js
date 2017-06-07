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
//if a ship is sunk, returns true, otherwise false
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
    return true;
  } else if (battleship && !tbattleship) {
    battleship = false;
    console.log("battleship sunk");
    return true;
  } else if (destroyer && !tdestroyer) {
    destroyer = false;
    console.log("destroyer sunk");
    return true;
  } else if (submarine && !tsubmarine) {
    submarine = false;
    console.log("submarine sunk");
    return true;
  } else if (gunboat && !tgunboat) {
    gunboat = false;
    console.log("gunboat sunk");
    return true;
  }
  return false;
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
  var firstline = "      ";
  for (var i = 0; i < board.length; i++) {
    j = i;
    if (board == probs) {
      firstline += j.toFixed(3) + "     ";
    } else {
      firstline += j + "     ";
    }
  }
  console.log(firstline);
  for (var i = 0; i < board.length; i++) {
    k = i;
    if (k < 10) {
      output += k + "     ";
    } else {
      output += k + "    ";

    }

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
        1).toFixed(3);
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
  output *= 0.01;
  // var output = 0;
  output += checkNeighbors(x - 1, y - 1);
  //account for nearby hits

  return output;
}

//returns inverse weighted number of previous hits adjacent (to min number)
/* 
hit numclose away = 1/numclose points
hit numclose-1 away = 1/numclose-1 points, etc
*/
//
function checkNeighbors(x, y) {
  var numclose = updateNum(); //range to consider, 2-5
  var output = 0;
  var x_params = left_right_x(numclose, x);
  var y_params = top_bot_y(numclose, y);

  //searchs are inclusive of [0] and [1]
  for (var i = x_params[0]; i <= x_params[1]; i++) {
    if (shipGrid[i][y] === "X" && i != x) { //if it is a hit
      output += 1 / Math.abs(x - i);
    }
  }
  for (var i = y_params[0]; i <= y_params[1]; i++) {
    if (shipGrid[x][i] === "X" && i != y) { //if it is a hit
      output += 1 / (Math.abs(y - i)); //less distance = higher output
    }
  }
  return output;
  //use numclose
  //checks in horizontal and vertical directions numclose blocks away

}
//returns tuple of starting and ending points, bounded by left/right walls and the maxnum
function left_right_x(maxnum, x) {
  maxnum--; //search is inclusive of starting position
  var left = Math.max(0, x - maxnum);
  var right = Math.min(board_len - 1, x + maxnum);
  return [left, right];
}
//returns tuple of starting and ending points, bounded by top/bottom walls and the maxnum
function top_bot_y(maxnum, y) {
  maxnum--; //search is inclusive of starting position
  var top = Math.max(0, y - maxnum);
  var bot = Math.min(board_len - 1, y + maxnum);
  return [top, bot];
}
setSampleBoard();
updateProbs();
// updateHit(4, 6);
// updateHit(8, 5);
// updateHit(4, 2);
// updateHit(0, 2);
// updateHit(7, 9);

// printBoard(shipGrid);
// console.log(checkNeighbors(9, 9));
// console.log(checkNeighbors(4, 5));

// console.log(selectAttack());
while (carrier || battleship || destroyer || submarine || gunboat) {
  var coord = selectAttack();
  console.log(coord);
  updateHit(coord[0], coord[1]);
  if (updateVars()) {


  }
  updateProbs();
  printBoard(shipGrid);
  printBoard(probs);
}


// console.log(left_right_x(5, 2)[0], left_right_x(5, 2)[1]);