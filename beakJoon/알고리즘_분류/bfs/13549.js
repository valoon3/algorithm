const sol = (input) => {
    const [N, K] = input.split(" ").map(Number);
    const visit = Array.from({ length: 100100 }, () => 0);

    const bfs = (N) => {
        const queue = [];
        queue.push([N, 0]);
        visit[N] = 1;

        while(queue.length) {
            const [nowPoint, time] = queue.shift();

            // 도착 지점의 인덱스가 같다면 시간을 변경
            if(nowPoint === K) return time;

            // 2배로 이동하는 경우
            if(nowPoint * 2 <= 100000 && !visit[nowPoint * 2]) {
                visit[nowPoint * 2] = 1;
                // 2배로 이동할 때는 queue 맨 앞에 넣어준다.
                queue.unshift([nowPoint * 2, time]);
            }

            // -1 로 이동하는 경우
            if(nowPoint - 1 >= 0 && !visit[nowPoint - 1]) {
                visit[nowPoint - 1] = 1;
                queue.push([nowPoint - 1, time + 1]);
            }

            // +1 로 이동하는 경우
            if(nowPoint + 1 <= 100000 && !visit[nowPoint + 1]) {
                visit[nowPoint + 1] = 1;
                queue.push([nowPoint + 1, time + 1]);
            }
        }
    }

    return bfs(N);
};

require("readline")
    .createInterface(process.stdin, process.stdout)
    .on("line", (line) => {
        console.log(sol(line));
        process.exit();
    })
    // .on("close", () => {
    //     process.exit();
    // });