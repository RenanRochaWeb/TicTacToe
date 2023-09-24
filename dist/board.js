export default class Board {
    size = 3;
    build() {
        const board = [];
        for (let x = 0; x < this.size; x++) {
            const row = [];
            for (let y = 0; y < this.size; y++) {
                const cell = {
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
    setCell(player, x, y, grid) {
        const updatedGrid = grid;
        updatedGrid[x][y] = {
            isPlayed: true,
            player: player,
            positionX: x,
            positionY: y,
        };
        return updatedGrid;
    }
    // Check if all cells in a line match
    checkLine(a, b, c) {
        return a !== "None" && a === b && a === c;
    }
    //Game win logic
    checkWin(grid) {
        // 1 1 1
        // 1 1 0
        // 1 0 1
        if (grid[0][0].isPlayed === true) {
            if (this.checkLine(grid[0][0].player, grid[1][0].player, grid[2][0].player)) {
                return true;
            }
            else if (this.checkLine(grid[0][0].player, grid[1][1].player, grid[2][2].player)) {
                return true;
            }
            else if (this.checkLine(grid[0][0].player, grid[0][1].player, grid[0][2].player)) {
                return true;
            }
        }
        // 0 0 1
        // 0 0 1
        // 1 1 1
        if (grid[2][2].isPlayed === true) {
            if (this.checkLine(grid[2][0].player, grid[2][1].player, grid[2][2].player)) {
                return true;
            }
            if (this.checkLine(grid[0][2].player, grid[1][2].player, grid[2][2].player)) {
                return true;
            }
        }
        // 0 1 0
        // 0 1 0
        // 0 1 0
        if (grid[1][0].isPlayed === true) {
            if (this.checkLine(grid[1][0].player, grid[1][1].player, grid[1][2].player)) {
                return true;
            }
        }
        // 0 0 0
        // 1 1 1
        // 0 0 0
        if (grid[0][1].isPlayed === true) {
            if (this.checkLine(grid[0][1].player, grid[1][1].player, grid[2][1].player)) {
                return true;
            }
        }
        // 0 0 1
        // 0 1 0
        // 1 0 0
        if (grid[2][0].isPlayed === true) {
            if (this.checkLine(grid[2][0].player, grid[1][1].player, grid[0][2].player)) {
                return true;
            }
        }
        return false;
    }
    //If board full and no win yet return draw
    checkDraw(grid) {
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
