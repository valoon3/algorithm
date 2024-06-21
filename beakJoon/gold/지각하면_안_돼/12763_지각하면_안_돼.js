const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');


function solution(input) {
    const n = +input[0]; // 건물의 갯수
    const [T, M] = input[1].split(' ').map(Number); // 남은 시간, 돈
    const roadCount = +input[2];
    const edges = input.slice(3, roadCount + 3).map(t => t.split(' ').map(Number));
    // 건물번호1, 건물번호2, 이동시간, 비용

    // 목표 1 에서 N 까지 가는 것이 목표

    const graph = Array.from({ length : n + 1 }, () => []);
    for(const [start, end, timeCost, moneyCost] of edges) {
        graph[start].push([end, timeCost, moneyCost])
        graph[end].push([start, timeCost, moneyCost])
    }

    let answer = Infinity;

    const visited = Array.from({ length : n + 1 }, () => false);

    const dfs = (building, timeCost, cost) => {
        if(building === n) {
            answer = Math.min(answer, cost);
            return;
        }

        visited[building] = true;

        for(const [next, nextTimeCost, nextCost] of graph[building]) {
            if(timeCost + nextTimeCost > T) continue;
            if(cost + nextCost > M) continue;
            if(visited[next] === true) continue;

            dfs(next, timeCost + nextTimeCost, cost + nextCost);
        }

        visited[building] = false;
    }

    dfs(1, 0, 0);
    if(answer === Infinity) console.log(-1)
    else console.log(answer);
}

solution(input);