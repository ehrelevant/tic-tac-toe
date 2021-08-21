
const GameBoard = (() => {
    gameBoard = [
        'X', 'X', 'X',
        'X', 'X', 'O',
        'O', 'O', 'O'
    ];

    return {
        gameBoard
    };
})();

const PlayerFactory = (symbol) => {
    return {
        symbol
    };
}


const player1 = PlayerFactory('X');
console.log(player1.symbol);
console.log(GameBoard.gameBoard);



const displayBoard = document.querySelector('#board');
const displayTiles = displayBoard.querySelectorAll('.board-tile');

function updateDisplayBoard() {
    const gameBoard = GameBoard.gameBoard;
    for(let i = 0; i < gameBoard.length; i++){
        displayTiles[i].textContent = gameBoard[i];
    }
}

updateDisplayBoard();