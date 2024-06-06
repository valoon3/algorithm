const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [N, M] = input.shift().split(' ').map(Number);

    if(N < 5) return console.log(0);

    const info = input.map(v => v.split(' ').map(Number));
    const friendGraph = Array.from({ length: N + 1 }, () => []);
    info.forEach(v => {
        friendGraph[v[0]+1].push(v[1]+1);
        friendGraph[v[1]+1].push(v[0]+1);
    })
    const visited = Array(N+1).fill(false);
    let answer = false;

    for(let i = 0; i < N; i ++) {
        friendGraph[0].push(i + 1);
    }

    const dfs = (i, result) => {
        if(result === 0) {
            answer = true;
            return 1;
        }
        visited[i] = true; // 방문 처리

        for(let f of friendGraph[i]) {
            if(visited[f]) continue;
            if(dfs(f, result - 1)) return 1;
            if(answer) return 1;
        }
        visited[i] = false;

        return 0;
    }

    // console.log(friendGraph);
    console.log(dfs(0, 5));
}

solution(input);