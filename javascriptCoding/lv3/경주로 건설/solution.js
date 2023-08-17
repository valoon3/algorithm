const board = [[0,0,0],[0,0,0],[0,0,0]]; // result 900
// const board = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]; // result 3800
// const board = [[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]]; // result 2100
// const board = [[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]] // 3200

function solution(board) {
    const startPoint = [0, 0];
    const pointPrice = board.map((row) => row.map(() => Infinity));
    const N = board.length-1;
    pointPrice[0][0] = 0;

    const bfs = (point, price= 0, direction = '') => {
        const directionPrice = function(price, direction, newDirection) {
            return direction === newDirection || direction === '' ? price + 100 : price + 600;
        }

        if(point[1] > 0 && board[point[0]][point[1]-1] !== 1) { // left
            const newPrice = directionPrice(price, direction, 'left');
            if(newPrice <= pointPrice[point[0]][point[1]-1]) {
                pointPrice[point[0]][point[1]-1] = newPrice;
                bfs([point[0], point[1] - 1], newPrice, 'left')
            };
        }
        if(point[1] < board.length - 1 && board[point[0]][point[1]+1] !== 1) { // right
            const newPrice = directionPrice(price, direction, 'right');
            if(newPrice <= pointPrice[point[0]][point[1]+1]){
                pointPrice[point[0]][point[1]+1] = newPrice;
                bfs([point[0], point[1]+1], newPrice, 'right');
            }
        }
        if(point[0] > 0  && board[point[0] - 1][point[1]] !== 1) { // up
            const newPrice = directionPrice(price, direction, 'up');
            if(newPrice <= pointPrice[point[0] - 1][point[1]]){
                pointPrice[point[0] - 1][point[1]] = newPrice;
                bfs([point[0] - 1, point[1]], newPrice, 'up');
            }
        }
        if(point[0] < board.length - 1  && board[point[0] + 1][point[1]] !== 1) { // down
            const newPrice = directionPrice(price, direction, 'down');
            if(newPrice <= pointPrice[point[0] + 1][point[1]]){
                pointPrice[point[0] + 1][point[1]] = newPrice;
                bfs([point[0] + 1, point[1]], newPrice, 'down');
            }
        }
    }

    bfs(startPoint);

    return pointPrice[N][N];
}

// 최적의 정답지
const solution2 = function(board) {
    const N = board.length;
    const dirs = [
        [0, 1],  // right
        [0, -1], // left
        [1, 0],  // up
        [-1, 0], // down
    ];

    const q = [
        [0,0,0,0],
        [0,0,1,0]
    ];

    // const dp = [];
    //
    // for(let i = 0; i < N; i ++) {
    //     const temp = [];
    //     for(let j = 0; j < N; j ++) {
    //         temp.push(Infinity);
    //     }
    //     dp.push(temp);
    // }

    const dp = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Array(dirs.length).fill(Infinity))
    );

    // console.log(dp);


    const isInBoard = (x, y) => x >= 0 && x < N && y >= 0 && y < N && board[x][y] !== 1;

    while (q.length) {
        const [x, y, pDirI, cost] = q.shift();

        dirs.forEach(([dx, dy], nDirI) => {
            const [nx, ny] = [x + dx, y + dy];
            if (!isInBoard(nx, ny)) return;

            const newCost = cost + (pDirI === nDirI ? 100 : 600);

            if (newCost < dp[nx][ny][nDirI]) {
                dp[nx][ny][nDirI] = newCost;
                q.push([nx, ny, nDirI, newCost]);
            }
        });
    }

    console.log(dp);
    console.log(dp[N-1][N-1]);

    return Math.min(...dp[N-1][N-1]);
}

// console.log(solution(board));
console.log(solution2(board));

// const test = Array.from({ length: 3 }, () => Array.from({length: 3}, () => Infinity));
// console.log(test);