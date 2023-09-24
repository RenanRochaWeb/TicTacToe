export interface Cell {
  isPlayed: boolean;
  player: string;
  positionX: number;
  positionY: number;
}

export default class Board {
  public size: number = 3;

  //return an array for the board made of Cells
  build(): Cell[][] {
    const board: Cell[][] = [];

    for (let x = 0; x < this.size; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < this.size; y++) {
        const cell: Cell = {
          isPlayed: false,
          player: "None",
          positionX: x,
          positionY: y,
        };
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }

  //Update a Cell after play
  setCell(player: string, x: number, y: number, grid: Cell[][]): Cell[][] {
    const updatedGrid: Cell[][] = grid;
    updatedGrid[x][y] = {
      isPlayed: true,
      player: player,
      positionX: x,
      positionY: y,
    };
    return updatedGrid;
  }

  // Check if all cells in a line match
  private checkLine(a: string, b: string, c: string): boolean {
    return a !== "None" && a === b && a === c;
  }

  //Game win logic
  checkWin(grid: Cell[][]): boolean {
    // 1 1 1
    // 1 1 0
    // 1 0 1
    if (grid[0][0].isPlayed === true) {
      if (
        this.checkLine(grid[0][0].player, grid[1][0].player, grid[2][0].player)
      ) {
        return true;
      } else if (
        this.checkLine(grid[0][0].player, grid[1][1].player, grid[2][2].player)
      ) {
        return true;
      } else if (
        this.checkLine(grid[0][0].player, grid[0][1].player, grid[0][2].player)
      ) {
        return true;
      }
    }

    // 0 0 1
    // 0 0 1
    // 1 1 1
    if (grid[2][2].isPlayed === true) {
      if (
        this.checkLine(grid[2][0].player, grid[2][1].player, grid[2][2].player)
      ) {
        return true;
      }
      if (
        this.checkLine(grid[0][2].player, grid[1][2].player, grid[2][2].player)
      ) {
        return true;
      }
    }

    // 0 1 0
    // 0 1 0
    // 0 1 0
    if (grid[1][0].isPlayed === true) {
      if (
        this.checkLine(grid[1][0].player, grid[1][1].player, grid[1][2].player)
      ) {
        return true;
      }
    }

    // 0 0 0
    // 1 1 1
    // 0 0 0
    if (grid[0][1].isPlayed === true) {
      if (
        this.checkLine(grid[0][1].player, grid[1][1].player, grid[2][1].player)
      ) {
        return true;
      }
    }

    // 0 0 1
    // 0 1 0
    // 1 0 0
    if (grid[2][0].isPlayed === true) {
      if (
        this.checkLine(grid[2][0].player, grid[1][1].player, grid[0][2].player)
      ) {
        return true;
      }
    }

    return false;
  }

  //If board full and no win yet return draw
  checkDraw(grid: Cell[][]): boolean {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (grid[x][y].isPlayed === false) {
          return false;
        }
      }
    }
    return true;
  }
}
