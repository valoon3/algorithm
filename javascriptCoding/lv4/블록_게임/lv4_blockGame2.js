const board = [
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0],[0,0,0,0,0,4,4,0,0,0],[0,0,0,0,3,0,4,0,0,0],[0,0,0,2,3,0,0,0,5,5],[1,2,2,2,3,3,0,0,0,5],[1,1,1,0,0,0,0,0,0,5]
];

class Block {
    constructor() {
        this.block = [];
    }
}

class Game {
    constructor(board) {
        this.board = board;

        for(let i = 0; i < board.length; i ++) {
            for(let j = 0; j < board[0].length; j ++) {

            }
        }


    }
}

function solution(board) {

}

console.log(solution(board));
