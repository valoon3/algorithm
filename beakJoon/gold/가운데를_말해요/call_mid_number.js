const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync('./input.txt').toString().trim().split('\n');
input = input.map(info => Number(info));

function solution(input) {
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
    }
    // 큰 숫자중에 최소
    const minHeap = new Heap((a, b) => a < b);
    // 작은 숫자중에 최대
    const maxHeap = new Heap((a, b) => a > b);

    const result = [input[1]];
    result.push(Math.min(input[1], input[2]));
    maxHeap.push(Math.min(input[1], input[2]));
    minHeap.push(Math.max(input[1], input[2]));

    for(let i = 3; i < input.length; i ++) {
        let num = input[i];

        if(num > maxHeap.heap[0]) minHeap.push(num);
        else maxHeap.push(num);

        if(minHeap.length() > maxHeap.length()) {
            maxHeap.push(minHeap.shift());
        } else if(minHeap.length() + 1 < maxHeap.length()) {
            minHeap.push(maxHeap.shift());
        }
        result.push(maxHeap.heap[0]);
    }

    console.log(result.join('\n'));
}

solution(input);