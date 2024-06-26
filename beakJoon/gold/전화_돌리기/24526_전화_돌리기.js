const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m] = input[0].split(' ').map(Number);
    const edges = input.slice(1, 1 + m).map(t => t.split(' ').map(Number));
    const graph = Array.from({ length : n + 1 }, () => []);

    // -1 미방문 1 방문 2 방문 확정 3 순환노드
    const visited = Array.from({ length : n + 1 }, () => -1);

    for(const [start, end] of edges) {
        graph[start].push(end);
    }
    for(let i = 1; i <= n; i ++) {
        graph[0].push(i);
    }

    const dfs = (index) => {
        if(visited[index] === 1 || visited[index] === 3) {
            visited[index] = 3;
            return 3; // 순환
        }

        if(visited[index] === 2) {
            return 2; // 확정
        }

        visited[index] = 1;

        let status = 2;

        for(const next of graph[index]) {
            status = Math.max(status, dfs(next));
        }

        visited[index] = status;
        return status;
    }

    dfs(0);
    visited[0] = 3;
    let count = 0;
    for(const status of visited) {
        if(status === 2) count ++;
    }
    // console.log(visited);
    console.log(count);
}

solution(input);