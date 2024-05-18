const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const courseCount = Number(input.shift());
const course = input.map(course => course.split(' ').map(Number));

function solution(courseCount, course) {
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
            if(this.heap.length === 1) return this.heap.pop();

            const result = this.heap[0];
            this.swap(0, this.heap.length - 1);
            this.heap.pop();
            this.bubbleDown();

            return result;
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
    }

    const minHeap = new Heap((a, b) => a < b);

    course.sort((a,b) => {
        if(a[0] === b[0]) {
            return a[1] - b[1];
        } else {
            return a[0] - b[0];
        }
    })
    let answer = 0;
    course.forEach(course => {
        const [start, end] = course;

        if(minHeap.length() === 0) minHeap.push(end);
        else {
            while(minHeap.length() > 0 && minHeap.heap[0] <= start) {
                minHeap.shift();
            }
            minHeap.push(end);
        }
        answer = Math.max(answer, minHeap.length());
    })

    console.log(answer);
}

solution(courseCount, course);
