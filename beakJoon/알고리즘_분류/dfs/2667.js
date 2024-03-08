function solution(input) {
    const n = input[0];
    input = input.slice(1);
    const map = input.map(row => row.split('').map(v => Number(v)));
    const dirs = [[0,1], [1,0], [-1, 0], [0, -1]];
    const visitedMap = Array.from({ length: n }, () => Array(n).fill(false));

    const moveAble = (y, x) => y >= 0 && y < n && x >= 0 && x < n;

    let dfsResult = 0;

    const dfs = (y, x) => {
        map[y][x] = 0;
        dfsResult ++;

        for(let [dy, dx] of dirs) {
            if(moveAble(y + dy, x + dx) && map[y + dy][x + dx] === 1) {
                dfs(y + dy, x + dx, result);
            }
        }

        return result[0];
    }

    const result = [];

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < n; j ++) {
            if(map[i][j] === 1 && !visitedMap[i][j]) {
                dfs(i,j);
                result.push(dfsResult);
                dfsResult = 0;
            }
        }
    }

    result.sort((a, b) => a - b);
    console.log(
        result.length + "\n" + `${result.sort((a, b) => a - b).join("\n")}`
    );
}

const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        solution(input);
        process.exit();
    });