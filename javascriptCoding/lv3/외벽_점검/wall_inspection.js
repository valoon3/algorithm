// const [n, weak, dist] = [12, [1, 5, 6, 10], [1, 2, 3, 4]];
// result 2

const [n, weak, dist] = [12, [1, 3, 4, 9, 10]	, [3, 5, 7]	];
// result 1

function solution(n, weak, dist) {
    let answer;
    dist.sort((a,b) => a - b);
    let circleWallLength = n;
    const queue = [];

    weak.forEach(w => {
        queue.push(wallCheckFuc({visited: [], count : 0, dist: [...dist], needToVisit: [...weak]}, w));
    })

    function wallCheckFuc(_circleWallObject, weakValue) {
        const result = {
            visited : [..._circleWallObject.visited],
            dist : [..._circleWallObject.dist],
            needToVisit: [],
            count : _circleWallObject.count + 1,
        }

        const friend = result.dist.pop();

        const over = weakValue + friend >= circleWallLength;

        _circleWallObject.needToVisit.forEach(w => {
            if(over) {
                if(w >= weakValue || w <= weakValue + friend - circleWallLength) result.visited.push(w);
                else if(w - weakValue - friend === 0 && w === n) result.visited.push(circleWallLength);
                else {
                    result.needToVisit.push(w);
                }
            } else {
                if (w >= weakValue && w <= weakValue + friend) result.visited.push(w);
                else {
                    result.needToVisit.push(w);
                }
            }
        })

        return result;
    }

    let i = 0
    while(queue[i]) {
        const _circleWallObject = queue[i];

        if(_circleWallObject.needToVisit.length === 0) {
            answer = _circleWallObject.count;
            break;
        } else if(_circleWallObject.dist.length === 0) {
            answer = -1;
            break;
        }

        _circleWallObject.needToVisit.forEach(w => {
            queue.push(wallCheckFuc(_circleWallObject, w, _circleWallObject.dist));
        })

        i++;
    }

    return answer;
}

console.log(solution(n, weak, dist));

// 외벽 점검

// 73 점
// 몇가지 테스트 케이스 통과 못함