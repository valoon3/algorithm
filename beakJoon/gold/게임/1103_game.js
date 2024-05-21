const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [r, c] = input.shift().split(' ').map(Number);
    const board = input.map((v) => v.split(''));
    const isAble = (y, x) => y >= 0 && y < r && x >= 0 && x < c;
    const dp = Array.from(Array(r), () => Array(c).fill(0));
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let answer = 0;
    const visited = Array.from(Array(r), () => Array(c).fill(false));

    const dfs = (y, x) => {
        if(!isAble(y, x) || board[y][x] === 'H') return 0;
        if(visited[y][x]) return Infinity;
        if(dp[y][x] !== 0) return dp[y][x];

        visited[y][x] = true;

        for(let [dy, dx] of dirs) {
            const ny = y + dy * +board[y][x];
            const nx = x + dx * +board[y][x];
            dp[y][x] = Math.max(dp[y][x], dfs(ny, nx) + 1);
        }
        visited[y][x] = false;

        return dp[y][x];
    }

    const result = dfs(0, 0);

    if (result === Infinity) console.log(-1);
    else console.log(result);
}

solution(input);