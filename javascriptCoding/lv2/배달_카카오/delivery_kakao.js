// const [N, road, K] = [5, [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], 3]; // result 4
const [N, road, K] = [6, [[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]], 4]; // result 4


// N 개의 마을
// road 소모값
// K 시간 이하


function solution(N, road, K) {
    const village = new Array(N+1).fill(500000);
    village[1] = 0;

    const roads = Array.from({ length : N + 1 }, () => []);

    road.forEach(([a, b, cost]) => {
            roads[a].push([b, cost]);
            roads[b].push([a, cost]);
    });

    // console.log(roads);
    for(let startIndex = 1; startIndex < village.length; startIndex ++) {
        roads[startIndex].forEach(([endIndex, cost]) => {
            let totalCost = village[startIndex] + cost;
            if(totalCost < village[endIndex]) village[endIndex] = totalCost;
        })
    }

    return village.filter(cost => cost <= K).length;
}


// 다른 사람의 풀이
function solution(N, road, K) {
    const delTime = Array(N+1).fill(500000);
    const queue = [];
    const roads = Array.from({length:N+1}, () => []);
    // 도로 연결 정보 이차원 배열에 저장
    road.forEach(([v1, v2, t]) => {
        roads[v1].push({ to: v2, time: t });
        roads[v2].push({ to: v1, time: t });
    });

    // 1번 마을까지 걸리는 시간 0으로 초기화
    delTime[1] = 0;
    queue.push({to: 1, time: 0});

    while (queue.length) {
        let {to, time} = queue.shift();

        roads[to].forEach(next => {
            if (delTime[next.to] > delTime[to] + next.time) {
                delTime[next.to] = delTime[to] + next.time;
                queue.push(next);
            }
        })

    }

    return delTime.filter(x => x <= K).length;
}

console.log(solution(N, road, K));