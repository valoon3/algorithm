const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    let T = Number(input.shift());
    const result = [];

    while(T > 0) {
        const [N, M] = input.shift().split(' ').map(Number);
        const edges = input.splice(0, M).map(s => s.split(' ').map(Number));
        result.push([N, M, edges]);
        T --;
    }

    return result;
}

function solution(input) {

    const dfs = (node, graph, visited) => {
        visited[node] = true;
        let totalCost = 0;

        for(let [next, cost] of graph[node]) {
            if(!visited[next]) {
                let preCost = dfs(next, graph, visited);
                if(cost < preCost) {
                    totalCost += cost;
                } else {
                    totalCost += preCost;
                }
            }
        }

        return totalCost === 0 ? Infinity : totalCost;
    }

    const answer = [];

    for(let [N, M, edges] of input) {
        if(N === 1) {
            answer.push(0);
            continue;
        }
        const graph = Array.from({ length : N + 1 }, () => []);
        const visited = Array.from({ length : N + 1 }, () => false);
        for(let [start, end, D] of edges) {
            graph[start].push([end, D]);
            graph[end].push([start, D]);
        }
        const cost = dfs(1, graph, visited);
        answer.push(cost);
    }

    console.log(answer.join('\n'));
}

const newInput = filter(input);
solution(newInput);