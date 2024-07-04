const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m] = input[0].split(' ').map(Number);
    let num = 0;
    const union = Array.from({ length : n + 1 }, () => num++);
    const edges = input.slice(1, m + 1).map(t => t.split(' ').map(Number));
    const exits = input.slice(m + 1, m + 2)[0].split(' ').map(Number);
    const arr = [];

    for(const a of edges) {
        arr.push(a);
    }
    for(let i = 0; i < n; i ++) {
        arr.push([0, i + 1, exits[i]]);
        // console.log([0, i + 1, exits[i]]);
    }
    arr.sort((a,b) => a[2] - b[2]);

    const find = (index) => {
        if(index === union[index]) {
            return index;
        }

        const result = find(union[index]);
        union[index] = result;
        return result;
    }

    const create = (idx1, idx2) => {
        const n1 = find(idx1);
        const n2 = find(idx2);
        if(n1 === n2) return false;

        union[idx2] = n1;
        return true;
    }

    let answer = 0;
    let count = 0;

    // while(heap.length() && count < n) {
    //     const [start, end, cost] = heap.shift();
    //     if(create(start, end)) {
    //         answer += cost;
    //         count ++;
    //         if(count === n) break;
    //     }
    // }

    for(const [start, end, cost] of arr) {
        if(create(start, end)) {
            // console.log(start, end, cost);
            answer += cost;
            count ++;
            if(count === n) break;
        }
    }

    // console.log(edges);
    // console.log(union);
    console.log(answer);
}

solution(input);