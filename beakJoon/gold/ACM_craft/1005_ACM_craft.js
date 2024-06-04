const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    let testCase = Number(input[0]);
    const result = [];

    let line = 1;

    while(testCase) {
        // N : 건물의 수
        const [N, K] = input[line].split(' ').map(Number);
        line ++;
        const dt = input[line].split(' ').map(Number);
        line ++;
        const edges = input.slice(line, line + K).map(m => m.split(' ').map(Number));
        line += K;
        const graph = Array.from({ length : N + 1 }, () => []);

        for(let [node1, node2] of edges)
            graph[node2].push(node1);

        const target = Number(input[line]);
        line ++;

        result.push([N, dt, graph, target]);

        testCase --;
    }

    return result;
}

function solution(cases) {
    const result = [];

    const test = (node, buildCosts, graph, dp) => {
        const dfs = (node) => {
            let max = 0;

            for(let next of graph[node]) {
                if(dp[next] !== -1) {
                    if(max < dp[next]) max = dp[next];
                }
                else {
                    const nextCost = dfs(next);
                    if(nextCost > max) max = nextCost;
                }
            }

            dp[node] = max + buildCosts[node - 1];
            return dp[node];
        }

        return dfs(node);
    }

    for(let [N, buildCosts, graph, target] of cases) {

        const cost = test(target, buildCosts, graph, Array.from({ length : graph.length }, () => -1));
        result.push(cost);
    }

    const answer = result.join('\n');
    console.log(answer);
}

const cases = filter(input);
solution(cases);