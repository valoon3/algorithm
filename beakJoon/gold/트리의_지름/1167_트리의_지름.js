const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const filter = (input) => {
    const nodeCount = parseInt(input.shift());
    const graph = Array.from({ length: nodeCount + 1 }, () => []);

    while(input.length > 0) {
        const arr = input.pop().split(' ').map(Number);
        arr.pop();
        for(let i = 1; i < arr.length; i += 2) {
            graph[arr[0]].push([arr[i], arr[i + 1]]);
        }
    }

    return graph;
}

function solution(graph) {
    const leafNode = [];
    let answer = 0;
    for(let i = 1; i < graph.length; i ++) {
        if(graph[i].length === 1) {
            leafNode.push(i);
        }
    }

    const search = (node) => {
        const costArr = Array(graph.length).fill(-1);
        costArr[node] = 0;
        let max = 0;
        let maxIndex = 0;

        const dfs = (node) => {
            graph[node].forEach(([next, cost]) => {
                if(costArr[next] === -1) {
                    costArr[next] = costArr[node] + cost;
                    if(max < costArr[next]) {
                        max = costArr[next];
                        maxIndex = next;
                    }
                    dfs(next);
                }
            })
        }
        dfs(node);

        return [max, maxIndex];
    }

    const [aMax,bIndex] = search(1);
    const [result, _] = search(bIndex);

    console.log(result);
}

const graph = filter(input);
solution(graph);