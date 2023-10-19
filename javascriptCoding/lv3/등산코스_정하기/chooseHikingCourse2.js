// const [n, paths, gates, summits] = [6, [[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]]	, [1, 3]	, [5]	];
// result [5,3]

// const [n, paths, gates, summits] = [7, [[1, 4, 4], [1, 6, 1], [1, 7, 3], [2, 5, 2], [3, 7, 4], [5, 6, 6]]	, [1]	, [2, 3, 4]	];
// result [3,4]

// const [n, paths, gates, summits] = [7, [[1, 2, 5], [1, 4, 1], [2, 3, 1], [2, 6, 7], [4, 5, 1], [5, 6, 1], [6, 7, 1]]	, [3, 7]	, [1,5]];
// result [5,1]

// const [n, paths, gates, summits] = [5, [[1, 3, 10], [1, 4, 20], [2, 3, 4], [2, 4, 6], [3, 5, 20], [4, 5, 6]]	, [1, 2]	, [5]];
// result [5,6]

function solution(n, paths, gates, summits) {
    const costDp = Array.from({length: n + 1}, () => Infinity);
    const types = new Array(n + 1).fill('course');
    const map = Array.from({length: n + 1}, () => []);
    const q = [];
    const visited = new Array(n+1).fill(false);

    paths.forEach(([start, end, cost]) => {
        map[start].push([end, cost]);
        map[end].push([start, cost]);
    })

    gates.forEach(gate => {
        costDp[gate] = 0;
        types[gate] = 'gate';
        q.push(gate);
    })

    summits.forEach(summit => {
        types[summit] = 'summit';
    })

    function bfs(node) {

    }

    while(q.length) {
        const nowPoint = q.shift();
        if(visited[nowPoint]) continue;
        if(types[nowPoint] === 'summit') continue;

        for(let [endPoint, cost] of map[nowPoint]) {
            if(types[endPoint] === 'gate') continue;
            cost = cost < costDp[nowPoint] ? costDp[nowPoint] : cost;

            if(cost < costDp[endPoint]) {
                costDp[endPoint] = cost;
            }

            q.push(endPoint);
        }

        visited[nowPoint] = true;
    }

    const result = [0, Infinity];

    console.log(costDp);

    summits.forEach(summit => {
        if(costDp[summit] < result[1]) {
            result[0] = summit;
            result[1] = costDp[summit];
        }
    })

    return result;
}

console.log(solution(n, paths, gates, summits));