

function solution(input) {
    const [n, m] = input[0].split(' ').map(v => Number(v));
    const map = input.slice(1).map(row => row.split('').map(v => Number(v)));
    const visitedMap = Array.from({ length: m }, () => Array(n).fill(false));

    const [targetY, targetX] = [m - 1, n - 1];

    const bfs = () => {
        const queue = [[[0, 0], 0]]; // [[y, x], count, visitedMap]
        const moveAble = (y, x) => y >= 0 && y < m && x >= 0 && x < n;
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        while(queue.length) {
            const [[y, x], count] = queue.shift();

            if(y === targetY && x === targetX) return count;

            for(const [dy, dx] of dirs) {
                if(moveAble(y + dy, x + dx) && !visitedMap[y + dy][x + dx]) {
                    visitedMap[y + dy][x + dx] = true;
                    map[y + dy][x + dx] === 0 ?
                        queue.unshift([[y + dy, x + dx], count]) :
                        queue.push([[y + dy, x + dx], count + 1]);
                }
            }
        }
    }

    return bfs();
}


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