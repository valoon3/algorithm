const [n, weak, dist] =
    [12, [1, 5, 6, 10], [1, 2, 3, 4]];
// result 2

// const [n, weak, dist] = [12, [1, 3, 4, 9, 10]	, [3, 5, 7]	];
// result 1

// const [n, weak, dist] = [200, [0, 100], [1,1]]

// n : 벽의 길이
// weak : 취약 지점
// dist : 친구들의 이동 가능 거리

function solution(n, weak, dist) {
    let answer = -1;
    let memberCount = dist.length;

    dist.sort((a, b) => a - b);

    function fix(weak, startPoint, friend) {
        const over = startPoint + friend >= n;
        return over ?
            weak.filter(w => w < startPoint && w > startPoint + friend - n) :
            weak.filter(w => w < startPoint || w > startPoint + friend);
    }

    const weakQueue = [[weak, dist.length-1]];
    while(weakQueue.length) {
        const [weak, friendIndex] = weakQueue.shift();
        const friend = dist[friendIndex];

        for(let startPoint of weak) {
            const newWeakArr = fix(weak, startPoint, friend);
            if(newWeakArr.length === 0) {
                answer = memberCount - friendIndex;
                break;
            }
            weakQueue.push([newWeakArr, friendIndex-1]);
        }

        console.log(weakQueue);

        if(answer !== -1) break;
    }

    return answer;
}

console.log(solution(n, weak, dist));