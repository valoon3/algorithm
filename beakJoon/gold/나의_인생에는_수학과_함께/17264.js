const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const N = Number(input[0]);
    const map = input.slice(1).map(row => row.split(' '));
    const maxMap = Array.from({ length : N }, () => Array.from({ length : N }, () => -Infinity));
    const minMap = Array.from({ length : N }, () => Array.from({ length : N }, () => Infinity));
    const dirs = [[0, 1], [1, 0]];
    const isAble = (y, x) => x >= 0 && y >= 0 && x < N && y < N;

    const stringCal = (myString) => {
        let arr = myString.split(' ');

        if(arr[1] === '+') return Number(arr[0]) + Number(arr[2]);
        else if(arr[1] === '-') return Number(arr[0]) - Number(arr[2]);
        else return Number(arr[0]) * Number(arr[2]);
    }

    const isNumber = (num) => !(num === '+' || num === '*' || num === '-');

    // type 0 minMap 1 maxMap
    const minDfs = (y, x, preNum) => {
        const c = map[y][x];

        if(isNumber(c)) {
            preNum += c;
            const num = stringCal(preNum);
            if(num < minMap[y][x]) {
                minMap[y][x] = num;

                for(const [dy, dx] of dirs) {
                    const ny = dy + y;
                    const nx = dx + x;
                    if(isAble(ny, nx)) minDfs(ny, nx, num.toString());
                }
            }
        } else {
            preNum += ' ' + c + ' ';
            for(const [dy, dx] of dirs) {
                const ny = dy + y;
                const nx = dx + x;

                if(isAble(ny, nx)) minDfs(ny, nx, preNum);
            }
        }
    }


    const maxDfs = (y, x, preNum) => {
        const c = map[y][x];

        if(isNumber(c) === true) {
            preNum += c;
            const num = stringCal(preNum);

            if(num > maxMap[y][x]) {
                maxMap[y][x] = num;

                for(const [dy, dx] of dirs) {
                    const ny = dy + y;
                    const nx = dx + x;
                    if(isAble(ny, nx)) maxDfs(ny, nx, num.toString());
                }
            }
        } else {
            preNum += ' ' + c + ' ';
            for(const [dy, dx] of dirs) {
                const ny = dy + y;
                const nx = dx + x;

                if(isAble(ny, nx)) maxDfs(ny, nx, preNum);
            }
        }
    }

    minDfs(0, 0, '0 + ');
    maxDfs(0, 0, '0 + ');

    const answer = `${maxMap[N-1][N-1]} ${minMap[N-1][N-1]}`;

    console.log(answer);
}

solution(input);