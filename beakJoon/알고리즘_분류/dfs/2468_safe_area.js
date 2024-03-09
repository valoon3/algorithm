const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [map, numbers] = filter(input);
        solution(map, numbers);
        process.exit();
    });

function filter(input) {
    input = input.slice(1);
    const numbers = Array(101).fill(false);
    const map = input.map(row => row.split(' ').map(v => {
        const integer = Number(v);
        numbers[integer] = true;
        return integer;
    }) )
    return [map, numbers];
}

function solution(map, numbers) {
    let result = 1;

    const dfs = (height, visited) => {
        let count = 0;
        const dirs = [[0,1], [0, -1], [1, 0], [-1, 0]];
        const moveAble = (y, x) => y >= 0 && y < map.length && x >= 0 && x < map.length;

        const search = (y, x) => {
            if(moveAble(y, x) && map[y][x] > height && !visited[y][x]) {
                visited[y][x] = true;
                dirs.forEach(([dy, dx]) => search(y + dy, x + dx));
            }
        }

        for(let i = 0; i < map.length; i ++) {
            for(let j = 0; j < map.length; j ++) {
                if(map[i][j] > height && !visited[i][j]) {
                    search(i, j);
                    count ++;
                }
            }
        }

        return count;
    }

    for(let height = 1; height < 101; height ++) {
        const count = dfs(height, Array.from({ length : map.length }, () => Array(map.length).fill(false)));
        result = Math.max(result, count);
    }

    console.log(result);
}