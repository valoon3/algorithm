const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
input.shift();

function solution(input) {
    const map = input.map(v => v.split(''));
    const zeroMap = Array.from({ length : input.length }, () => Array(input[0].length).fill(0));
    const resultMap = Array.from({ length : input.length }, () => Array(input[0].length).fill(0));
    const totalZeroArr = [null, null];
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    const isAble = (y, x) => y >= 0 && x >= 0 && y < input.length && x < input[0].length;

    function fillZeroMap() {
        const dfs = (y, x, obj) => {
            obj.value ++;
            zeroMap[y][x] = obj;

            for(let i = 0; i < dirs.length; i ++) {
                const [ny, nx] = [y + dirs[i][0], x + dirs[i][1]];

                if(isAble(ny, nx) && map[ny][nx] === '0' && zeroMap[ny][nx] === 0) {
                    dfs(ny, nx, obj);
                }
            }
        }

        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if(map[i][j] === '0' && !zeroMap[i][j]) {
                    const obj = { value : 0 };
                    dfs(i, j, obj);
                }
            }
        }
    }

    fillZeroMap();

    const result = Array.from({ length : input.length }, () => Array(input[0].length).fill(0));

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[0].length; j ++) {
            if(map[i][j] === '1') {
                const set = new Set();
                let sum = 1;

                for(let k = 0; k < dirs.length; k ++) {
                    const [ny, nx] = [i + dirs[k][0], j + dirs[k][1]];

                    if(isAble(ny, nx) && typeof zeroMap[ny][nx] === 'object') {
                        set.add(zeroMap[ny][nx]);
                    }
                }
                set.forEach(v => {
                    sum += v.value;
                })
                result[i][j] = sum % 10;
            }
        }
    }

    let answer = '';
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j ++) {
            if(typeof result[i][j] === 'object') {
                answer += '0';
            } else {
                answer += result[i][j].toString();
            }
        }
        answer += '\n';

    }

    console.log(answer);
}

solution(input);