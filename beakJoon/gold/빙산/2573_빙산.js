const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

input.shift();

function solution(input) {
    let map = input.map(e => e.split(' ').map(Number));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const isAble = (y, x) => y >= 0 && x >= 0 && y < map.length && x < map[0].length;
    const zeroCount = (y, x, map) => {
        let count = 0;
        dirs.forEach(([dy, dx]) => {
            const ny = y + dy;
            const nx = x + dx;

            if(isAble(ny, nx) && map[ny][nx] === 0) {
                count++;
            }
        })
        return count;
    }
    let result = 0;

    const melt = (map) => {
        const newMap = Array.from({ length: map.length }, () => Array.from({ length : map[0].length }, () => 0));
        for(let i = 0; i < map.length; i ++) {
            for(let j = 0; j < map[0].length; j ++) {
                if(map[i][j] !== 0) {
                    let count = zeroCount(i, j, map);
                    newMap[i][j] = map[i][j] - count < 0 ? 0 : map[i][j] - count;
                }
            }
        }
        return newMap;
    }

    const search = (map) => {
        let count = 0;
        const visited = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => false));
        const dfs = (y, x) => {
            visited[y][x] = true;
            dirs.forEach(([dy, dx]) => {
                const ny = y + dy;
                const nx = x + dx;
                if(isAble(ny, nx) && map[ny][nx] !== 0 && !visited[ny][nx]) {
                    dfs(ny, nx);
                }
            })
        }

        for(let i = 0; i < map.length; i ++) {
            for(let j = 0; j < map[0].length; j ++) {
                if(map[i][j] !== 0 && !visited[i][j]) { // 빙산이 있고 방문하지 않았다면
                    dfs(i, j);
                    count ++;
                }
            }
        }

        return count;
    }

    while(true) {
        const count = search(map);
        if(count >= 2) {
            break;
        }
        if(count === 1) {
            map = melt(map);
            result ++;
        }
        if(count === 0) {
            result = 0;
            break;
        }
    }

    console.log(result);
}

solution(input);