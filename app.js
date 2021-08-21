
const GameBoard = (() => {
    gameBoard = [
        ['X', 'X', 'X'],
        ['X', 'X', 'O'],
        ['O', 'O', 'O']
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