"use strict";

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

        while((this.heap[leftIndex] && this.heap[leftIndex][1] < this.heap[index][1]) ||
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
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
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
        const [villageCount, roadCount, partyPoint, roads] = filter(input);
        solution(villageCount, roadCount, partyPoint, roads);
        process.exit();
    });

function filter(input) {
    const [villageCount, roadCount, partyPoint] = input.shift().split(' ').map(Number);
    const roads = input.map(v => v.split(' ').map(Number));

    return [villageCount, roadCount, partyPoint, roads];
}

function solution(villageCount, roadCount, partyPoint, roads) {
    const goGraph = Array.from({ length : villageCount + 1 }, () => []);
    const backGraph = Array.from({ length : villageCount + 1 }, () => []);
    const costArr = Array(villageCount + 1).fill(Infinity);
    let result = 0;

    roads.forEach(([start, end, cost]) => {
        goGraph[start].push([end, cost]);
        backGraph[end].push([start, cost]);
    })

    const goDistance = dijkstra(goGraph);
    const backDistance = dijkstra(backGraph);

    for(let i = 1; i < goDistance.length; i ++) {
        result = Math.max(result, goDistance[i] + backDistance[i]);
    }

    console.log(result);

    function dijkstra(graph) {
        const minHeap = new MinHeap();
        minHeap.push([partyPoint, 0]);
        const distance = Array(villageCount + 1).fill(Infinity);
        distance[partyPoint] = 0;

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








}