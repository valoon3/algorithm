const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n = +input[0];
    const map = input.slice(1, 1 + n).map(t => t.split(''));
    const graph = Array.from({ length : n }, () => []);

    if(n === 1) return console.log(0);

    let edgesCount = 0;

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < n; j ++) {
            if(map[i][j] === 'Y') {
                graph[i].push(j);
                edgesCount ++;
            }
        }
    }
    edgesCount /= 2;

    // for(let i = 0; i < n; i ++) {
    //     if(graph[i].length === 0 ) return console.log(-1);
    // }

    const circleEdge = [];

    const visited = Array.from({ length : n }, () => false);

    const dfs = (index) => {
        let ret = 1;

        for(const next of graph[index]) {
            if(visited[next]) continue;
            visited[next] = true;
            ret += dfs(next);
        }

        return ret;
    }

    let union = [];
    for(let i = 0; i < n; i ++) {
        if(visited[i] === false) {
            visited[i] = true;
            union.push(dfs(i));
            // console.log(dfs(i));
            // union ++;
        }
    }

    let sum = 0;
    for(const u of union) {
        sum += u - 1;
        if(u === 1) {
            console.log(-1);
            return;
        }
    }

    if(union.length - 1 <= edgesCount - sum) {
        console.log(union.length - 1);
    } else console.log(-1);
}

solution(input);