const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [N, M] = input.shift().split(' ').map(Number);
    const map = input.map(row => row.split(' ').map(Number));

    return [N, M, map];
}

function solution(N, M, map) {
    class Heap {
        constructor(func) {
            this.heap = [];
            this.func = func; // (a, b) => a - b; // 최소 힙
        }

        push(value) {
            this.heap.push(value);
            this.bubbleUp();
        }

        shift() {
            if(this.heap.length === 0) return undefined;
            if(this.heap.length === 1) return this.heap.pop();

            const result = this.heap[0];
            this.swap(0, this.heap.length - 1);
            this.heap.pop();
            this.bubbleDown();

            return result;
        }

        swap(index1, index2) {
            const temp = this.heap[index1];
            this.heap[index1] = this.heap[index2];
            this.heap[index2] = temp;
        }

        bubbleDown() {
            let index = 0;
            let leftIndex = index * 2 + 1;
            let rightIndex = index * 2 + 2;

            while(
                (this.heap[leftIndex] !== undefined && this.func(this.heap[leftIndex], this.heap[index])) ||
                (this.heap[rightIndex] !== undefined && this.func(this.heap[rightIndex], this.heap[index]))
                ) {
                let minChildIndex = leftIndex;
                if(this.heap[rightIndex] !== undefined && this.func(this.heap[rightIndex], this.heap[leftIndex])) {
                    minChildIndex = rightIndex;
                }
                this.swap(index, minChildIndex);
                index = minChildIndex;
                leftIndex = index * 2 + 1;
                rightIndex = index * 2 + 2;
            }    }

        bubbleUp() {
            let insertedIndex = this.heap.length - 1;
            let parentIndex = Math.floor((insertedIndex - 1) / 2);

            while(insertedIndex > 0 && this.func(this.heap[insertedIndex], this.heap[parentIndex])) {
                this.swap(insertedIndex, parentIndex);
                insertedIndex = parentIndex;
                parentIndex = Math.floor((insertedIndex - 1) / 2);
            }
        }

        length() {
            return this.heap.length;
        }
    }
    const checkStr = (map) => map.map(row => row.join(' ')).join('\n');

    const isAble = (y, x) => y >= 0 && x >= 0 && y < map.length && x < map[0].length;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const makeBridge = (y, x, map, bridgeLength, ny, nx) => {
        if(isAble(y, x) && map[y][x] === 0)
            return makeBridge(y + ny, x + nx, map, bridgeLength + 1, ny, nx);
        else if(isAble(y, x) && map[y][x] !== 0) {
            if(bridgeLength < 2) return [-1, 0];
            else return [map[y][x], bridgeLength];
        }
        else return [-1, 0]; // [islandName, length]
    }

    const makeIsland = (map) => {
        const newMap = Array.from({ length : map.length },
            () => Array.from({ length : map[0].length }, () => 0));
        let mapName = 1;
        let mapInfo = Array.from({ length : 7 }, () => [0, 0, true]);

        const dfs = (y, x) => {
            newMap[y][x] = mapName;

            for(let [dy, dx] of dirs) {
                const [ny, nx] = [y + dy, x + dx];
                if(isAble(ny, nx) && map[ny][nx] === 1 && newMap[ny][nx] === 0) {
                    dfs(ny, nx);
                }
            }
        }

        for(let i = 0; i < map.length; i ++) {
            for(let j = 0; j < map[0].length; j ++) {
                if(map[i][j] === 1 && newMap[i][j] === 0) {
                    dfs(i, j);
                    mapInfo[mapName] = [i, j, false];
                    mapName ++;
                }
            }
        }

        return [mapName, newMap, mapInfo];
    }

    const [mapCount, newMap, mapInfo] = makeIsland(map);
    // console.log(checkStr(newMap));
    // console.log(mapCount);
    // console.log(mapInfo);

    const minHeap = new Heap((a, b) => a[1] < b[1]);

    const islandDfs = (y, x, map,
                       visited = Array.from({ length : map.length }, () => Array.from({ length : map[0].length }, () => false)),
                       result = Array(7).fill(Infinity)) => {

        visited[y][x] = true;

        for(const [dy, dx] of dirs) {
            const [ny, nx] = [y + dy, x + dx];

            if(isAble(ny, nx) && !visited[ny][nx] && map[ny][nx] !== 0) {
                islandDfs(ny, nx, map, visited, result);
            } else if(isAble(ny, nx) && !visited[ny][nx] && map[ny][nx] === 0) {
                const [islandName, length] = makeBridge(ny, nx, map, 0, dy, dx);
                if(islandName === -1) continue;
                result[islandName] = Math.min(result[islandName], length);
            }
        }

        return result;
    }

    const answer = Array(7).fill(Infinity);
    answer[1] = 0;
    mapInfo[1][2] = true;
    islandDfs(mapInfo[1][0], mapInfo[1][1], newMap).forEach((v, i) => {
        if(v !== Infinity) {
            minHeap.push([i, v]);
        }
    });

    while(minHeap.length()) {
        const [next, value] = minHeap.shift();

        if(answer[next] !== Infinity) continue;
        answer[next] = value;
        mapInfo[next][2] = true;

        islandDfs(mapInfo[next][0], mapInfo[next][1], newMap).forEach((v, i) => {
            if(v !== Infinity && !mapInfo[i][2]) {
                minHeap.push([i, v]);
            }
        });

        if(mapInfo[1][2] && mapInfo[2][2] && mapInfo[3][2] && mapInfo[4][2] && mapInfo[5][2] && mapInfo[6][2]) break;
    }

    // console.log(answer);

    if(mapInfo[1][2] && mapInfo[2][2] && mapInfo[3][2] && mapInfo[4][2] && mapInfo[5][2] && mapInfo[6][2]) {
        let sum = 0;
        for(let i = 1; i < mapCount; i ++) {
            sum += answer[i];
        }
        console.log(sum);
    } else {
        console.log('-1');
    }
}

const [N, M, map] = filter(input);
solution(N, M, map);