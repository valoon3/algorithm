const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n = +input[0];
    const m = +input[1];
    const weight = input.slice(2, 2 + m).map(t => t.split(' ').map(Number));

    const cost = Array.from({ length : n + 1 }, () => Array.from({ length : n + 1 }, () => 0));

    for(let i = 0; i < cost.length; i ++) {
        cost[i][i] = 1;
    }

    for(const [start, end] of weight) {
        cost[start][end] = 1;
        cost[end][start] = -1;
    }

    for(let start = 1; start <= n; start ++) {
        for(let end = 1; end <= n; end ++) {
            for(let mid = 1; mid <= n; mid ++) {
                if(cost[start][mid] === 1 && cost[mid][end] === 1) {
                    cost[start][end] = 1;
                    cost[end][start] = -1;
                }

                if(cost[start][mid] === -1 && cost[mid][end] === -1) {
                    cost[start][end] = -1;
                    cost[end][start] = 1;
                }
            }
        }
    }

    const answer = [];

    const check = (row) => {
        let result = 0;

        for(let i = 1; i < row.length; i ++) {
            if(row[i] === 0) result ++;
        }
        
        answer.push(result);
    }

    for(let i = 1; i <= n; i ++) {
        check(cost[i]);
    }

    console.log(answer.join('\n'));
}

solution(input);