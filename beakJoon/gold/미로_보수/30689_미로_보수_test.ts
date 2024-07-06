import * as fs from "fs";
import * as process from "node:process";

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m]: [number, number] = input[0].split(' ').map(Number);
    const map : Array<Array<string>> = input.slice(1, n + 1).map(t => t.split(''));
    const costMap: Array<Array<number>> = input.slice(n + 1, n + n + 2).map(t => t.split(' ').map(Number));
    const mapState: Array<Array<number>> = Array.from({ length : n }, () => Array.from({ length : m }, () => -1));

    const moveAble = (y, x) => y >= 0 && x >= 0 && y < n && x < m;

    const dirs = (d: string): [number, number] => {
        if(d === 'L') return [0, -1];
        if(d === 'R') return [0, 1];
        if(d === 'U') return [-1, 0];
        return [1, 0];
    }

    const dfs = (y: number, x: number) : [number, number] => {
        mapState[y][x] = 1;
        const [dy, dx] = dirs(map[y][x]);
        const [ny, nx] = [y + dy, x + dx];

        // 탈출
        if (!moveAble(ny, nx) || mapState[ny][nx] === 3) {
            mapState[y][x] = 3;
            return [3, 0];
        }

        if (mapState[ny][nx] === -1) {
            const [state, cost] = dfs(ny, nx);

            if (state === 3) {
                mapState[y][x] = 3;
                return [state, cost];
            }
            if (state === 2) {
                mapState[y][x] = 3;
                return [2, Math.min(cost, costMap[y][x])];
            }
        }

        if (mapState[ny][nx] === 1) {
            mapState[ny][nx] = 2;
            mapState[y][x] = 3;

            return [2, costMap[y][x]];
        }

        // if(mapState[ny][nx] === 3) {
        mapState[y][x] = 3;
        return [3, 0];
        // }
    }

    let answer = 0;

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(mapState[i][j] === -1) {
                const [_, num] = dfs(i, j);
                answer += num;
            }
        }
    }

    // console.log(mapState);
    console.log(answer);
}

solution(input);