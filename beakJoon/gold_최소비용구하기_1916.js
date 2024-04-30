const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [cityCount, busCount, busInfo, startPoint, endPoint] = filter(input);
        solution(cityCount, busCount, busInfo, startPoint, endPoint);
        process.exit();
    });

function filter(input) {
    const cityCount = Number(input.shift());
    const busCount = Number(input.shift());
    const [startPoint, endPoint] = input.pop().split(' ');
    const busInfo = input.map(info => info.split(' ').map(Number));

    return [cityCount, busCount, busInfo, startPoint, endPoint];
}

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

function solution(cityCount, busCount, busInfo, startPoint, endPoint) {
    const distance = Array.from({ length : cityCount + 1 }, () => Infinity);
    distance[startPoint] = 0;
    const road = Array.from({ length : cityCount + 1 }, () => []);
    const visited = Array(cityCount + 1).fill(false);

    const heap = new Heap((a, b) => a[1] < b[1]);
    heap.push([startPoint, 0]);
    distance[startPoint] = 0;

    busInfo.forEach(([start, end, cost]) => {
        road[start].push([end, cost]);
    })

    while(heap.length()) {
        const [start, cost] = heap.shift();

        if(visited[start]) continue;
        visited[start] = true;

        for(let [end, roadCost] of road[start]) {
            if(distance[end] > cost + roadCost) {
                distance[end] = cost + roadCost;
                heap.push([end, distance[end]]);
            }
        }
    }

    console.log(distance[endPoint]);
}