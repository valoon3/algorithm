const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n = +input[0];
    const targets = input[1].split(' ').map(Number);
    const edges = input.slice(2, 2 + n).map(t => t.split(' ').map(Number));

    const fruits = Array.from({ length : n + 1 }, () => 0);

    for(let i = 0; i < targets.length; i ++) {
        fruits[i+1] = targets[i];
    }

    const graph = Array.from({ length : n + 1 }, () => []);

    for(const [start, end] of edges) {
        graph[start].push(end);
        graph[end].push(start);
    }

    const visited = Array.from({ length : n + 1 }, () => false);
    const dfs = (index) => {
        visited[index] = true;

        let eat = 0;
        let last = index;

        for(const next of graph[index]) {
            if(visited[next]) continue;
            const [_eat, _last] = dfs(next);

            if(eat < _eat) {
                eat = _eat;
                last = _last;
            } else if(eat === _eat && _last < last) {
                last = _last;
            }
        }

        visited[index] = false;
        return [eat + fruits[index], last];
    }

    const [eat1, node1] = dfs(1);
    if(eat1 === 0) {
        console.log(`${eat1} 1`);
        return;
    }
    const [eat2, node2] = dfs(node1);

    console.log(`${eat2} ${Math.min(node1, node2)}`);
}

solution(input);