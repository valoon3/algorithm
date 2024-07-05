const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n = +input[0];
    const edges = input.slice(1, n).map(t => t.split(' ').map(Number));
    const graph = Array.from({ length : n + 1 }, () => []);

    for(const [a, b, dist] of edges) {
        graph[a].push([b, dist]);
        graph[b].push([a, dist]);
    }

    const dfs = (index, answer= Infinity, visited = -1) => {
        if(graph[index].length === 1) return answer;

        let sum = 0;

        for(const [next, cost] of graph[index]) {
            if(next !== visited) sum += dfs(next, cost, index);
        }

        return Math.min(sum, answer);
    }

    const result = dfs(1);
    console.log(result);
}

solution(input);