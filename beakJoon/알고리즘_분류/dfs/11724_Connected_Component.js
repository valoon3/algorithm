const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [nodeCount, edgeCount, edges] = filter(input);
        solution(nodeCount, edgeCount, edges);
        process.exit();
    });

function filter(input) {
    const [nodeCount, edgeCount] = input[0].split(' ').map(v => Number(v));
    input = input.slice(1);
    const edges = input.map(edge => edge.split(' ').map(v => Number(v)));

    return [nodeCount, edgeCount, edges];
}

function solution(nodeCount, edgeCount, edges) {
    const visitedArr = Array(nodeCount + 1).fill(false);
    const graph = Array.from({ length: nodeCount + 1 }, () => []);
    let count = 0;

    const dfs = (node) => {
        if(!visitedArr[node]) {
            visitedArr[node] = true;

            graph[node].forEach((nextNode) => {
                if(!visitedArr[nextNode]) dfs(nextNode);
            })
        }
    }

    edges.forEach(([nodeA, nodeB]) => {
        graph[nodeA].push(nodeB);
        graph[nodeB].push(nodeA);
    })

    for(let i = 1; i <= nodeCount; i ++) {
        if(!visitedArr[i]) {
            dfs(i);
            count ++;
        }
    }

    // console.log(graph);
    console.log(count);
}