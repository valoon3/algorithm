const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [cityCount, busCount,busLines, startPoint, endPoint] = filter(input);
        solution(cityCount, busCount,busLines, startPoint, endPoint);
        process.exit();
    });

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

function filter(input) {
    const cityCount = Number(input[0]);
    const busCount = Number(input[1]);
    input = input.slice(2);
    const [startPoint, endPoint] = input.pop().split(' ').map(Number);
    const busLines = input.map(v => v.split(' ').map(Number));

    return [cityCount, busCount,busLines, startPoint, endPoint];
}

function solution(cityCount, busCount,busLines, startPoint, endPoint) {

    const graph = Array.from({ length: cityCount + 1 }, () => []);
    const costArr = Array(cityCount + 1).fill(Infinity);
    const visited = Array(cityCount + 1).fill(false);
    costArr[startPoint] = 0;
    busLines.forEach(([start, end, cost]) => {
        graph[start].push([end, cost]);
    });
    const minHeap = new MinHeap();
    minHeap.push([startPoint, 0]);

    while(minHeap.length()) {
        const [curNode, cost] = minHeap.pop();

        if(visited[curNode]) continue;

        visited[curNode] = true;
        graph[curNode].forEach(([nextNode, nextCost]) => {
            if(costArr[nextNode] > costArr[curNode] + nextCost) {
                costArr[nextNode] = costArr[curNode] + nextCost;
                minHeap.push([nextNode, costArr[nextNode]]);
            }
        })
    }

    console.log(costArr[endPoint]);
}