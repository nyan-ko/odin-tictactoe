const Board = (function() {
    let board = [];
    let winner = "";
    let players = ['X', 'O']
    let currentPlayer = true;

    const reset = function() {
        for (let i = 0; i < 3; i++) {
            board[i] = ['', '', ''];
        }
    }

    const getGrid = function() {
        if (board) {
            return board;
        }
        reset();
        return board;
    }

    const getCurrentPlayerType = function() {
        return players[+currentPlayer];
    }

    const playerMarkTile = function(x, y) {
        won = _markTile(+x, +y, getCurrentPlayerType());
        if (!won) {
            _alternatePlayer()
        }
        else {
            alert(won + " has won.")
        }
    }

    const _markTile = function(x, y, type) {
        if (winner) {
            return winner;
        }

        if (board[x][y] === '') {
            board[x][y] = type;
        }
        else {
            return "invalid";
        }

        if (_checkWin(x, y)) {
            winner = type;
            return winner;
        }
    }

    const _alternatePlayer = function() {
        currentPlayer = !currentPlayer;
    }

    const _checkWin = function(x, y) {
        let val = board[x][y];
        let win = false;
        if (x === y || (x === 0 && y === 2) || (x === 2 && y === 0)) {
            win = _diagonalCheck(val);
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
        reset, getGrid, playerMarkTile, getCurrentPlayerType
    }
})();

let grid = document.querySelector(".ttt");
Board.reset();

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("data-x", x);
        square.setAttribute("data-y", y);
        square.addEventListener('click', onClick)
        grid.appendChild(square);
    }
}

function onClick(e) {
    let x = this.getAttribute('data-x');
    let y = this.getAttribute('data-y');
    
    Board.playerMarkTile(x, y)
    updateVisualAfterTurn(this, x, y)
}

function updateVisualAfterTurn(square, x, y) {
    square.innerText = Board.getGrid()[x][y]
}