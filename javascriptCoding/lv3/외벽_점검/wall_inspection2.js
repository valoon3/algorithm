const [n, weak, dist] =
    [12, [1, 5, 6, 10], [1, 2, 3, 4]];
// result 2

// const [n, weak, dist] = [12, [1, 3, 4, 9, 10]	, [3, 5, 7]	];
// result 1

function solution(n, weak, dist) {
    // 외벽의 시작과 끝부분을 이어붙이기 위해 flattenWeak를 선언했다.
    const flattenWeak = [...weak, ...weak.map((elem) => elem + n)];
    const weakLen = weak.length;
    const distLen = dist.length;
    // 방문 배열을 통해 순열을 만든다.
    const visits = new Array(distLen).fill(0);
    let answer = distLen + 1;

    // 외벽 원소가 1개면, 아무나 1명만 투입되면 된다.
    if (weakLen === 1) return 1;

    // 친구 배열의 순열을 구하는 함수
    function permutation(L, arr) {
        if (L === distLen) {
            for (let i = 0; i < weakLen; i++) {
                // 여기서 i는 처음 점검을 시작할 외벽의 인덱스다. [1, 5, 6, 10, 13, 17, 18,22] 에서 1,5,6,10까지만 조회한다.
                const end = i + weakLen; // 케이스마다, 외벽의 갯수만큼만 점검하면 완료되므로 end 변수에 넣었다.
                let left = i; // 점검을 시작할 외벽의 인덱스이다.
                let cnt = 0;

                for (let elem of arr) {
                    if (left >= end) break; // left >= end의 경우는 외벽 점검이 끝났음을 의미한다. 더이상 반복문을 돌 필요가 없다.
                    cnt += 1; // 친구가 특정 외벽에서 이동을 시작하므로, cnt를 올려준다.
                    const maxDist = elem + flattenWeak[left]; // 친구가 이동할 수 있는 최대 위치를 나타낸다. 10에서 시작해서 4만큼 이동 가능하면 maxDist는 14일 것.

                    while (left < end && maxDist >= flattenWeak[left]) {
                        left++;
                        // while문이 종료되는 조건을 생각해보자.
                        // end에 도달했다면 이미 점검이 끝난 것이다.
                        // maxDist가 left 인덱스보다 작다면, 현재의 elem(친구)는 left-1 까지만 방문한 셈이다.
                        // 만약 두 조건을 만족한다면, 친구는 더 이동할 수 있으므로 left를 증가시켜준다.
                    }
                }

                if (left < end) continue; // left가 end보다 작다는 것은, 모든 친구를 동원했음에도 외벽을 점검하지 못한 것이다.

                answer = Math.min(answer, cnt); // 매 케이스마다, 친구의 수 최솟값을 갱신시켜준다.
            }
            return;
        }

        for (let i = 0; i < distLen; i++) {
            // 순차적으로 조회해야하므로, 방문처리와 방문 후에는 미방문처리로 바꾼다.
            if (visits[i]) continue;
            visits[i] = 1;
            permutation(L + 1, [...arr, dist[i]]);
            visits[i] = 0;
        }
    }

    // 순열 함수를 실행한다.
    permutation(0, []);

    return answer === distLen + 1 ? -1 : answer;
}
console.log(solution(n, weak, dist));
