const [n, edge] = [6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]];

function solution(n, edge) {
    const visitedNode = Array(n+1).fill(false);
    visitedNode[0] = true;
    visitedNode[1] = true;
    const visitedEdge = [];
    let q = [1];

    while(visitedEdge.length !== n-1) {
        const _q = [];
        for(let i = 0; i < edge.length; i ++) {
            const [node1, node2] = edge[i];

            // 환형이동 차단
            if(visitedNode[node1] && visitedNode[node2]) continue;

            if(q.includes(node1) || q.includes(node2)) {
                let target = q.includes(node1) ? node2 : node1;
                _q.push(target);
                visitedNode[target] = true;
                visitedEdge.push(i);
            }
        }
        q = _q;
    }

    return q.length;
}

console.log(solution(n, edge));