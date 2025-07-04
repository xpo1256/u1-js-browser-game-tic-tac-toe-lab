/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
function init (){
    board = ["","","","","","","","",""];
    turn = "X";
    winner= false;
    tie = false; 
    console.log("int");
    render();
}

function render (){
    updateBoard();
    updateMessage();
}

function updateBoard(){
    for (let i=0 ; i < board.length ; i++){
        squareEls[i].textContent = board[i];
    }
}

function updateMessage(){
    if( winner === false && tie === false){
        messageEl.textContent =  `player ${turn}`;
    }else if(winner === false && tie === true){
        messageEl.textContent = 'it is tie';
    }else{
        messageEl.textContent = `the winner is ${turn}`;
    }
}

function handleclick(event){
    const si = parseInt(event.target.id);
    placePiece(si);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece (index) {
    board [index] = turn;
}

function checkForWinner(){
        for(i=0 ; i< winningCombos.length;i++){
            [a,b,c] = winningCombos[i];
            if(board [a] !== '' && board [a] === board [b] && board[a] === board[c]){
                winner=true;
                return;
            }
        }
}

function checkForTie(){
    if(winner){
        return;
    }else if(board.includes("")){
        tie = false;
    }else{
        tie = true;
    }
}

function switchPlayerTurn(){
    if(winner){
        return;
    }else if(turn === 'X'){
        turn = 'O';
    }else{
        turn = 'X';
    }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square =>{
    square.addEventListener('click', handleclick);
})


init();
