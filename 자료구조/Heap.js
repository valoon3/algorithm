class Heap {
    constructor() {
        this.items = [];
    }

    swap(idx1, idx2) {
        [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
    }

    findParentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }

    findLeftChildIdx(idx) {
        return idx * 2 + 1;
    }

    findRightChildIdx(idx) {
        return idx * 2 + 2;
    }

    findParent(idx) {
        return this.items[this.findParentIdx(idx)];
    }

    findLeftChild(idx) {
        return this.items[this.findLeftChildIdx(idx)]
    }

    findRightChild(idx) {
        return this.items[this.findRightChildIdx(idx)];
    }

    size() {
        return this.items.length;
    }
}

// class MinHeap extends Heap{
//     bubbleUp() {
//         let index = this.items.length - 1;
//         let parentIndex = Math.floor((index - 1) / 2);
//
//         while(this.findParent(index) && this.findParent(index)[1] > this.items[index][1]) {
//             this.swap(index, this.findParentIdx(index));
//             index = this.findParent(index);
//         }
//     }
// }

class MinHeap {
    constructor() {
        this.heap = [];
    }

    length() {
        return this.heap.length;
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    shift() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return value;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        let parentIdx = Math.floor((index - 1) / 2);
        while (
            this.heap[parentIdx] &&
            this.heap[index][1] < this.heap[parentIdx][1]
            ) {
            this.swap(index, parentIdx);
            index = parentIdx;
            parentIdx = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftIdx = index * 2 + 1;
        let rightIdx = index * 2 + 2;

        while (
            (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[index][1]) ||
            (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[index][1])
            ) {
            let smallerIdx = leftIdx;
            if (
                this.heap[rightIdx] &&
                this.heap[rightIdx][1] < this.heap[smallerIdx][1]
            ) {
                smallerIdx = rightIdx;
            }

            this.swap(index, smallerIdx);
            index = smallerIdx;
            leftIdx = index * 2 + 1;
            rightIdx = index * 2 + 2;
        }
    }
}