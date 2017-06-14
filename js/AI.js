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
    return 5;
  } else if (battleship && !tbattleship) {
    battleship = false;
    console.log("battleship sunk");
    return 4;
  } else if (destroyer && !tdestroyer) {
    destroyer = false;
    console.log("destroyer sunk");
    return 3;
  } else if (submarine && !tsubmarine) {
    submarine = false;
    console.log("submarine sunk");
    return 3;
  } else if (gunboat && !tgunboat) {
    gunboat = false;
    console.log("gunboat sunk");
    return 2;
  }
  return -1;
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
      output += board[i][j] + "     ";
    }
    output += "\n";
  }
  console.log(output);
}

function updateUI(board) {
  var table = document.getElementById("grid");
  var r = 0;
  while ((row = table.rows[r++])) {
    var c = 0;
    while ((cell = row.cells[c++])) {
      if (board[r - 1][c - 1] === "+") {
        cell.innerHTML = " ";
      } else if (board[r - 1][c - 1] === "I") {
        cell.innerHTML = "X";
      } else {
        cell.innerHTML = board[r - 1][c - 1];
      }
    }
  }
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
      if (shipGrid[i][j] !== "X" && shipGrid[i][j] !== "O" && shipGrid[i][j] !== "I") {
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
      probs[i][j] = updateCoordProb(i + 1, j + 1);
    }
  }
}

/* Probability function. Returns the probability (0-100) that there is a ship in the given tile. */
function updateCoordProb(x, y) {
  //accounting for x, y coordinate
  var neighboring = checkNeighbors(x - 1, y - 1);
  var output = neighboring[0];
  if (neighboring[1] == true) {
    return output + 10;
  } else {
    //if both x and y are even, increase probability- checkerboard grid is goal
    if ((x + 3) % 2 == 0 && (y + 3) % 2 == 0) {
      output += 5;
    }
    output +=
      (Math.pow(x - (board_len + 1) / 2, 2) + Math.pow(y - (board_len + 1) / 2, 2)) * 0.01;
  }
  return output;
}

/* returns coordinates of unique sunk ship if only one possible sunk ship configuration is possible, false otherwise.
 * param: x,y coordinates, length of sunk ship
 */
function findUniqueSunkShip(x, y, search_length) {
  var counter = 0; //number of possible configurations. must == 1 to return true.
  var output = [];
  var h_domain = rangeFinder(search_length, x);
  var y_range = rangeFinder(search_length, y);
  console.log(h_domain);
  if (x - h_domain[0] + 1 === search_length) {
    console.log("possible above");
    //if ship existance is possible
    var num_hits = [];
    for (var i = h_domain[0]; i <= x; i++) {
      if (shipGrid[i][y] == "X") {
        num_hits.push([i, y]);
      }
    }
    if (num_hits.length == search_length) {
      counter++;
      output.push(num_hits);
    }
  }
  if (h_domain[1] - x + 1 === search_length) {
    console.log("possible below");
    //if ship existance is possible
    var num_hits = [];
    for (var i = x; i <= h_domain[1]; i++) {
      if (shipGrid[i][y] == "X") {
        num_hits.push([i, y]);
      }
    }
    console.log("second param, counter is " + counter);
    console.log("num_hits is " + num_hits);
    if (num_hits.length == search_length) {
      if (counter > 0) {
        return [];
      }
      counter++;
      output.push(num_hits);
    }
  }
  if (y - y_range[0] + 1 === search_length) {
    console.log("possible left");
    //if ship existance is possible
    var num_hits = [];
    for (var i = y_range[0]; i <= y; i++) {
      if (shipGrid[x][i] == "X") {
        num_hits.push([x, i]);
      }
    }
    if (num_hits.length == search_length) {
      if (counter > 0) {
        return [];
      }
      counter++;
      output.push(num_hits);
    }
  }
  if (y_range[1] - y + 1 === search_length) {
    console.log("possible right");
    //if ship existance is possible
    var num_hits = [];
    for (var i = y; i <= y_range[1]; i++) {
      if (shipGrid[x][i] == "X") {
        num_hits.push([x, i]);
      }
    }
    if (num_hits.length == search_length) {
      if (counter > 0) {
        return [];
      }
      counter++;
      output.push(num_hits);
    }
  }
  console.log(counter);
  if (counter === 1) {
    return output[0];
  }
  return [];
}

