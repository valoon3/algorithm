const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const n = +input[0];
    const map = input.slice(1).map(t => t.split(' ').map(Number));

    return [n, map];
}

function solution(n, map) {
    // const score = Array.from({ length : n }, () => Array.from({ length : n }, () => Infinity));
    const score = map.map(row => row.map(v => v));

    for(let mid = 0 ; mid < n; mid ++) {
        for(let i = 0 ; i < n; i ++) {
            for(let j = 0 ; j < n; j ++) {
                if(i === mid || i === j || j === mid) continue;

                if(map[i][j] > map[i][mid] + map[mid][j]) {
                    return console.log(-1)
                }

                if(map[i][j] === map[i][mid] + map[mid][j]) {
                    score[i][j] = 0;
                }

            }
        }
    }

    let answer = 0;

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < n; j ++) {
            answer += score[i][j];
        }
    }

    console.log(answer / 2);
}

const [n, map] = filter(input);
solution(n, map);