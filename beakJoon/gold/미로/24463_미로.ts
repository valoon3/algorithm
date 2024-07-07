const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m] : [number, number] = input[0].split(' ').map(Number);
    const map : string[][] = input.slice(1).map(t => t.split('').map(v => {
        if(v === '.') return '@';
        return v;
    }));

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const startOrEnd = (y, x) => map[y][x] === '@' && (x === 0 || y === 0 || x === m - 1 || y === n - 1);
    const moveAble = (y, x) => x >= 0 && y >= 0 && y < n && x < m && map[y][x] === '@'

    const dfs = (y: number, x: number) : boolean => {
        map[y][x] = '.';

        let result = false;

        for(const [dy, dx] of dirs) {
            if(result === true) break;
            const [ny, nx] = [y + dy, x + dx];

            if(startOrEnd(ny, nx)) {
                map[ny][nx] = '.';
                return result = true;
            }
            else {
                if(!moveAble(ny, nx)) continue;
                else result = result || dfs(ny, nx);
            }
        }

        if(!result) map[y][x] = '@';


        return result;
    }

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(startOrEnd(i, j)) dfs(i, j);
        }
    }

    map.map(row => console.log(row.join('')));
}

solution(input);