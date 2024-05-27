const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [N, M] = input.shift().split(' ').map(Number);
    const dirs = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1]
    }
    const map = input.map(v => v.split(''));
    const isAble = (y, x) => y >= 0 && y < N && x >= 0 && x < M;

    // 0 : 방문하지 않음, 1 : 방문했으나 탈출 불가능, 2 : 방문했으며 탈출 가능 3: 지금 방문
    const dp = Array.from({length: N}, () => Array(M).fill(0));
    let answer = 0;

    const dfs = (y, x) => {
        if(dp[y][x] === 1) return false;
        if(dp[y][x] === 2) return true;
        if(dp[y][x] === 3) {
            return false;
        }

        dp[y][x] = 3;

        const dir = map[y][x];
        const [dy, dx] = dirs[dir];
        const [ny, nx] = [y + dy, x + dx];

        if(isAble(ny, nx) === false) {
            dp[y][x] = 2;
            return true;
        } else {
            const result = dfs(ny, nx);
            if(result === true) {
                dp[y][x] = 2;
                return true;
            } else {
                dp[y][x] = 1;
                return false;
            }
        }
    }

    for(let i = 0; i < N; i ++) {
        for(let j = 0; j < M; j ++) {
            dfs(i, j) ? answer ++ : answer;
        }
    }

    console.log(answer);
}

solution(input);