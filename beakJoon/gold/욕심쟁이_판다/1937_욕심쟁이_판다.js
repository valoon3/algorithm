const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    input.shift();
    const map = input.map(e => e.split(' ').map(Number));
    const isAble = (y, x) => y >= 0 && x >= 0 && y < map.length && x < map[0].length;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let dp = Array.from({length: map.length}, () => Array.from({length: map[0].length}, () => -1));
    let answer = 1;

    const findManyThings = (y, x) => {
        if(dp[y][x] === -1) {
            dp[y][x] = 1;

            for(let i = 0; i < 4; i ++) {
                const ny = y + dirs[i][0];
                const nx = x + dirs[i][1];
                if (isAble(ny, nx) && map[y][x] < map[ny][nx]) {
                    dp[y][x] = Math.max(dp[y][x], findManyThings(ny, nx) + 1);
                }
            }
            // dirs.forEach(([dy, dx]) => {
            //     const ny = y + dy;
            //     const nx = x + dx;
            //     if (isAble(ny, nx) && map[y][x] < map[ny][nx]) {
            //         dp[y][x] = Math.max(dp[y][x], findManyThings(ny, nx) + 1);
            //     }
            // })
        }

        return dp[y][x];
    }


    for(let i = 0; i < map.length; i ++) {
        for(let j = 0; j < map[0].length; j ++) {
            answer = Math.max(answer, findManyThings(i, j));
        }
    }

    console.log(answer);
}

solution(input);