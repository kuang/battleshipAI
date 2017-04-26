package battleshipAI;

public class Board {

	/*
	 * The game board is represented as a n*n 2d array.
	 */

	// size of the board is 16*16
	
	//2d array is int[rows][columns]
	private static int[][] values;
	private int[][] carrierCoords;
	private int[][] battleshipCoords;
	private int[][] destroyerCoords;
	private int[][] submarineCoords;
	private int[][] gunboatCoords;
	
	//booleans true if ship is still alive
	private boolean carrier = true;
	private boolean battleship = true;
	private boolean cruiser = true;
	private boolean submarine = true;	
	private boolean gunboat = true;

	public Board() {
		values = new int[16][16];
		for (int[] row : values) {
			for (int num : row) {
				num = 0;
			}
		}
		carrierCoords = new int[5][2];
		battleshipCoords = new int[4][2];
		destroyerCoords = new int[3][2];
		submarineCoords = new int[3][2];
		gunboatCoords = new int[2][2];
	}

	public void printBoard() {
		System.out.println(20);
		for (int[] row : values) {
			System.out.println("");
			for (int num : row) {
				System.out.print(num + " ");
			}
		}
	}
	//creates sample board for testing
	private void setSampleBoard(){
		setPieceVert(carrierCoords,5,1,2);
		setPieceHoriz(battleshipCoords,12,9,12);
		
	}
	//precondition: startRow > endRow 
	private void setPieceVert(int[][] piece, int startRow, int endRow, int col){
		for(int i = 0; i<piece.length; i++){
			piece[i][0]=startRow-i;
			piece[i][1]=col;
			values[startRow-i][col]=1;
		}
		
	}
	//precondition: startCol > endCol 
		private void setPieceHoriz(int[][] piece, int startCol, int endCol, int row){
			for(int i = 0; i<piece.length; i++){
				piece[i][0]=row;
				piece[i][1]=startCol-i;
				values[row][startCol-i]=1;
			}
			
		}

	public static void main(String[] args) {
		Board board = new Board();
		board.setSampleBoard();
		board.printBoard();

	}
}
