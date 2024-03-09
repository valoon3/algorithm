const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const maps = filter(input);
        solution(maps);
    })

function filter(input) {
    const testCaseCount = Number(input[0]);
    input = input.slice(1);
    const result = [];

    for(let i = 0; i < testCaseCount; i ++) {
        const [row, col, cabbageCount] = input[0].split(' ').map(v => Number(v));
        input = input.slice(1);

        const map = Array.from({ length : col }, () => Array(row).fill(0));

        for(let j = 0; j < cabbageCount; j ++) {
            const [x, y] = input[j].split(' ').map(v => Number(v));
            map[y][x] = 1;
        }

        result.push(map);
        input = input.slice(cabbageCount);
    }

    return result;
}

function solution(maps) {
    const dirs = [[1, 0],[0, 1],[-1, 0],[0, -1]]
    const moveAble = (y, x, col, row) => y >= 0 && y < col && x >= 0 && x < row;
    const result = [];
    let count = 0;

    const dfs = (y, x, map) => {
        map[y][x] = 0;

        for(let [dy, dx] of dirs) {
            // console.log('y + dy: ', y + dy, ' x + dx: ', x + dx, ' moveable: ', moveAble(y + dy, x + dx), ' map[y+dy][x+dx] : ', map?.[y + dy]?.[x + dx]);
            if(moveAble(y + dy, x + dx, map.length, map[0].length) && map[y + dy][x + dx] === 1) {
                dfs(y + dy, x + dx, map);
            }
        }
    }

    maps.forEach(map => {
        for(let y = 0; y < map.length; y ++) {
            for(let x = 0; x < map[0].length; x ++) {
                if(map[y][x] === 1) {
                    dfs(y, x, map);                    count ++;

                }
            }
        }
        result.push(count);
        count = 0;
    })

    console.log(`${result.join("\n")}`);
}