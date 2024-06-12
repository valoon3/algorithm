const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const cityCount = Number(input[0]);
    const busCount = Number(input[1]);
    const edges = input.slice(2, busCount + 2).map(v => v.split(' ').map(Number));
    return [cityCount, busCount, edges];
}

function solution(cityCount, busCount, edges) {
    const resultArr = Array.from({ length : cityCount }, () =>
        Array.from({ length : cityCount}, () => Infinity));
    // const graph = Array.from({ length : cityCount + 1 }, () => []);
    // edges.forEach(([start, end, cost]) => {
    //     graph[start-1].push([end-1, cost]);
    // })
    for(let i = 0; i < cityCount; i ++) {
        resultArr[i][i] = 0;
    }

    for(const [start, end, cost] of edges) {
        if(resultArr[start-1][end-1] > cost)
            resultArr[start-1][end-1] = cost;
    }

    for(let middlePoint = 0; middlePoint < cityCount; middlePoint ++) {
        for(let i = 0; i < cityCount; i ++) {
            for(let j = 0; j < cityCount; j ++) {
                if(resultArr[i][j] > resultArr[i][middlePoint] + resultArr[middlePoint][j]) {
                    resultArr[i][j] = resultArr[i][middlePoint] + resultArr[middlePoint][j];
                }
            }
        }
    }

    for(let i = 0; i < cityCount; i ++) {
        for(let j = 0; j < cityCount; j ++) {
            if(resultArr[i][j] === Infinity) resultArr[i][j] = 0;
        }
    }

    resultArr.map(t => {
        console.log(t.join(' '));
    })
}

const [cityCount, busCount, edges] = filter(input);
solution(cityCount, busCount, edges);