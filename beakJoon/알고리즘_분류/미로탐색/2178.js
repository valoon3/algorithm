const sol = (input) => {
    const [N, M] = input[0].split(" ").map((v) => +v);
    const adjM = [];
    for (let i = 1; i <= N; i++) adjM.push(input[i].split("").map((v) => +v)); // 미로 행렬
    const check = Array.from({ length: N }, () => Array(M).fill(0)); // 방문 여부를 위한 체크 행렬

    function bfs(row, col) {
        const dx = [-1, 0, 1, 0];
        const dy = [0, 1, 0, -1]; // 현재 위치로부터 동서남북 조회를 위한 dx, dy 배열
        const queue = [];
        queue.push([row, col]);
        check[row][col] = 1;
        while (queue.length) {
            const [x, y] = queue.shift(); // 큐는 FIFO이므로, 맨 앞부터 꺼낸다.
            for (let i = 0; i < 4; i++) {
                const [nx, ny] = [x + dx[i], y + dy[i]]; // (nx, ny)는 이동 가능성이 있는 좌표.
                if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue; // 미로를 벗어나는 좌표는 제외
                if (adjM[nx][ny] && !check[nx][ny]) { // 길이 있고, 방문하지 않았다면 방문
                    check[nx][ny] = check[x][y] + 1; // (x,y)의 값이 (x,y)까지 최단경로에 해당한다.
                    queue.push([nx, ny]); // BFS(너비 우선)로 현재 위치에서 갈 수 있는 좌표를 모두 큐에 넣어준다.
                }
            }
        }
    }
    bfs(0, 0);
    return check[N - 1][M - 1];
};

// 백준에서 입력을 받기 위한 코드
const input = [];
require("readline")
    .createInterface(process.stdin, process.stdout)
    .on("line", (line) => {
        input.push(line);
    })
    .on("close", () => {
        console.log(sol(input));
        process.exit();
    });