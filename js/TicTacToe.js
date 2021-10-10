class TicTacToe {

    maxRow = null; // Max row in game
    maxCol = null;  // Max col in game
    maxPlayer = null; // Max player in game
    currentPlayer = 1; // the current player turn
    board = []; // the game cells
    totalMove = 0; // total move in the game, being used to check if the game draw
    playerWin = null; // will contain the winner player

    constructor(maxPlayer, totalRow, totalCol) {
        this.initBoard(maxPlayer, totalRow, totalCol);
    }

    initBoard(maxPlayer, totalRow, totalCol) {
        this.maxPlayer = maxPlayer;
        this.maxRow = totalRow;
        this.maxCol = totalCol;
        for (let row = 0; row < totalRow; ++row) {
            this.board[row] = [];
            for (let col = 0; col < totalCol; ++col) {
                this.board[row][col] = null;
            }
        }
    }

    playerMove(row, col) {
        if (row >= 0 && row < this.maxRow && col >= 0 && col < this.maxCol && this.board[row][col] == null) {
            // Set Move
            this.board[row][col] = this.currentPlayer;
            this.totalMove += 1;

            // Get winner
            const playerWin = this.checkWinner(row, col)

            // No one win
            if (playerWin < 0) {
                this.changePlayerTurn();
                return -1;
            }
            // Someone win or draw
            else {
                this.playerWin = playerWin;
                return playerWin;
            }
        }
    }

    changePlayerTurn() {
        this.currentPlayer = this.currentPlayer + 1 > this.maxPlayer ? 1 : this.currentPlayer + 1;
    }

    checkWinner(currentRow, currentCol) {
        //check straight line in column
        for (let i = 0; i < this.maxCol; i++) {
            if (this.board[currentRow][i] != this.currentPlayer) {
                break;
            }
            if (i == this.maxCol - 1) {
                return this.currentPlayer;
            }
        }

        //check straight line in row
        for (let i = 0; i < this.maxRow; i++) {
            if (this.board[i][currentCol] != this.currentPlayer) {
                break;
            }
            if (i == this.maxRow - 1) {
                return this.currentPlayer;
            }
        }

        //check straight line in diagonal
        if (currentCol == currentRow) {
            for (let i = 0; i < this.maxRow; i++) {
                if (this.board[i][i] != this.currentPlayer) {
                    break;
                }
                if (i == this.maxRow - 1) {
                    return this.currentPlayer;
                }
            }
        }

        //check straight line in reverse diagonal
        if (currentCol + currentRow == this.maxCol - 1) {
            for (let i = 0; i < this.maxCol; i++) {
                if (this.board[i][(this.maxCol - 1) - i] != this.currentPlayer) {
                    break;
                }
                if (i == this.maxCol - 1) {
                    return this.currentPlayer;
                }
            }
        }

        //check draw
        if (this.totalMove == (this.maxRow * this.maxCol)) {
            return 0;
        }
        // Game continue
        else {
            return -1;
        }
    }

}