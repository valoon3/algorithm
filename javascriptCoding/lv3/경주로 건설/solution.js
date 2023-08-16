// const board = [[0,0,0],[0,0,0],[0,0,0]]; // result 900
const board = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]; // result 3800
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

console.log(solution(board));