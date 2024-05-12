const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

input.shift();
input = input.map(e => e.split(' ').map(Number));

function solution(input) {
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const visited = Array.from({ length : input.length }, () => Array.from({ length : input[0].length }, () => 0));

    const isAble = (y, x) => y >= 0 && x >= 0 && y < input.length && x < input[0].length;

    const dfs = (y, x, num) => {
        if(y === input.length - 1 && x === input[0].length - 1) return 1; // 목적지 도착
        if(visited[y][x] !== 0) return visited[y][x]; // 이미 방문한 곳이면

        let count = 0;
        dirs.forEach(([dy, dx]) => {
            const ny = y + dy;
            const nx = x + dx;

            if(isAble(ny, nx) && visited[ny][nx] !== -1 && input[ny][nx] < num) { // 다음으로 갈 수 있으면
                count += dfs(ny, nx, input[ny][nx]);
            }
        })
        count === 0 ? visited[y][x] = -1 : visited[y][x] = count;
        // console.log(visited);
        return count;
    }

    dfs(0, 0, input[0][0]);

    console.log(visited[0][0] === -1 ? 0 : visited[0][0]);
}

solution(input);
