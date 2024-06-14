const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const count = Number(input[0]);
    input.pop();
    const friendEdges = input.slice(1).map(t => t.split(' ').map(Number));

    return [count, friendEdges];
}

function solution(count, friendEdges) {
    const graph = Array.from({ length : count + 1 }, () => Array.from({ length : count + 1 }, () => Infinity));

    for(const [num1, num2] of friendEdges) {
        graph[num1][num2] = 1;
        graph[num2][num1] = 1;
    }
    //
    for(let i = 0; i <= count; i ++) {
        graph[i][i] = 0;
    }

    for(let mid = 1; mid <= count; mid ++) {
        for(let i = 1; i <= count; i ++) {
            for(let j = 1; j <= count; j ++) {
                if(graph[i][j] > graph[i][mid] + graph[mid][j]) {
                    graph[i][j] = graph[i][mid] + graph[mid][j];
                }
            }
        }
    }

    const dic = (map) => {
        let maxNum = Infinity;
        let totalNum = Infinity;
        let people = [];

        for(let i = 1; i < map.length; i ++) {
            // let totalScore = map[i].slice(1).reduce((pre, cur) => pre += cur, 0);
            let max = Math.max(...map[i].slice(1));

            if(max === maxNum) {
                people.push(i);
            }

            if(max < maxNum) {
                maxNum = max;
                people = [];
                people.push(i);
            }

            // if(totalScore === totalNum) {
            //     people.push(i);
            // }
            //
            // if(totalScore < maxNum) {
            //     totalNum = totalScore;
            //
            //     people = [];
            //     people.push(i);
            // }
        }

        return [maxNum, people];
    }

    // console.log(graph);
    const [max, people] = dic(graph);
    console.log(max, people.length);
    console.log(people.join(' '));
}

const [count, friendEdges] = filter(input);
solution(count, friendEdges);