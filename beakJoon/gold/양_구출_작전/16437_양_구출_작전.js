const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const islandCount = parseInt(input.shift());
    const graph = Array.from({ length: islandCount + 1 }, () => []);
    const animalCount = Array.from({ length: islandCount + 1 }, () => 0);
    const info = input.map(v => {
        const temp = v.split(' ');
        return [temp[0], Number(temp[1]), Number(temp[2])];
    });

    info.forEach(([type, count, parentIsland], island) => {
        graph[parentIsland].push(island + 2);
        type === 'S' ? animalCount[island + 2] = count : animalCount[island + 2] = count * -1;
    })

    const dfs = (island) => {
        graph[island].forEach(nextIsland => {
            animalCount[island] += dfs(nextIsland);
        })

        return animalCount[island] > 0 ? animalCount[island] : 0;
    }

    console.log(dfs(1));
}

solution(input);