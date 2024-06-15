const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [n, m] = input[0].split(' ').map(Number);
    const edges = input.slice(1, m + 1).map(t => t.split(' ').map(Number));
    const sCount = +input[m + 1];
    const s = input[m + 2].split(' ').map(Number);
    return [n, m, edges, sCount, s];
}

function solution(n, m, edges, sCount, s) {
    const graph = Array.from({ length : n + 1 }, () => []);
    const visited = Array.from({ length : n + 1 }, () => 0);
    let answer = 'Yes';

    for(let i = 0; i < sCount; i ++) {
        const fanIndex =  s[i];
        visited[fanIndex] = -1;
    }

    for(let [start, end] of edges) {
        graph[start].push(end);
    }

    const dfs = (index) => {
        if(visited[index] === -1) return;
        if(graph[index].length === 0) {
            answer = 'yes';
            return;
        }
        // visited[index] = 1;

        for(const next of graph[index]) {
            dfs(next);
        }
    }

    dfs(1);

    console.log(answer);
}

const [n, m, edges, sCount, s] = filter(input);
solution(n, m, edges, sCount, s);