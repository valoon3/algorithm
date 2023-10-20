// const [n, paths, gates, summits] = [6, [[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]]	, [1, 3]	, [5]	];
// result [5,3]

// const [n, paths, gates, summits] = [7, [[1, 4, 4], [1, 6, 1], [1, 7, 3], [2, 5, 2], [3, 7, 4], [5, 6, 6]]	, [1]	, [2, 3, 4]	];
// result [3,4]

// const [n, paths, gates, summits] = [7, [[1, 2, 5], [1, 4, 1], [2, 3, 1], [2, 6, 7], [4, 5, 1], [5, 6, 1], [6, 7, 1]]	, [3, 7]	, [1,5]];
// result [5,1]

const [n, paths, gates, summits] = [5, [[1, 3, 10], [1, 4, 20], [2, 3, 4], [2, 4, 6], [3, 5, 20], [4, 5, 6]]	, [1, 2]	, [5]];
// result [5,6]

// const [n, paths, gates, summits] = [7, [[1, 4, 4], [1, 6, 1], [1, 7, 3], [2, 5, 2], [3, 7, 4], [5, 6, 6]], [2], [3, 4]];
// result [3,6]

class Node {
    constructor(number) {
        this.value = number;
        this.next = null;
    }
}

class Heap {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(value) {
        let node = new Node(value);
        if(!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    shift() {
        if(!this.head) return;
        let value = this.head.value;
        this.head = this.head.next;
        return value;
    }

    isEmpty() {
        return !this.head;
    }

    print() {
        let node = this.head;
        let result = [];
        while(node) {
            result.push(node.value);
            node = node.next;
        }

        return result;
    }
}

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

function solution(n, paths, gates, summits) {
    const costDp = Array.from({length: n + 1}, () => Infinity);
    const map = Array.from({length: n + 1}, () => []);
    const q = new MinHeap();
    const visited = new Array(n+1).fill(false);
    const types = new Array(n + 1).fill('course');
    summits.sort((a,b) => a - b);

    gates.forEach(gate => {
        q.push([gate, 0]);
        types[gate] = 'gate';
        costDp[gate] = 0;
    })

    summits.forEach(summit => {
        visited[summit] = true;
        types[summit] = 'summit';
    })

    paths.forEach(([start, end, cost]) => {
        if(types[start] !== 'summit' && types[end] !== 'gate') {
            map[start].push([end, cost]);
        }

        if(types[end] !== 'summit' && types[start] !== 'gate') {
            map[end].push([start, cost]);
        }
    })

    // console.log('costDp : ', costDp, ' ', 'q : ', q.print());

    while(q.length()) {
        const [nowPoint, intensity] = q.shift();
        // 갈 수 있는 노드가 없으면 생략
        if(!map[nowPoint].length) continue;

        if(costDp[nowPoint] < intensity) continue;

        for(let [endPoint, cost] of map[nowPoint]) {
            // if(cost > costDp[endPoint]) continue;
            cost = Math.max(intensity, cost);

            if(cost < costDp[endPoint]) {
                costDp[endPoint] = cost;
                if(!visited[endPoint]) q.push([endPoint, cost]);
                visited[nowPoint] = true;
            }
        }
        // console.log('costDp : ', costDp, ' ', 'q : ', q.print());
    }

    const result = [0, Infinity];

    console.log(costDp);

    summits.forEach(summit => {
        if(costDp[summit] < result[1]) {
            result[0] = summit;
            result[1] = costDp[summit];
        }
    })

    return result;
}

console.log(solution(n, paths, gates, summits));