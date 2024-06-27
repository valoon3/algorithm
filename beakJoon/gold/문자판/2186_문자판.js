const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m, k] = input[0].split(' ').map(Number);
    const map = input.slice(1, 1 + n).map(t => t.split(''));
    const target = input[input.length - 1].split('');
    const visited = Array.from({ length : n }, () => Array.from({ length : m }, () => Array.from({ length : target.length }, () => -1)));
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const moveAble = (y, x) => y >= 0 && x >= 0 && y < map.length && x < map[0].length;
    let result = 0;

    const dfs = (y, x, index) => {
        if(visited[y][x][index] !== -1) {
            return visited[y][x][index];
        }

        if(index === target.length - 1) {
            visited[y][x][index] = 1;
            return 1;
        }

        let count = 0;

        for(const [dy, dx] of dirs) {
            for(let i = 1; i <= k; i ++) {
                const [ny, nx] = [y + dy * i, x + dx * i];
                if(!moveAble(ny, nx)) continue;
                // if(visited[ny][nx] !== -1) continue;
                if(map[ny][nx] !== target[index+1]) continue;
                count += dfs(ny, nx, index + 1);
            }
        }

        visited[y][x][index] = count;
        return count;
    }

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(map[i][j] === target[0]) result += dfs(i, j, 0);
        }
    }

    console.log(result);
}

solution(input);