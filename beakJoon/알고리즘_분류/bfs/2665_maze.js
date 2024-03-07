
// const input = ['8', '11100110', '11010010', '10011010', '11101100', '01000111', '00110001', '11011000', '11000111'];

function solution(input) {
    const n = Number(input[0]);
    const map = input.slice(1).map(row => row.split('').map(v => Number(v)));
    const moveAble = (y, x) => y >= 0 && y < n && x >= 0 && x < n;
    let count = 0;
    const dirs = [[0,1], [0, -1], [1, 0], [-1, 0]];
    const visitedMap = Array.from({ length: n }, () => Array(n).fill(false));
    visitedMap[0][0] = true;
    const [targetY, targetX] = [n-1, n-1];


    const queue = [[[0, 0], 0]]; // [[y, x], count]

    while(queue.length) {
        const [[y, x], count] = queue.shift();
        if(y === targetY && x === targetX) return count;

        for(const [dy, dx] of dirs) {
            if(moveAble(y + dy, x + dx) && !visitedMap[y + dy][x + dx]) {
                visitedMap[y + dy][x + dx] = true;
                map[y + dy][x + dx] === 1 ?
                    queue.unshift([[y + dy, x + dx], count]) :
                    queue.push([[y + dy, x + dx], count + 1])
            }
        }
    }
}

// console.log(solution(input));

const input = [];
require("readline")
    .createInterface(process.stdin, process.stdout)
    .on("line", (line) => {
        input.push(line);
    })
    .on("close", () => {
        console.log(solution(input));
        process.exit();
    });