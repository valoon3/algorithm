const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
input.shift();

function solution(input) {
    const dirs = [[-1, 1], [0, 1], [1, 1]];
    let answer = 0;
    const visited = Array.from({ length: input.length }, () => Array(input[0].length).fill(false));
    const isAble = (y, x) => y >= 0 && x >= 0 && y < input.length && x < input[0].length;

    const dfs = (y, x) => {
        visited[y][x] = true;

        if (x === input[0].length - 1) {
            answer++;
            return 'done';
        }

        let result = 'not done';

        for (let i = 0; i < 3; i++) {
            const [ny, nx] = [y + dirs[i][0], x + dirs[i][1]];

            if(result === 'done') break;

            if (isAble(ny, nx) && visited[ny][nx] === false && input[ny][nx] === '.') {
                result = dfs(ny, nx);
            }
        }

        return result;
    }

    for(let i = 0; i < input.length; i++) {
        dfs(i, 0);
    }

    console.log(answer);
}

solution(input);