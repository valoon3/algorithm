// const [n, weak, dist] = [12, [1, 5, 6, 10], [1, 2, 3, 4]];
// result 2

// const [n, weak, dist] = [12, [1, 3, 4, 9, 10]	, [3, 5, 7]	];
// result 1

// const [n, weak, dist] = [200, [0, 100], [1,1]]
const [n, weak, dist] = [12, [10, 0], [1,2]]; // 1

// n : 벽의 길이
// weak : 취약 지점
// dist : 친구들의 이동 가능 거리

function solution(n, weak, dist) {
    let answer = Infinity;
    const friendCount = dist.length;
    dist.sort((a,b) => b - a);

    const len = n;

    const fixWeak = (weak, start, friend) => {
        const end = start + friend;
        const newWeak = [];

        if(end <= len) {
            weak.forEach(v => {
                if(v >= start && v <= end) {

                } else if(end === len && v === 0) {

                } else {
                    newWeak.push(v);
                }
            })
        } else {
            weak.forEach(v => {
                if((v >= start && v <= len)) {}
                else if((0 <= v && v <= end - len)) {}
                else newWeak.push(v);
            })
        }

        return newWeak;
    }

    const dfs = (weak, friendNumber) => {
        if(weak.length === 0) {
            answer = Math.min(answer, friendNumber);
            return;
        }

        const friend = dist[friendNumber];

        if(friendNumber < friendCount) {
            weak.forEach(start => {
                const newWeak = fixWeak(weak, start, friend);
                dfs(newWeak, friendNumber + 1);
            })
        }
    }

    dfs(weak, 0);
    return answer === Infinity ? -1 : answer;
}

console.log(solution(n, weak, dist));