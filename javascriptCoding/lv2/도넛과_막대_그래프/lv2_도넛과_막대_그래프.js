const edges = [[2, 3], [4, 3], [1, 1], [2, 1]];
// result [2, 1, 1, 0]

// const edges = [[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]];
// result [4, 0, 1, 2]


function solution(edges) {
    let barCount = 0;
    let donutCount = 0;
    let eightCount = 0;


    const getStartPoint = () => {
        // let graph = new Map();
        // edges.forEach(([start, end]) => {
        //     if(graph.has(start)) {
        //         graph.get(start).push(end);
        //     } else {
        //         graph.set(start, [end]);
        //     }
        // });
        //
        // const iter = graph.keys();
        // const keys = [...iter]
        //     .filter(key => graph.get(key).length >= 2)
        //     .filter(key => {
        //         for(let [start, end] of edges) {
        //             if(end === key) return false;
        //         }
        //         return true;
        //     })
        // return keys[0];

        const map = new Map();
        edges.forEach(([start, end]) => {
            if(!map.has(start)) {
                map.set(start, {send : 0, receive : 0});
            } else {
                map.get(start).send ++;
            }
            if(!map.has(end)) {
                map.set(end, {send : 0, receive : 0});
            } else {
                map.get(end).receive ++;
            }
        });
        console.log(map);
    }

    // donut true / eight false
    const donut = (graph, point, visited = new Array(1000001).fill(false)) => {
        const nextPoints = graph.get(point);
        if(nextPoints.length === 2) return false;
        if(visited[point] === true) return true;

        visited[point] = true;
        const nextPoint = nextPoints[0];
        return donut(graph, nextPoint, visited);
    }

    const barGraph = (graph, point, visited = new Array(1000001).fill(false)) => {
        if(!graph.has(point)) return true;
        else {
            const nextPoints = graph.get(point);

            // 다음 경로가 하나뿐이고 방문한적 없으면
            if(nextPoints.length === 1 && !visited[nextPoints[0]]) {
                visited[nextPoints[0]] = true;
                return barGraph(graph, nextPoints[0], visited);
            }
            return false;
        }
    }

    const eightGraph = () => {

    }

    let startPoint = getStartPoint();
    let nextPoints = edges.filter(([start, end]) => start === startPoint ? true : false).map(edge => edge[1]);
    const graph = new Map();
    edges.forEach(([start, end]) => {
        if(start !== startPoint) {
            if(graph.has(start)) {
                graph.get(start).push(end);
            } else {
                graph.set(start, [end]);
            }
        }
    })
    // console.log(graph);

    nextPoints.forEach(point => {
        if(barGraph(graph, point)) barCount ++;
        else {
            if(donut(graph, point)) donutCount ++;
            else eightCount ++;
        }
    })

    // [생성한 정점의 번호, 도넛 모양, 막대 모양, 8자 모양]
    return [startPoint, donutCount, barCount, eightCount];
}

console.log(solution(edges));