const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [n, m] = input.shift().split(' ').map(Number);
    const graph = Array.from({ length: n }, () => []);
    const people = input.shift().split(' ').map(Number);

    for(let i = 1; i < people.length; i ++) {
        graph[people[i]-1].push(i);
    }

    const goods = input.slice(0, m).map(v => v.split(' ').map(Number));

    return [graph, goods];
}

function solution(graph, goods) {
    let answer = '';

    const score = new Array(graph.length).fill(0);

    const dfs = (p, good) => {
        score[p] += good;

        const arr = graph[p];

        for(let i = 0; i < arr.length; i ++) {
            dfs(arr[i], score[p]);
        }
    }

    for(let [p, good] of goods) {
        score[p-1] += good;
    }

    // console.log(graph);
    // console.log(score);

    dfs(0, 0);

    for(let i = 0; i < score.length; i++) {
        answer += score[i] + ' ';
    }

    console.log(answer);
}

const [graph, goods] = filter(input);
solution(graph, goods);