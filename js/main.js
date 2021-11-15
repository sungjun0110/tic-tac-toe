/*----- constants -----*/

// This loockup object will be used to populate the board with the corresponding color
const lookup = {
    '1': 'purple',
    '-1': 'lime',
    null: 'white'
}

const winningCombinations = [
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 4, 8],
    [2, 4, 6]
];


/*----- app's state (variables) -----*/

// this board constant represents our gameboard, with each element representing a call on the board.
// winner value will dictate whether there is a winner or not
// turn value will dictate who's turn it is
let board, winner, turn;


/*----- cached element references -----*/

let tableEl = document.querySelector('table');
const headerEl = document.querySelector('h1');
const squares = document.querySelectorAll('td div');
const buttonEl = document.querySelector('button');


/*----- event listeners -----*/

buttonEl.addEventListener('click', init);


/*----- functions -----*/

//  Calling the init function will start our game of tic-tac-toe
init();

function init() {
    board = [ null, null, null, null, null, null, null, null, null ];
    turn = 1;
    winner = null;
    tableEl.addEventListener('click', handleTurn);
    render();
}

function render() {
    headerEl.innerText = lookup[turn] + "'s turn";
    
    // forEach has access to the index number of the current element in the iteration
    board.forEach(function( tile, idx ) {
        squares[idx].style.backgroundColor = lookup[tile];
    });

    // Check if a winning message needs to be displayed
    if ( winner === "tie" ) {
        headerEl.innerText = "It's a cat's game!";
    } else if ( winner ) {
        headerEl.innerText = lookup[winner] + " has won this game";
    }
}

function checkWin() {
    winningCombinations.forEach(( combo ) => {
        if ( Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3 ) {
            winner = turn;
            tableEl.removeEventListener('click', handleTurn);
        };
        if ( !winner && !board.includes(null) ) {
            winner = 'tie';
        }
    });
}

function handleTurn( evt ) {
    const idx = evt.target.id.replace('sq', '');
    if (!board[idx]) {
        board[idx] = turn;
        checkWin();
        turn *= -1;
        render();
    }
}