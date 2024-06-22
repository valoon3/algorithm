const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m] = input[0].split(' ').map(Number);
    const edges = input.slice(1, 1 + m).map(t => t.split(' '));
    const queryCount = +input[m + 1];
    const queries = input.slice(m+2, m + 2 + queryCount).map(t => t.split(' '));

    const map = new Map();
    const graph = Array.from({ length : n }, () => []);
    // const dp = Array.from({ length : n }, () => Array.from({ length : n }, () => -1));

    let nameIndex = 0;

    for(const [old, young] of edges) {
        if(!map.has(young)) map.set(young, nameIndex ++);
        if(!map.has(old)) map.set(old, nameIndex ++);

        graph[map.get(young)].push(map.get(old));
    }

    const find = (index1, index2, visited = Array.from({ length : n }, () => false)) => {
        if(index1 === index2) return true;
        visited[index2] = true;

        let flag = false;

        for(const olderIndex of graph[index2]) {
            if(!flag && !visited[olderIndex]) flag = find(index1, olderIndex, visited);
        }

        return flag;
    }

    let answer = '';

    for(const [n1, n2] of queries) {
        const [name1, name2] = [map.get(n1), map.get(n2)];

        if(name1 === undefined) {
            map.set(n1, -1);
            answer += 'gg' + ' ';
            continue;
        }
        if(name2 === undefined) {
            map.set(n2, -1);
            answer += 'gg' + ' ';
            continue;
        }

        if(name1 === -1 || name2 === -1) answer += 'gg' + ' ';
        else if(find(name1, name2)) answer += n1 + ' ';
        else if(find(name2, name1)) answer += n2 + ' ';
        else answer += 'gg' + ' ';
    }

    console.log(answer);
}

solution(input);