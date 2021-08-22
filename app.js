
const Game = (() => {
    let _turn = 0;
    let _players = [];

    function addPlayers(...players) {
        _players.push(...players);
    }

    function getCurrentPlayer() {
        return _players[_turn % _players.length];
    }

    function nextTurn() {
        _turn++;
    }

    return {
        addPlayers, getCurrentPlayer, nextTurn
    };
})();


const GameBoard = (() => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    function markTile(ind) {
        if (!_isFilledTile(ind)) {
            const curPlayer = Game.getCurrentPlayer();
            board[ind] = curPlayer.symbol;

            DisplayController.renderBoard(board);
            Game.nextTurn();
        }
    }


    function _isFilledTile(tileInd) {
        return board[tileInd] !== '';
    }


    return {
        board, markTile
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

Game.addPlayers(player1, player2);

const displayBoard = document.querySelector('#board');
const displayTiles = displayBoard.querySelectorAll('.board-tile');

DisplayController.renderBoard(GameBoard.board);
