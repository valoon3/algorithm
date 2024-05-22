const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [N, M] = input.shift().split(' ').map(Number);
    const map = input.map((row) => row.split(''));
    const visited = Array.from(Array(N), () => Array(M).fill(0));
    const dirs = {
        'U': [-1, 0],
        'D': [1, 0],
        'L': [0, -1],
        'R': [0, 1]
    };
    let answer = 0;

    // 0 : 방문하지 않은 곳
    // 1 : 방문한 곳
    // 2 : 사이클을 이룬 곳
    const dfs = (y, x) => {
        if(visited[y][x] === 2) return 2;
        if(visited[y][x] === 1) {
            answer ++;
            return 2;
        }

        // visited[y][x] === 0
        visited[y][x] = 1;
        const [dy, dx] = dirs[map[y][x]];
        const [ny, nx] = [y + dy, x + dx];

        dfs(ny, nx);

        visited[y][x] = 2;

        return 0;
    }

    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            dfs(i, j);
        }
    }

    console.log(answer);
}

solution(input);
