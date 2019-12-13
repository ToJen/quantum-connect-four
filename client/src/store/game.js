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
  setActivePlayer(player) {
    this.activePlayer = player;
  }
  getBoard() {
    return this.board;
  }
  isAlreadyOccupied(rowIndex, colIndex) {
    return (
      this.board[rowIndex][colIndex] === BLUE_MARKER ||
      this.board[rowIndex][colIndex] === RED_MARKER
    );
  }
  isFull() {
    return this.filledCells === this.rows * this.cols;
  }

  applyQuantumGate(gate) {
    for (let i = 0; i < gate.length; i++) {
      if (gate.charAt(i) === "0") {
        const posRemove = this.superPositions[i][1].position;
        this.board[posRemove.R][posRemove.C] = ""

        const posKeep = this.superPositions[i][0].position;
        this.updateColour(this.board[posKeep.R][posKeep.C])
      } else {
        const posRemove = this.superPositions[i][0] = position;
        this.board[posRemove.R][posRemove.C] = ""

        const posKeep = this.superPositions[i][1] = position;
        this.updateColour(this.board[posKeep.R][posKeep.C])
      }
    }

    console.log(superPositions);

    for (let i = 0; i < this.board.length; i++) { // traverse row
      let row = this.board[i];
      for (let j = 0; j < row.length; j++) { // traverse cols
        this.occupySlot(j)
      }
    }

    this.filledCells = (this.board.rows * this.board.cols) - (2 * this.superPositions.length)
    this.superPositions = []
  };

  updateColour(r, c) {
    if (this.board[r][c].includes(BLUE_MARKER)) {
      this.board[r][c] = BLUE_MARKER
    } else {
      this.board[r][c] = RED_MARKER
    }
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
