
const GameBoard = (() => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    let turn = 0;

    return {
        board
    };
})();


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


const PlayerFactory = (symbol) => {
    return {
        symbol
    };
};



const player1 = PlayerFactory('X');
const player2 = PlayerFactory('O');

const displayBoard = document.querySelector('#board');
const displayTiles = displayBoard.querySelectorAll('.board-tile');

DisplayController.renderBoard(GameBoard.board);
