
const Game = (() => {
    let _turn = 0;
    let _players = [];
    let _gameEnded = false;

    function _addPlayers(...players) {
        _players.push(...players);
    }

    function getCurrentPlayer() {
        return _players[_turn % _players.length];
    }

    function nextTurn() {
        _turn++;
    }

    function catchMark(evt) {
        // This method may need to be removed later due to being an event
        if (!_gameEnded) {
            const curPlayer = getCurrentPlayer();
            const ind = evt.target.dataset['ind'];
            GameBoard.markTile(ind, curPlayer.symbol);

            if (GameBoard.testBoard(curPlayer.symbol)) {
                _winGame(curPlayer);
                _gameEnded = true;
            } else if (_turn > 8) {
                _tieGame();
                _gameEnded = true;
            }
        }
    }

    function _winGame(winner) {
        DisplayController.showOverlay(`${winner.name} wins!`);
    }

    function _tieGame() {
        DisplayController.showOverlay('Tie! Nobody wins!');
    }

    function resetGame() {
        _turn = 0;
        _gameEnded = false;
        GameBoard.createBoard();
    }

    function changePlayerForm(playerInfo) {
        _players = [];

        const name1 = playerInfo['playerName1'].value
        const type1 = playerInfo['playerType1'].value
        const symbol1 = 'X'

        const name2 = playerInfo['playerName2'].value
        const type2 = playerInfo['playerType2'].value
        const symbol2 = 'O'

        const player1 = PlayerFactory(name1, symbol1);
        const player2 = PlayerFactory(name2, symbol2);

        _addPlayers(player1, player2);

        resetGame();
    }

    return {
        getCurrentPlayer, nextTurn,
        catchMark, resetGame, changePlayerForm
    };
})();


const GameBoard = (() => {
    let _board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    let _sideLen = 3;
    let _totalLen = _board.length;

    function createBoard(sideLength = 3) {
        _sideLen = sideLength;
        _totalLen = sideLength ** 2;
        _board = (new Array(_totalLen)).fill('');
        DisplayController.renderBoard(_board);
    }

    function markTile(ind, symbol) {
        if (!_isFilledTile(ind)) {
            _board[ind] = symbol;

            DisplayController.renderBoard(_board);
            Game.nextTurn();
        }
    }

    function _isFilledTile(tileInd) {
        return _board[tileInd] !== '';
    }

    function testBoard(symbol) {
        // Checks were not hard-coded to allow for the sake of board-size flexibility
        return (_testRows(symbol) || _testColumns(symbol) || _testDiagonals(symbol));
    }

    function _testRows(testSymbol) {
        for (let y = 0; y < _sideLen; y++) {
            let row = _board.slice((y * _sideLen), ((y + 1) * _sideLen))
            if (row.every((symbol) => (symbol === testSymbol))){
                return true;
            }
        }
        return false;
    }

    function _testColumns(testSymbol) {
        for (let x = 0; x < _sideLen; x++) {
            // While ".filter()" is a more common approach,
            // using a "for..."" loop to get the columns is more (time + space) efficient
            // Notice: O(n^2) vs O(mn); where m >> n

            let col = [];
            for (let i = x; i < _totalLen; i += _sideLen) {
                col.push(_board[i]);
            }
            if (col.every((symbol) => (symbol === testSymbol))){
                return true;
            }
        }
        return false;
    }

    function _testDiagonals(testSymbol) {
        let diagonal1 = [];
        for (let i = 0; i < _totalLen; i += (_sideLen + 1)) {
            diagonal1.push(_board[i])
        }
        if (diagonal1.every((symbol) => (symbol === testSymbol))){
            return true;
        }

        let diagonal2 = [];
        for (let i = (_sideLen - 1); i < _totalLen - 1; i += (_sideLen - 1)) {
            diagonal2.push(_board[i])
        }
        if (diagonal2.every((symbol) => (symbol === testSymbol))){
            return true;
        }

        return false;
    }

    return {
        createBoard, markTile, testBoard
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

    const _overlay = document.querySelector('#win_overlay');
    const _winText = _overlay.querySelector('#win_text');
    function showOverlay(resultText) {
        _winText.textContent = resultText;
        _overlay.classList.remove('hidden');
    }

    function hideOverlay() {
        _overlay.classList.add('hidden');
    }

    return {
        renderBoard, showOverlay, hideOverlay
    };
})();

const displayBoard = document.querySelector('#board');
const displayTiles = displayBoard.querySelectorAll('.board-tile');

displayBoard.addEventListener('click', Game.catchMark, true)

const restartBtn = document.querySelector('#restart_button');
restartBtn.addEventListener('click', Game.resetGame);

const playerSettings = document.forms['settingsForm'];
playerSettings.addEventListener('change', () => (Game.changePlayerForm(playerSettings)));

const closeOverBtn = document.querySelector('#overlay_button');
closeOverBtn.addEventListener('click', DisplayController.hideOverlay);


Game.changePlayerForm(playerSettings);