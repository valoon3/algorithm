const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [V, Minfo, x, Sinfo, y, info] = filter(input);
        solution(V, Minfo, x, Sinfo, y, info);
        process.exit();
    });

function filter(input) {
    // M: 맥도날드의 갯수 x: 맥세권
    const Sinfo = input.pop().split(' ').map(Number);
    const [S, y] = input.pop().split(' ').map(Number);
    const Minfo = input.pop().split(' ').map(Number);
    const [M, x] = input.pop().split(' ').map(Number);

    // V: 정점의 갯수, E: 도로의 갯수
    const [V, E] = input[0].split(' ').map(Number);
    const info = [];

    for(let i = 1; i < input.length; i++) {
        info.push(input[i].split(' ').map(Number));
    }


    return [V, Minfo, x, Sinfo, y, info];
}

function solution(V, Minfo, x, Sinfo, y, info) {
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
            else if(this.heap.length === 1) return this.heap.pop();
            else {
                const result = this.heap[0];
                this.swap(0, this.heap.length - 1);
                this.heap.pop();
                this.bubbleDown();

                return result;
            }
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
                (this.heap[leftIndex] && this.func(this.heap[leftIndex], this.heap[index])) ||
                (this.heap[rightIndex] && this.func(this.heap[rightIndex], this.heap[index]))
                ) {
                let minChildIndex = leftIndex;
                if(this.heap[rightIndex] && this.func(this.heap[rightIndex], this.heap[leftIndex])) {
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

    const graph = Array.from({ length : V + 1 }, () => []);

    info.forEach(([start, end, weight]) => {
        graph[start].push([end, weight]);
        graph[end].push([start, weight]);
    })

    const dijkstra = (startArr) => {
        const distance = Array(V + 1).fill(Infinity);
        const visited = Array(V + 1).fill(false);
        const heap = new Heap((a, b) => a[1] < b[1]);

        startArr.forEach((start) => {
            distance[start] = 0;
            heap.push([start, 0]);
        })

        while(heap.length()) {
            const [current, currentCost] = heap.shift();

            if(visited[current]) continue;
            visited[current] = true;

            graph[current].forEach(([next, nextCost]) => {
                const newCost = currentCost + nextCost;

                if(newCost < distance[next]) {
                    distance[next] = newCost;
                    heap.push([next, newCost]);
                }
            })
        }

        return distance;
    }

    const macdonaldDistance = dijkstra(Minfo);
    const starbucksDistance = dijkstra(Sinfo);

    let result = Infinity;
    for(let i = 1; i < macdonaldDistance.length; i ++) {
        if(macdonaldDistance[i] === 0 || starbucksDistance[i] === 0) continue;
        if(macdonaldDistance[i] <= x && starbucksDistance[i] <= y) {
            result = Math.min(result, macdonaldDistance[i] + starbucksDistance[i]);
        }
    }

    console.log(result === Infinity ? -1 : result);
}