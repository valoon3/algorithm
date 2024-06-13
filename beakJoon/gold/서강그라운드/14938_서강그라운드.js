const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [regionCount, m, r] = input[0].split(' ').map(Number);
    const items = [0];
    input[1].split(' ').map(Number).forEach(v => items.push(v));
    const edges = input.slice(2, r + 2).map(t => t.split(' ').map(Number));
    const graph = Array.from({ length : regionCount + 1 }, () => Array.from({ length : regionCount + 1 }, () => Infinity));

    for(let [start, end, dist] of edges) {
        graph[start][end] = dist;
        graph[end][start] = dist;
    }

    for(let i = 1; i <= regionCount; i ++) {
        graph[i][i] = 0;
    }

    return [regionCount, m, items, graph];
}

function solution(regionCount, m, items, graph) {

    for(let mid = 1; mid <= regionCount; mid ++) {
        for(let i = 1; i <= regionCount; i ++) {
            for(let j = 1; j <= regionCount; j ++) {
                if(graph[i][mid] + graph[mid][j] < graph[i][j]) {
                    graph[i][j] = graph[i][mid] + graph[mid][j];
                }
            }
        }
    }

    let answer = 0;
    for(let i = 1; i <= regionCount; i ++) {
        let sum = 0;
        for(let j = 1; j <= regionCount; j ++) {
            if(graph[i][j] <= m) sum += items[j];
        }
        answer = Math.max(answer, sum);
    }

    // console.log(graph);
    console.log(answer);
}

const [regionCount, m, items, graph] = filter(input);
solution(regionCount, m, items, graph);
