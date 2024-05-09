const { ALPN_ENABLED } = require('constants');
const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input.shift());
const K = Number(input.shift());
let route = [];
// 북 동 남 서
const diraction = [ [-1,0], [0,1], [1,0], [0,-1] ];

let apples = [];
for (let i = 0; i < K; i++) {
    apples.push(input.shift().split(' '));
}
apples = apples.map(x => x.map(y => Number(y)));

let commands = [];
const L = input.shift();
for (let i = 0; i < L; i++) {
    let temp = input.shift().trim().split(' ');
    commands[i] = {
        time: Number(temp[0]),
        diraction: temp[1]
    };
}

let board = new Array(N+2);
for(let i=0; i<N+2; i++){
    board[i] = new Array(N+2).fill(0);
}
board[1][1] = 's';

for(let i=0; i<N+2; i++){
    board[i][0] = 1;
    board[i][N+1] = 1;
    board[0][i] = 1;
    board[N+1][i] = 1;
}

for(let i=0; i<apples.length; i++){
    board[apples[i][0]][apples[i][1]] = 'a';
}

let snake = {
    'diraction' : 1,
    'head' : [1,1],
    'tail' : [1,1]
};

let gameTime = 0;
let nextCommand = commands[0].time;
while(1){
    let nextY = snake.head[0] + diraction[snake.diraction][0];
    let nextX = snake.head[1] + diraction[snake.diraction][1];

    // 뱀이 이리저리 기어다니다가 벽 또는 자기자신의 몸과 부딪히면 게임이 끝난다.
    if(board[nextY][nextX] === 1 || board[nextY][nextX] === 's'){
        //console.log('gameEnd');
        // console.log(board);
        //console.log(nextY, nextX);
        //console.log(board[nextY][nextX]);
        //console.log(snake.diraction);
        break;
    }
    else{
        // 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는 움직이지 않는다.
        if(board[nextY][nextX] === 'a'){
            //console.log('apple!');
            // 사과가 없어진다.
            board[nextY][nextX] = 's';

            // 뱀의 이동경로를 기록한다.
            route.push([nextY,nextX]);

            // 뱀의 머리가 이동한다.
            snake.head[0] = nextY;
            snake.head[1] = nextX;
        }
        // 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다. 즉, 몸길이는 변하지 않는다.
        else if(board[nextY][nextX] === 0){
            //console.log(nextY, nextX);
            // 뱀의 머리를 이동시킨다.
            snake.head[0] = nextY;
            snake.head[1] = nextX;
            board[snake.head[0]][snake.head[1]] = 's';

            // 뱀의 이동경로를 기록한다.
            route.push([nextY,nextX]);

            // 뱀의 꼬리가 있던 자리를 비운다.
            board[snake.tail[0]][snake.tail[1]] = 0;

            // 뱀의 꼬리를 이동시킨다.
            let nextXY = route.shift();
            snake.tail[0] = nextXY[0];
            snake.tail[1] = nextXY[1];
        }
    }
    gameTime++;
    // 1초가 지났다.

    // 방향 전환 정보에 따라서 움직인다.
    if(gameTime === nextCommand){
        if(commands[0].diraction === 'D'){
            //console.log('turn Right')
            snake.diraction = (snake.diraction + 1) % 4;
        }
        else if(commands[0].diraction === 'L'){
            //console.log('turn Left')
            if(snake.diraction - 1 < 0)
                snake.diraction = 3;
            else
                snake.diraction = (snake.diraction - 1) % 4;
        }
        commands.shift();
        if(commands.length === 0)
            nextCommand = 0;
        else
            nextCommand = commands[0].time;
    }
}
console.log(gameTime+1);