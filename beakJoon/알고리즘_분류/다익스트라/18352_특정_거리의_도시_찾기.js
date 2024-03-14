class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(data) {
        this.heap.push(data);
        this.bubbleUp();
    }

    bubbleUp() {
        let insertedIndex = this.heap.length - 1;
        let parentIndex = Math.floor((insertedIndex - 1) / 2);

        while(insertedIndex > 0 && this.heap[insertedIndex][1] < this.heap[parentIndex][1]) {
            this.swap(insertedIndex, parentIndex);
            insertedIndex = parentIndex;
            parentIndex = Math.floor((insertedIndex - 1) / 2);
        }
    }

    pop() {
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

    bubbleDown() {
        let index = 0;
        let leftIndex = index * 2 + 1;
        let rightIndex = index * 2 + 2;

        while(
            (this.heap[leftIndex] && this.heap[leftIndex][1] < this.heap[index][1]) ||
            (this.heap[rightIndex] && this.heap[rightIndex][1] < this.heap[index][1])
            ) {
            let minChildIndex = leftIndex;
            if(this.heap[rightIndex] && this.heap[rightIndex][1] < this.heap[leftIndex][1]) {
                minChildIndex = rightIndex;
            }
            this.swap(index, minChildIndex);
            index = minChildIndex;
            leftIndex = index * 2 + 1;
            rightIndex = index * 2 + 2;
        }
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    length() {
        return this.heap.length;
    }
}

const dijkstra = (graph, startPoint) => {
    const minHeap = new MinHeap();
    minHeap.push([startPoint, 0]);
    const distance = Array(graph.length).fill(Infinity);
    distance[startPoint] = 0;

    while(minHeap.length()) {
        const [start, cost] = minHeap.pop();

        graph[start].forEach(([end, c]) => {
            if(distance[end] > cost + c) {
                distance[end] = cost + c;
                minHeap.push([end, distance[end]]);
            }
        })
    }
    return distance;
}

const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [cityCount, roadCount, roadLength, startPoint, roads] = filter(input);
        solution(cityCount, roadCount, roadLength, startPoint, roads);
        process.exit();
    })

function filter(input) {
    const [cityCount, roadCount, roadLength, startPoint] = input.shift().split(' ').map(Number);
    const roads = input.map(v => v.split(' ').map(Number));

    return [cityCount, roadCount, roadLength, startPoint, roads];
}

function solution(cityCount, roadCount, roadLength, startPoint, roads) {
    const graph = Array.from({ length: cityCount + 1 }, () => []);

    roads.forEach(([start, end]) => {
        graph[start].push([end, 1]);
    })

    const distance = dijkstra(graph, startPoint);
    const result = [];

    distance.forEach((v, i) => {
        if(v === roadLength) result.push(i);
    })

    result.sort((a, b) => a - b);

    if(result.length === 0) console.log(-1);
    else console.log(result.join('\n'));
}