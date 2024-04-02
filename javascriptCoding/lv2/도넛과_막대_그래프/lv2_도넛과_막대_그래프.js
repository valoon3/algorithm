const edges = [[2, 3], [4, 3], [1, 1], [2, 1]];
// result [2, 1, 1, 0]

// const edges = [[4, 11], [1, 12], [8, 3], [12, 7], [4, 2], [7, 11], [4, 8], [9, 6], [10, 11], [6, 10], [3, 5], [11, 1], [5, 3], [11, 9], [3, 8]];
// result [4, 0, 1, 2]


function solution(edges) {
    let startPoint = 0;
    let shapeCount = 0;
    let barCount = 0;
    let donutCount = 0;
    let eightCount = 0;


    const getGraphMap = () => {
        const map = new Map();
        edges.forEach(([start, end]) => {
            if(!map.has(start)) map.set(start, {send : 0, receive : 0});
            if(!map.has(end)) map.set(end, {send : 0, receive : 0});

            map.get(start).send ++;
            map.get(end).receive ++;
        });
        return map;
    }

    let graphMap = getGraphMap();
    const iter = graphMap.keys();
    let keys = [...iter];
    const nodeCount = keys.length;

    keys.forEach(key => {
        const {send, receive} = graphMap.get(key);

        if(send === 0) barCount ++; // 막대
        else if(send === 2 && receive >= 2) eightCount ++; // 팔자
        else if(send >= 2 && receive === 0) {
            shapeCount = send;
            startPoint = key;
        }
    })

    donutCount = shapeCount - barCount - eightCount;


    // [생성한 정점의 번호, 도넛 모양, 막대 모양, 8자 모양]
    return [startPoint, donutCount, barCount, eightCount];
}

console.log(solution(edges));