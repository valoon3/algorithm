const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [nodeCount, edgeCount, startNode, edges] = filter(input);
        solution(nodeCount, edgeCount, startNode, edges);
        process.exit();
    });

class MinHeap {
    constructor() {
        this.nodes = [];
    }

    push(data) {
        this.nodes.push(data);
        this.bubbleUp();
    }

    pop() {
        if(this.nodes.length === 0) return undefined;
        if(this.nodes.length === 1) return this.nodes.pop();

        const result = this.nodes[0];
        this.nodes[0] = this.nodes.pop();
        this.bubbleDown();

        return result;
    }

    bubbleDown() {
        let index = 0; // 루트 노드 인덱스
        let leftIndex = index * 2 + 1; // 왼쪽 자식 노드 인덱스
        let rightIndex = index * 2 + 2; // 오른쪽 자식 노드 인덱스

        while(
            (this.nodes[leftIndex] && this.nodes[leftIndex][1] < this.nodes[index][1])
        || (this.nodes[rightIndex] && this.nodes[rightIndex][1] < this.nodes[index][1])
            ) {
            let minChildIndex = leftIndex;
            if(this.nodes[rightIndex] && this.nodes[rightIndex][1] < this.nodes[leftIndex][1]) {
                minChildIndex = rightIndex;
            }
            this.swap(index, minChildIndex);
            index = minChildIndex;
            leftIndex = index * 2 + 1;
            rightIndex = index * 2 + 2;
        }
    }

    minChildNodeIndex(popIndex) {
        const leftIndex = popIndex * 2;
        const rightIndex = popIndex * 2 + 1;

        // 왼쪽 노드가 없는 경우
        if(leftIndex >= this.nodes.length) return false;
        // 오른쪽 노드가 없는 경우
        else if(rightIndex >= this.nodes.length) return leftIndex;
        // 둘 다 있는 경우
        else return this.nodes[leftIndex][1] < this.nodes[rightIndex][1] ? leftIndex : rightIndex;
    }

    bubbleUp() {
        let index = this.nodes.length - 1; // 새로운 노드가 추가된 위치
        let parentIndex = Math.floor((index - 1) / 2); // 부모 노드의 위치
        while (
            this.nodes[parentIndex] && // 부모 노드가 존재하고
            this.nodes[index][1] < this.nodes[parentIndex][1] // 새로운 노드가 부모 노드보다 작은 경우
            ) {
            this.swap(index, parentIndex); // 두 노드의 값을 교체
            index = parentIndex; // 인덱스를 부모 노드의 인덱스로 변경
            parentIndex = Math.floor((index - 1) / 2); // 새로운 부모 노드의 인덱스 계산
        }
    }

    swap(index1, index2) {
        [this.nodes[index1], this.nodes[index2]] = [this.nodes[index2], this.nodes[index1]];
    }

    length() {
        return this.nodes.length;
    }
}

function filter(input) {
    const [nodeCount, edgeCount] = input.shift().split(' ').map(Number);
    const startNode = Number(input.shift());
    const edges = input.map(v => v.split(' ').map(Number));

    return [nodeCount, edgeCount, startNode, edges];
}

function solution(nodeCount, edgeCount, startNode, edges) {
    const costArr = Array(nodeCount + 1).fill(Infinity);
    const visitedNode = Array(nodeCount + 1).fill(false);
    costArr[startNode] = 0;

    const graph = Array.from({ length : nodeCount + 1 }, () => []);

    const minHeap = new MinHeap();
    minHeap.push([startNode, 0]);

    edges.forEach(([startNode, endNode, cost]) => {
        graph[startNode].push([endNode, cost]);
    })

    while(minHeap.length()) {
        const [curNode, cost] = minHeap.pop();
        if(visitedNode[curNode]) continue;

        visitedNode[curNode] = true;
        graph[curNode].forEach(([nextNode, nextCost]) => {
            if(costArr[nextNode] >= costArr[curNode] + nextCost) {
                costArr[nextNode] = costArr[curNode] + nextCost;
                minHeap.push([nextNode, costArr[nextNode]]);
            }
        })
    }

    console.log(
        costArr
            .map(i => (i === Infinity ? "INF" : i))
            .slice(1)
            .join("\n")
    );
}