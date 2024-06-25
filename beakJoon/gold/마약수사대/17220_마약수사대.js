const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [n, m] = input[0].split(' ').map(Number);

    const edges = [];
    for(let i = 1; i < m + 1; i ++) {
        edges.push(input[i].split(' '));
    }
    const dealers = input.pop().split(' ').slice(1).map(t => t.charCodeAt(0) - 65);

    const graph = Array.from({ length : n }, () => []);
    const headDealer = Array.from({ length : n }, () => 0);
    const drugPoint = [];

    for(const [start, end] of edges) {
        const a = start.charCodeAt(0)-65;
        const b = end.charCodeAt(0)-65;
        headDealer[b] ++;
        if(dealers.includes(b) || dealers.includes(a))
            continue;
        graph[a].push(b);
    }

    for(let i = 0; i < headDealer.length; i ++) {
        if(headDealer[i] === 0) {
            drugPoint.push(i);
        }
    }

    const visited = Array.from({ length : n }, () => false);
    for(const d of dealers) visited[d] = true;

    return [drugPoint, graph, visited];
}

function solution(drugPoint, graph, visited) {
    const dfs = (index) => {
        visited[index] = true;
        let result = 1;

        for(const next of graph[index]) {
            if(!visited[next]) result += dfs(next);
        }

        return result;
    }

    let result = 0;
    for(const p of drugPoint) {
        result += dfs(+p);
    }

    const answer = result - drugPoint.length;
    console.log(answer);
}

const [drugPoint, graph, visited] = filter(input);
solution(drugPoint, graph, visited);