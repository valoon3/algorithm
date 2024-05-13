const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

input.shift();

function solution(input) {
    // 2 공기
    // 1 치즈
    // 0 빈 공간
    let map = input.map(e => e.split(' ').map(Number));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const isAble = (y, x) => y >= 0 && x >= 0 && y < map.length && x < map[0].length;
    let cheeses = [];
    let answer = 0;

    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] === 1) {
                cheeses.push([i, j]);
            }
        }
    }

    const makeAir = (y, x, map) => {
        map[y][x] = 2;

        dirs.forEach(([dy, dx]) => {
            const ny = y + dy;
            const nx = x + dx;
            if(isAble(ny, nx) && map[ny][nx] === 0) {
                makeAir(ny, nx, map);
            }
        });
    }

    const airCount = (y, x, map) => {
        let count = 0;
        dirs.forEach(([dy, dx]) => {
            const ny = y + dy;
            const nx = x + dx;
            if(isAble(ny, nx) && map[ny][nx] === 2) {
                count++;
            }
        });
        return count;
    }

    makeAir(0, 0, map);

    while(cheeses.length > 0) {
        answer ++;
        const newCheese = [];
        const broken = [];
        cheeses.forEach(([y, x]) => {
            let air = airCount(y, x, map);
            if(air >= 2) {
                broken.push([y, x]);
            } else {
                newCheese.push([y, x]);
            }
        });

        broken.forEach(([y, x]) => {
            makeAir(y, x, map);
        })
        cheeses = newCheese;
    }

    console.log(answer);
}

solution(input);