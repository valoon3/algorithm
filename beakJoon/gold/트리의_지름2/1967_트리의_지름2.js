const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const n = Number(input.shift());
    const edges = input.slice(0, n).map(v => v.split(' ').map(Number));
    const graph = Array.from({ length : n + 1 }, () => []);

    edges.forEach(([start, end, cost]) => {
        graph[start].push([end, cost]);
        graph[end].push([start, cost]);
    })

    return [n, graph];
}

function solution(n, graph) {

    const dfs = (node, visited = Array.from({ length : n + 1 }, () => false)) => {
        visited[node] = true;
        let result = 0;
        let endNode = 0;

        for(const [next, cost] of graph[node]) {
            if(visited[next]) continue;
            const [e, value] = dfs(next, visited);
            const newCost = cost + value;
            if(result < newCost) {
                result = newCost;
                endNode = e;
            }
        }

        if(endNode === 0) return [node, result];

        return [endNode, result];
    }

    let node1 = 0;
    for(let i = 1; i < graph.length; i ++) {
        if(graph[i].length === 1) {
            node1 = i;
            break;
        }
    }

    const [node2, __] = dfs(node1);
    const [_, answer] = dfs(node2);

    console.log(answer);
}

const [n, graph] = filter(input);
solution(n, graph);
