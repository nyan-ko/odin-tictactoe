const Game = (function() {
    let board = [];
    let winner = "";
    const reset = function() {
        for (let i = 0; i < 3; i++) {
            board[i] = ['', '', ''];
        }
    }

    const markTile = function(x, y, type) {
        if (winner) {
            return winner;
        }

        if (board[x][y] === '') {
            board[x][y] = type;
        }
        else {
            return "invalid";
        }

        let won = _checkWin(x, y);
        if (won) {
            winner = type;
            return winner;
        }
        return "";
    }

    const getGrid = function() {
        if (board) {
            return board;
        }
        reset();
        return board;
    }

    const _checkWin = function(x, y) {
        let val = board[x][y];
        let win = false;
        if (x === y || x === 0 && y === 2 || x === 2 && y === 0) {
            win = false || _diagonalCheck(val);
        }

        win = win || _columnCheck(x, val) || _rowCheck(y, val);
        return win;
    }

    const _diagonalCheck = function(val) {
        return (board[0][0] === val && board[1][1] === val && board[2][2] === val) ||
        (board[0][2] === val && board[1][1] === val && board[2][0] === val);
    }

    const _columnCheck = function(x, val) {
        for (let i = 0; i < 3; i++) {
            if (board[x][i] !== val) {
                return false
            }
        }
        return true;
    }

    const _rowCheck = function(y, val) {
        for (let i = 0; i < 3; i++) {
            if (board[i][y] !== val) {
                return false
            }
        }
        return true;
    }

    return {
        reset, markTile, getGrid
    }
})();