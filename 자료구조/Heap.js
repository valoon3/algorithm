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
        return this.items[this.findParentIdx(idx)];
    }

    size() {
        return this.items.length;
    }
}

class MinHeap extends Heap{
    bubbleUp() {
        let index = this.items.length - 1;

        while(this.findParent(index) && this.findParent(index)[1] > this.items[index][1]) {
            this.swap(index, this.findParentIdx(index));
            index = this.findParent(index);
        }
    }
}