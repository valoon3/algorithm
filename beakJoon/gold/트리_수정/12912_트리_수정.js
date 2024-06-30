const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n = +input[0];
    const edges = input.slice(1, n).map(t => t.split(' ').map(Number));
    const graph = Array.from({ length : n }, () => []);
    for(const [start, end, cost] of edges) {
        graph[start].push([end, cost]);
        graph[end].push([start, cost]);
    }
    const visited = Array.from({ length : n }, () => false);

    // const brokenEdges = [];
    //
    // for(let i = 0; i < graph.length; i ++) {
    //     if(graph[i].length === 1) {
    //         brokenEdges.push([i, graph[i][0][0], graph[i][0][1]]);
    //     }
    // }
    // console.log(brokenEdges);

    const dfs = (start, cost, cant1, cant2) => {
        visited[start] = true;
        let resultIndex = start;
        let max = cost;

        for(const [next, nextCost] of graph[start]) {
            if(visited[next]) continue;

            if((start === cant1 && next === cant2) || (start === cant2 && next === cant1)) continue;

            const [targetIndex, targetCost] = dfs(next, cost + nextCost, cant1, cant2);

            if(targetCost > max) {
                resultIndex = targetIndex;
                max = targetCost;
            }
        }

        visited[start] = false;

        return [resultIndex, max];
    }

    // const [index1, num1] = dfs(0, 0);
    // const [index2, num2] = dfs(index1, 0);
    // console.log(num2);

    let answer = 0;

    edges.forEach(([start, end, cost]) => {
        // console.log('끊긴 비용 : ', start, end, cost);
        const [n1, cost1] = dfs(start, 0, start, end);
        const [n2, cost2] = dfs(n1, 0, start, end);

        const [n3, cost3] = dfs(end, 0, start, end);
        const [n4, cost4] = dfs(n3, 0, start, end);
        // console.log(n4, cost3)

        // console.log(n1, n2, cost2)
        // console.log(n3, n4, cost4)

        answer = Math.max(answer, cost2 + cost4 + cost);
    })

    console.log(answer);
}

solution(input);

