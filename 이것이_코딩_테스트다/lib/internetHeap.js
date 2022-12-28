class MinHeap {
    constructor() {
        this.heap = [ null ];
    }

    size() {
        return this.heap.length - 1;
    }

    getMin() {
        return this.heap[1] ? this.heap[1] : null;
    }

    swap(a, b) {
        [ this.heap[a], this.heap[b] ] = [ this.heap[b], this.heap[a] ];
    }


    heappush(value) {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parIdx = (curIdx / 2) >> 0;

        // 원래는 바로 primitive value를 입력받아 this.heap[parIdx] 와 this.heap[curIdx]를 비교했다.
        // 그러나 해당 문제에서 입력을 [요청시점, 실행시간]의 형태로 받을 것이고, 실행시간을 비교해 Heap을 구성할 것이므로 this.heap[pardIdx][1]...과 같이 비교한다.
        while(curIdx > 1 && this.heap[parIdx][1] > this.heap[curIdx][1]) {
            this.swap(parIdx, curIdx)
            curIdx = parIdx;
            parIdx = (curIdx / 2) >> 0;
        }
    }

    heappop() {
        const min = this.heap[1];
        if(this.heap.length <= 2) this.heap = [ null ];
        else this.heap[1] = this.heap.pop();

        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = curIdx * 2 + 1;

        if(!this.heap[leftIdx]) return min;
        if(!this.heap[rightIdx]) {
            // heapppush 에서와 동일한 이슈이다.
            if(this.heap[leftIdx][1] < this.heap[curIdx][1]) {
                this.swap(leftIdx, curIdx);
            }
            return min;
        }

        // heapppush 에서와 동일한 이슈이다.
        while(this.heap[leftIdx][1] < this.heap[curIdx][1] || this.heap[rightIdx][1] < this.heap[curIdx][1]) {
            const minIdx = this.heap[leftIdx][1] > this.heap[rightIdx][1] ? rightIdx : leftIdx;
            this.swap(minIdx, curIdx);
            curIdx = minIdx;
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;

            if(leftIdx >= this.size()) break;
        }

        return min;
    }
}