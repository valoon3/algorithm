const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n : number = +input[0];
    const colors : Array<number> = input[1].split(' ').map(Number);
    const edges : Array<Array<number>> = input.slice(2).map(t => t.split(' ').map(Number));
    const graph : Array<number[]> = Array.from({ length : n + 1 }, () => []);
    const visited : Array<boolean> = Array.from({ length : n + 1 }, () => false);

    for(const [start, end] of edges) {
        graph[start].push(end);
        graph[end].push(start);
    }

    let answer : number = 0;

    const dfs = (index: number, color: number) => {
        visited[index] = true;

        if(color !== colors[index - 1]) {
            answer ++;
            color = colors[index - 1];
        }

        for(const next of graph[index]) {
            if(visited[next] === true) continue;

            dfs(next, color);
        }
    }

    dfs(1, 0);

    // console.log(n)
    // console.log(colors)
    // console.log(edges)
    console.log(answer);
}

solution(input);