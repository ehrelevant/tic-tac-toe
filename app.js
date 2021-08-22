
const GameBoard = (() => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    let _turn = 0;
    let _players = [];

    function addPlayers(...players) {
        _players.push(...players);
    }

    function markTile(ind) {
        const curPlayer = _players[_turn % _players.length]
        board[ind] = curPlayer.symbol;

        DisplayController.renderBoard(board);
        _turn++;
    }

    return {
        board, addPlayers, markTile
    };
})();


const PlayerFactory = (name, symbol) => {
    return {
        name, symbol
    };
};


const DisplayController = (() => {
    function renderBoard(board) {
        for(let i = 0; i < board.length; i++){
            displayTiles[i].textContent = board[i];
        }
    }

    return {
        renderBoard
    };
})();


const player1 = PlayerFactory('P1', 'X');
const player2 = PlayerFactory('P2', 'O');

GameBoard.addPlayers(player1, player2);

const displayBoard = document.querySelector('#board');
const displayTiles = displayBoard.querySelectorAll('.board-tile');

DisplayController.renderBoard(GameBoard.board);
