export class Board {
  constructor(player, { rows, cols }) {
    this.activePlayer = player;
    this.rows = rows;
    this.cols = cols;
    this.board = Array.from({ length: rows })
      .map((_, i) => "R" + i)
      .map(row => Array.from({ length: cols }).map((_, i) => row + " C" + i));
  }
  occupySlot({ colIndex }) {
    //  traverse each row of the column
    let rowIndex = this.board.length - 1;
    while (rowIndex >= 0) {
      console.log(
        "checking row: " + rowIndex + " of column " + colIndex,
        this.isAlreadyOccupied(rowIndex, colIndex)
      );
      if (!this.isAlreadyOccupied(rowIndex, colIndex)) {
        this.board[rowIndex][colIndex] = this.activePlayer.marker;
        return;
      }
      rowIndex--;
    }
  }
  setActivePlayer(player) {
    this.activePlayer = player;
  }
  getBoard() {
    return this.board;
  }
  isAlreadyOccupied(rowIndex, colIndex) {
    return Boolean(AVAILABLE_MARKERS.includes(this.board[rowIndex][colIndex]));
  }
}
export class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }
}

export const BLUE_MARKER = "BLUE";
export const RED_MARKER = "RED";
const AVAILABLE_MARKERS = [BLUE_MARKER, RED_MARKER];
