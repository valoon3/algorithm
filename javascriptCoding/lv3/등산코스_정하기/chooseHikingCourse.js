// const [n, paths, gates, summits] = [6, [[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]]	, [1, 3]	, [5]	];
// result [5,3]

// const [n, paths, gates, summits] = [7, [[1, 4, 4], [1, 6, 1], [1, 7, 3], [2, 5, 2], [3, 7, 4], [5, 6, 6]]	, [1]	, [2, 3, 4]	];
// result [3,4]

// const [n, paths, gates, summits] = [7, [[1, 2, 5], [1, 4, 1], [2, 3, 1], [2, 6, 7], [4, 5, 1], [5, 6, 1], [6, 7, 1]]	, [3, 7]	, [1,5]];
// result [5,1]

const [n, paths, gates, summits] = [5, [[1, 3, 10], [1, 4, 20], [2, 3, 4], [2, 4, 6], [3, 5, 20], [4, 5, 6]]	, [1, 2]	, [5]];
// result [5,6]

function solution(n, paths, gates, summits) {
    const map = Array.from({length: n + 1}, () => []);
    const types = new Array(n + 1).fill('course');
    gates.forEach(gate => {
        types[gate] = 'gate'
        // minCost[gate] = 0;
    });
    summits.forEach(summit => types[summit] = 'summit')

    paths.forEach(([start, end, cost]) => {
        map[start].push([end, cost]);
        map[end].push([start, cost]);
    })

    const a = summits.map(start => {
        const maxCost = Array.from({length: n + 1}, () => Infinity);
        maxCost[start] = 0;

        return dfs(start, start, maxCost, []);
    }).sort((a,b) => a[1] - b[1]);

    return a[0];



    function dfs(startPoint, nowPoint, maxCost, visited) {
        const endPoints = [];

        if(types[nowPoint] === 'gate') return;

        visited.push(nowPoint);

        for(let i = 0; i < map[nowPoint].length; i ++) {
            let [endPoint, cost] = map[nowPoint][i];
            cost = cost < maxCost[nowPoint] ? maxCost[nowPoint] : cost;

            // 봉우리로 돌아오는것 방지
            if(types[endPoint] === 'summit') continue;

            // 이미 방문한 노드는 재방문 하지 않음
            if(visited.includes(endPoint)) continue;

            if(cost < maxCost[endPoint]) {
                maxCost[endPoint] = cost;
            }

            dfs(startPoint, endPoint, maxCost, [...visited]);
        }

        let min = Infinity;
        gates.forEach(gate => {
            if(maxCost[gate] < min) min = maxCost[gate];
        });

        return [startPoint, min];
    }


    return answer;
}

console.log(solution(n, paths, gates, summits));