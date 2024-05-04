const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input1.txt";
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// let input = fs.readFileSync('./input1.txt').toString().trim().split('\n');
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const [N, K] = input.shift().split(' ').map(Number);
    const jewelsInfo = input.splice(0, N).map(jewel => jewel.split(' ').map(Number));
    const begsInfo = input.splice(0, K).map(beg => Number(beg));
    return {N, K, jewelsInfo, begsInfo};
}

// N : 보석의 갯수, K : 가방의 갯수
// M : 보석의 무게, V: 보석의 가격

function solution({N, K, jewelsInfo, begsInfo}) {
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

    // 가방은 작은 순으로 채운다

    begsInfo.sort((a, b) => a - b);
    const jewelsHeap = new Heap((a, b) => a[0] < b[0]);
    jewelsInfo.forEach(jewel => jewelsHeap.push(jewel));
    const heap = new Heap((a, b) => a[1] > b[1]);

    let result = 0;

    begsInfo.forEach(begWeight => {
        while(jewelsHeap.length() && jewelsHeap.heap[0][0] <= begWeight) {
            heap.push(jewelsHeap.shift());
        }
        if(heap.length()) result += heap.shift()[1];
    })


    console.log(result);
}

solution(filter(input));