const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString().trim().split('\n');
// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, A, M, B] = input.map(v => v.split(" ").map(x => Number(x)));

console.log(N, A, M, B);

A.sort((a, b) => a - b);

// 이분 탐색
const binarySearch = (list, target, left, right, mid) => {
    mid = Math.floor((left + right) / 2);

    if (right < left) {
        return list[mid] == target ? 1 : 0;
    }

    if (list[mid] > target) {
        right = mid - 1;
    } else {
        left = mid + 1;
    }

    return binarySearch(list, target, left, right, mid);
}

const result = B.map(v => binarySearch(A, v, 0, A.length - 1, 0));

console.log(result.join("\n"));