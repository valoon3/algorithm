const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const N = Number(input.shift());
    const population = [0, ...input.shift().split(' ').map(Number)];

    const graph = Array.from({ length : N + 1 }, () => []);

    for(let i = 0; i < N; i ++) {
        const edges = input[i].split(' ').map(Number);
        const count = edges[0];
        for(let j = 1; j <= count; j ++) {
            graph[i+1].push(edges[j]);
        }
    }

    return [N, population, graph];
}

function solution(N, population, graph) {
    const cases = [];

    const canSearch = (arr) => {
        const index = arr.indexOf(true);

        function makeArr(index, visited = Array.from({ length : N + 1 }, () => false)) {
            visited[index] = true;
            for(let next of graph[index]) {
                if(arr[next] && !visited[next]) makeArr(next, visited);
            }

            return visited;
        }

        const result = makeArr(index);

        // console.log(arr);
        // console.log(result);

        for(let i = 1; i < result.length; i ++) {
            if(arr[i] !== result[i]) return false;
        }

        return true;
    }

    const dfs = (index = 0, visited = Array.from({ length : N + 1 }, () => false), result = []) => {
        for(let i = index + 1; i <= N; i ++) {
            if(visited[i]) continue;
            result.push(i);
            visited[i] = true;
            if(result.length !== N) cases.push([...visited]);
            dfs(i, visited, result);
            result.pop();
            visited[i] = false;
        }
    }
    dfs();

    let answer = Infinity;

    cases.forEach(case1 => {
        let case2 = case1.map(v => !v);
        case2[0] = false;

        if(canSearch(case1) && canSearch(case2)) {
            let num1 = 0;
            let num2 = 0;
            case1.forEach((v, i) => {
                if(v === true) {
                    num1 += population[i];
                } else num2 += population[i];
            })
            answer = Math.min(answer, Math.abs(num1 - num2));
        }
    })

    // console.log(cases);
    // console.log(canSearch([false, true, false, false, true, false, false]), canSearch([false, false, true, true, false, true, true]))

    if(answer === Infinity) console.log('-1');
    else console.log(answer);
}


const [N, population, graph] = filter(input);
solution(N, population, graph);