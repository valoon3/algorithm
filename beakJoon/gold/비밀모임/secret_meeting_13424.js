const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const T = Number(input.shift());

function filter(input) {
    const result = [];

    for(let i = 0; i < T; i ++) {
        const [roomCount, edgeCount] = input.shift().split(' ').map(Number);
        const edges = input.splice(0, edgeCount).map(edge => edge.split(' ').map(Number));
        input.shift();
        const friendPoint = input.shift().split(' ').map(Number);
        result.push([roomCount, edgeCount, edges, friendPoint]);
    }

    return result;
}

const newInput = filter(input);

function solution(newInput) {
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

        while(heap.length()) {
            const [currentNode, currentCost] = heap.shift();

            if(visited[currentNode]) continue;
            visited[currentNode] = true;

            graph[currentNode].forEach(([nextNode, nextCost]) => {
                const newCost = currentCost + nextCost;

                if(newCost < distance[nextNode]) {
                    distance[nextNode] = newCost;
                    heap.push([nextNode, newCost]);
                }

            });
        }
        return distance;
    }

    const result = [];

    newInput.forEach(([roomCount, edgesCount, edges, friendPoints]) => {
        const graph = Array.from({ length : roomCount + 1 }, () => []);
        edges.forEach(([start, end, cost]) => {
            graph[start].push([end, cost]);
            graph[end].push([start, cost]);
        });
        const distances = [];
        friendPoints.forEach(point => {
            distances.push(dijkstra(point, roomCount, graph));
        });

        let min = Infinity;
        let point = 0;
        for(let i = 1; i <= roomCount; i ++) {
            let sum = 0;
            distances.forEach(distance => {
                sum += distance[i];
            });
            if(sum < min) {
                min = sum;
                point = i;
            }
        }
        result.push(point);
    })

    console.log(result.join('\n'));
}

solution(newInput);
