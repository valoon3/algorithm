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

const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [nodeCount, edgeCount, needToVisit1, needToVisit2, edges] = filter(input);
        solution(nodeCount, edgeCount, needToVisit1, needToVisit2, edges);
        process.exit();
    })

function filter(input) {
    const [nodeCount, edgeCount] = input.shift().split(' ').map(Number);
    const [needToVisit1, needToVisit2] = input.pop().split(' ').map(Number);
    const edges = input.map(v => v.split(' ').map(Number));

    return [nodeCount, edgeCount, needToVisit1, needToVisit2, edges];
}

function solution(nodeCount, edgeCount, pointA, pointB, edges) {
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

    const graph = Array.from({ length: nodeCount + 1 }, () => []);

    edges.forEach(([start, end, cost]) => {
        graph[start].push([end, cost]);
        graph[end].push([start, cost]);
    })

    const distanceFromStart = dijkstra(graph, 1);
    const distanceFromPointA = dijkstra(graph, pointA);
    const distanceFromPointB = dijkstra(graph, pointB);

    // start a b end
    // start a start b end
    // start b a end
    // start b start a end

    const [result1, result2, result3, result4] = [
        distanceFromStart[pointA] + distanceFromPointA[pointB] + distanceFromPointB[nodeCount],
        distanceFromStart[pointA] + distanceFromPointA[1] + distanceFromStart[pointB] + distanceFromPointB[nodeCount],
        distanceFromStart[pointB] + distanceFromPointB[pointA] + distanceFromPointA[nodeCount],
        distanceFromStart[pointB] + distanceFromPointB[1] + distanceFromStart[pointA] + distanceFromPointB[nodeCount],
    ];

    const result = Math.min(result1, result2, result3, result4);

    if(result === Infinity) console.log(-1);
    else console.log(result);
}