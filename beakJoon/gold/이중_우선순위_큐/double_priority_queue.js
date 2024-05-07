const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const readline = require('readline');

function filter(input) {
    input.shift();
    const testCase = [];

    while(input.length) {
        const count = Number(input.shift());
        const test = input.splice(0, count).map(test => test.split(' '));
        testCase.push(test);
    }
    return testCase;
}

function solution(testCases) {
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

        top() {
            return this.heap[0];
        }
    }

    let answer = [];

    testCases.forEach(testCase => {
        const maxHeap = new Heap((a, b) => a[1] > b[1]);
        const minHeap = new Heap((a, b) => a[1] < b[1]);
        testCase.forEach(([order, priority]) => {
            priority = Number(priority);
            if(order === 'I') {
                let arr = [true, priority];
                maxHeap.push(arr);
                minHeap.push(arr);
            } else if(order === 'D') {
                if(priority === 1) {
                    let temp = maxHeap.shift();
                    if(temp) temp[0] = false;
                } else {
                    let temp = minHeap.shift();
                    if(temp) temp[0] = false;
                }
            }


            while(maxHeap.length() > 0 && !maxHeap.heap[0][0]) maxHeap.shift();
            while(minHeap.length() > 0 && !minHeap.heap[0][0]) minHeap.shift();

            // console.log(order, priority);
            // console.log(maxHeap.heap);
            // console.log(minHeap.heap);
        })

        maxHeap.length() === 0 ? answer.push('EMPTY') : answer.push(`${maxHeap.top()[1]} ${minHeap.top()[1]}`);
    });

    console.log(answer.join('\n'));
}

solution(filter(input));