const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const testCase = Number(input.shift());
const sInput = [];

input = input.map(info => info.split(' ').map(Number));

for(let i = 0; i < testCase; i++) {
    const [computerCount, edgeCount, virusComputer] = input.shift();
    sInput.push([computerCount, input.splice(0, edgeCount), virusComputer]);
}

function solution(input) {
    function dijkstra(start, nodeCount, graph) {
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
        const distance = Array(nodeCount + 1).fill(Infinity);
        const visited = Array(nodeCount + 1).fill(false);
        const heap = new Heap((a, b) => a[1] < b[1]);
        heap.push([start, 0]);
        distance[start] = 0;
        let count = 0;
        let max = 0;

        while(heap.length()) {
            const [currentNode, currentCost] = heap.shift();

            if(visited[currentNode]) continue;
            visited[currentNode] = true;

            count ++;
            max = Math.max(max, currentCost);
            graph[currentNode].forEach(([nextNode, nextCost]) => {
                const newCost = currentCost + nextCost;

                if(newCost < distance[nextNode]) {
                    distance[nextNode] = newCost;
                    heap.push([nextNode, newCost]);
                }
            });
        }
        return [count, max];
    }

    const result = input.map((test) => {
        const [nodeCount, edgeInfo, virusComputer] = test;
        const graph = Array.from({ length : nodeCount + 1 }, () => []);
        edgeInfo.forEach(([end, start, cost]) => {
            graph[start].push([end, cost]);
        });

        return dijkstra(virusComputer, nodeCount, graph)
    })

    let answer = '';
    result.forEach(([count, max]) => {
        answer += `${count} ${max}\n`;
    });
    console.log(answer);
}

solution(sInput);