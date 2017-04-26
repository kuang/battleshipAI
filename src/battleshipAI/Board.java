package battleshipAI;

public class Board {

	/*
	 * The game board is represented as a n*n 2d array.
	 */

	// size of the board is 16*16
	private static int[][] values;
	private int[][] carrierCoords;
	private int[][] battleshipCoords;
	private int[][] cruiserCoords;
	private int[][] submarineCoords;
	private int[][] destroyerCoords;

	public Board() {
		values = new int[16][16];
		for (int[] row : values) {
			for (int num : row) {
				num = 0;
			}
		}
		carrierCoords = new int[5][2];
		battleshipCoords = new int[4][2];
		cruiserCoords = new int[5][2];
		submarineCoords = new int[5][2];
		destroyerCoords = new int[5][2];
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

	public static void main(String[] args) {
		Board board = new Board(10);
		board.printBoard();

	}
}
