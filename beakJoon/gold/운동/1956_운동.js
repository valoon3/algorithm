const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [v, e] = input[0].split(' ').map(Number);
    const edges = input.slice(1, e + 1).map(t => t.split(' ').map(Number));
    const graph = Array.from({ length : v + 1 }, () => Array.from({ length : v + 1 }, () => Infinity));

    // for(let i = 0; i <= v; i ++) {
    //     graph[i][i] = 0;
    // }

    for(let [start, end, cost] of edges) {
        graph[start][end] = cost;
    }

    return [v, graph];
}

function solution(cityCount, graph) {

    for(let mid = 1; mid <= cityCount; mid ++) {
        for(let i = 1; i <= cityCount; i ++) {
            for(let j = 1; j <= cityCount; j ++) {
                if(graph[i][mid] + graph[mid][j] < graph[i][j]) {
                    graph[i][j] = graph[i][mid] + graph[mid][j];
                }
            }
        }
    }

    let answer = Infinity;

    for(let i = 1; i <= cityCount; i ++) {
        answer = Math.min(answer, graph[i][i]);
    }

    // console.log(graph);
    if(answer === Infinity) answer = -1;
    console.log(answer);
}

const [cityCount, graph] = filter(input);
solution(cityCount, graph);

