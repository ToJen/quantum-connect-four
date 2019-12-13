export class Board {
  constructor(player, { rows, cols }) {
    this.activePlayer = player;
    this.rows = rows;
    this.cols = cols;
    this.board = Array.from({ length: rows })
      .map((_, i) => "R" + i)
      .map(row => Array.from({ length: cols }).map((_, i) => row + " C" + i));

    this.filledCells = 0;
    this.superPositions = []; // TODO
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
        this.filledCells++;
        return;
      }
      rowIndex--;
    }
  }
  isColAvailable(colIndex) {
    let rowIndex = this.board.length - 1;
    while (rowIndex >= 0) {
      if (!this.isAlreadyOccupied(rowIndex, colIndex)) {
        return true;
      }
      rowIndex--;
    }
    return false;
  }

  occupySlotWithSuperPosition({ superPositionCount, colIndex }) {
    //  traverse each row of the column
    let rowIndex = this.board.length - 1;
    while (rowIndex >= 0) {
      console.log(
        "checking row: " + rowIndex + " of column " + colIndex,
        this.isAlreadyOccupied(rowIndex, colIndex)
      );
      if (!this.isAlreadyOccupied(rowIndex, colIndex)) {
        this.board[rowIndex][colIndex] =
          this.activePlayer.marker + superPositionCount;
        this.filledCells++;
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
    return (
      this.board[rowIndex][colIndex].includes(BLUE_MARKER) ||
      this.board[rowIndex][colIndex].includes(RED_MARKER)
    );
  }
  isFull() {
    return this.filledCells === this.rows * this.cols;
  }

  hasPlayerWon() {
    let element;
    const checkRows = () => {
      for (let row = 0; row < this.board.length; row++) {
        for (let col = 0; col < this.board[row].length - 3; col++) {
          element = this.board[row][col];
          if (
            element == this.board[row][col + 1] &&
            element == this.board[row][col + 2] &&
            element == this.board[row][col + 3]
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const checkColumns = () => {
      for (let row = 0; row < this.board.length - 3; row++) {
        for (let col = 0; col < this.board[row].length; col++) {
          element = this.board[row][col];
          if (
            element == this.board[row + 1][col] &&
            element == this.board[row + 2][col] &&
            element == this.board[row + 3][col]
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const checkMainDiagonal = () => {
      for (let row = 0; row < this.board.length - 3; row++) {
        for (let col = 0; col < this.board[row].length - 3; col++) {
          element = this.board[row][col];
          if (
            element == this.board[row + 1][col + 1] &&
            element == this.board[row + 2][col + 2] &&
            element == this.board[row + 3][col + 3]
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const checkCounterDiagonal = () => {
      for (let row = 0; row < this.board.length - 3; row++) {
        for (let col = 3; col < this.board[row].length; col++) {
          element = this.board[row][col];
          if (
            element == this.board[row + 1][col - 1] &&
            element == this.board[row + 2][col - 2] &&
            element == this.board[row + 3][col - 3]
          ) {
            return true;
          }
        }
      }
      return false;
    };
    if (
      checkRows() ||
      checkColumns() ||
      checkMainDiagonal() ||
      checkCounterDiagonal()
    ) {
      return element;
    }
    return false;
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
