const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [N, M] = input.shift().split(' ').map(Number);
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const map = input.map(v => v.split(' ').map(Number));
    const isAble = (y, x) => y >= 0 && y < N && x >= 0 && x < M;
    let answer = 0;

    // -1 : 방문하지 않음    방문했다면 방문한 카운트 인덱스
    const visited = Array.from({length: N}, () => Array(M).fill(-1));

    const dfs = (y, x, obj) => {
        visited[y][x] = obj;
        obj.value ++;

        for(let i = 0; i < 4; i ++) {
            const [ny, nx] = [y + dirs[i][0], x + dirs[i][1]];
            if(isAble(ny, nx) && map[ny][nx] === 1 && visited[ny][nx] === -1) {
                dfs(ny, nx, obj);
            }
        }
    }

    for(let i = 0; i < N; i ++) {
        for(let j = 0; j < M; j ++) {
            if(map[i][j] === 1 && visited[i][j] === -1) {
                const obj = { value : 0 };
                dfs(i, j, obj);
            }
        }
    }

    for(let i = 0; i < N; i ++) {
        for(let j = 0 ; j < M; j ++) {
            if(visited[i][j] === -1) {
                const set = new Set();

                for(let k = 0; k < 4; k ++) {
                    const [ny, nx] = [i + dirs[k][0], j + dirs[k][1]];
                    if(isAble(ny, nx) && visited[ny][nx] !== -1) {
                        set.add(visited[ny][nx]);
                    }
                }

                const arr = [...set];
                answer = Math.max(answer, arr.reduce(((pre, cur) => pre += cur.value), 0) + 1);
            }
        }
    }

    console.log(answer);
}

solution(input);