const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {

    const n = +input[0];
    const parents = input[1].split(' ').map(Number);
    // const dp = Array.from({ length : n }, () => 0);
    const arr = Array.from({ length : n }, () => 0);
    const dp = Array.from({ length : n }, () => 0);
    const graph = Array.from({ length : n }, () => []);

    let leaf = [];

    for(let i = 0; i < n; i ++) {
        if(parents[i] === -1) continue;
        graph[parents[i]].push(i);
        arr[parents[i]] ++;
    }

    for(let i = 0; i < arr.length; i ++) {
        if(arr[i] === 0) leaf.push(i);
    }

    for(let i = 0; i < leaf.length; i ++) {
        const leafIndex = leaf[i];
        dp[leafIndex] ++;
    }

    const dfs = (index) => {
        const arr = [];

        for(const next of graph[index]) {
            arr.push(dfs(next));
        }

        if(arr.length === 0) return 1;
        if(arr.length === 1) return arr[0] + 1;

        arr.sort((a,b) => b - a);

        let result = arr[0];

        for(let i = 1; i < arr.length; i ++) {
            arr[i] = arr[i] + i;
        }

        return Math.max(...arr) + 1;
    }


    console.log(dfs(0) - 1);
}

solution(input);