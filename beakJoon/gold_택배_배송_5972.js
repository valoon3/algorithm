const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [N, M ,info] = filter(input);
        solution(N, M ,info);
        process.exit();
    });

function filter(input) {
    const [N, M] = input.shift().split(' ').map(Number);
    const info = input.map(info => info.split(' ').map(Number));
    return [N, M, info];
}



function solution(N, M, info) {
    const graph = Array.from({length: N + 1}, () => []);
    const visited = Array(N + 1).fill(false);
    const costArr = Array(N + 1).fill(Infinity);
    const heap = new Heap((a, b) => a[1] < b[1]);
    heap.push([1, 0]);
    costArr[1] = 0;

    info.forEach(([start, end, cost]) => {
        graph[start].push([end, cost]);
        graph[end].push([start, cost]);
    });

    while(heap.length()) {
        const [node, cost] = heap.shift();

        if(visited[node]) continue;
        visited[node] = true;

        graph[node].forEach(([nextNode, nextCost]) => {
            if(costArr[nextNode] > cost + nextCost) {
                costArr[nextNode] = cost + nextCost;
                heap.push([nextNode, costArr[nextNode]]);
            }
        })
    }

    console.log(costArr[N]);
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