/*
 * Given a list of coordinates, turn those coordinates from "X" to "I" (for ignore) on shipGrid.
 */
function devalueSunkShip(coords) {
  console.log("coords is " + coords);

  for (var i = 0; i < coords.length; i++) {
    console.log(coords[i][0]);
    shipGrid[coords[i][0]][coords[i][1]] = "I";
  }
}
//returns inverse weighted number of previous hits adjacent (to min number)
/*
hit numclose away = 1/numclose points
hit numclose-1 away = 1/numclose-1 points, etc
*/
function checkNeighbors(x, y) {
  var numclose = updateNum(); //range to consider, 2-5
  var output = 0;
  var isImmediateNeighbor = false;
  var x_params = rangeFinder(numclose, x);
  var y_params = rangeFinder(numclose, y);

  //searchs are inclusive of [0] and [1]
  for (var i = x_params[0]; i <= x_params[1]; i++) {
    if (shipGrid[i][y] === "X" && i != x) {
      //if it is a hit
      if (Math.abs(x - i) == 1) {
        isImmediateNeighbor = true;
      }
      output += 1 / Math.abs(x - i);
    }
  }
  for (var i = y_params[0]; i <= y_params[1]; i++) {
    if (shipGrid[x][i] === "X" && i != y) {
      //if it is a hit
      if (Math.abs(y - i) == 1) {
        isImmediateNeighbor = true;
      }
      output += 1 / Math.abs(y - i); //less distance = higher output
    }
  }
  return [output, isImmediateNeighbor];
  //use numclose
  //checks in horizontal and vertical directions numclose blocks away
}
//returns tuple of starting and ending points, bounded by walls and the maxnum
function rangeFinder(maxnum, x) {
  maxnum--; //search is inclusive of starting position
  var left = Math.max(0, x - maxnum);
  var right = Math.min(board_len - 1, x + maxnum);
  return [left, right];
}

setSampleBoard();
// setPieceVert("C", 8, 4, 2);

updateProbs();
// updateHit(4, 6);
// updateHit(8, 3);
// updateHit(8, 4);
// updateHit(8, 5);
// updateHit(8, 6);
// updateHit(4, 2);
// updateHit(3, 2);
// updateHit(2, 2);
// updateHit(1, 2);
// updateHit(5, 2);
// updateHit(6, 2);
// updateHit(7, 2);
// updateHit(0, 2);
//
// updateHit(7, 9);
// console.log(findUniqueSunkShip(4, 2, 5));
// printBoard(shipGrid);
// updateUI(shipGrid);
// console.log(checkNeighbors(9, 9));
// console.log(checkNeighbors(4, 5));

// console.log(selectAttack());

function callback(a) {
  var coord = selectAttack();
  console.log(coord);
  console.log(probs[7][8]);

  updateHit(coord[0], coord[1]);
  var temp = updateVars();
  if (temp != -1) { //updateVars() returns the length of sunk ship if one is sunk, -1 if none are sunk
    var sunk_coords = findUniqueSunkShip(coord[0], coord[1], temp);
    if (sunk_coords.length != 0) { //findUniqueSunkShip returns list of coordinates of ship if only unique one exists, empty list otherwise
      // console.log("sunk ship coords of length" + temp + " are " + sunk_coords);
      devalueSunkShip(sunk_coords);
    }
  }

  updateUI(shipGrid);
  updateProbs();
  // printBoard(shipGrid);
  // printBoard(probs);
}

var id = setInterval(function () {
  if (carrier || battleship || destroyer || submarine || gunboat) {
    callback(shipGrid);
  } else {
    clearInterval(id);
    // console.log(findUniqueSunkShip(3, 6, 2));
  }
}, 200);