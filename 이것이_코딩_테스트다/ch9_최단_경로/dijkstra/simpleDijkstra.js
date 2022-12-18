const [nodeCount, startNode] = [6, 1];
const edges = [
    [1,2,2],
    [1,3,5],
    [1,4,1],
    [2,3,3],
    [2,4,2],
    [3,2,3],
    [3,6,5],
    [4,3,3],
    [4,5,1],
    [5,3,1],
    [5,6,2]
]; // [출발노드, 도착노드, 비용];


function solution(startNode, nodeCount, edges) {
    let visited = new Array(nodeCount+1).fill(false);
    let distance = new Array(nodeCount+1).fill(Infinity);
    let nodeEdges = new Array(nodeCount+1);

    distance[startNode] = 0;
    visited[startNode] = true;

    // 노드별로 경로 설정
    edges.forEach(edge => {
        let [startNode, endNode, cost] = edge;
        if(!nodeEdges[startNode]) {
            nodeEdges[startNode] = [];
        }
        nodeEdges[startNode].push([endNode, cost]);
    })

    console.log(distance);
    console.log(nodeEdges[1]);

    nodeEdges.forEach((nodeEdge, index) => {
        nodeEdge.forEach(([endNode, cost]) => {
            distance[endNode] = Math.min(distance[index] + cost, distance[endNode]);
        })
    })

    console.log(distance);







}

solution(startNode, nodeCount, edges);