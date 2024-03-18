const [n, path, order] = [9, [[0,1],[0,3],[0,7],[8,1],[3,6],[1,2],[4,7],[7,5]], [[8,5],[6,7],[4,1]]]; // result true
// const [n, path, order] = [9, [[8,1],[0,1],[1,2],[0,7],[4,7],[0,3],[7,5],[3,6]], [[4,1],[5,2]]]; // result true
// const [n, path, order] = [9, [[0,1],[0,3],[0,7],[8,1],[3,6],[1,2],[4,7],[7,5]], [[4,1],[8,7],[6,5]]]; // result false

class Node {
    constructor(value) {
        this.value = value;
        this.next = null; // <node>
    }
}

class Queue {
    constructor() {
        this.head = null; // <node>
        this.tail = null; // <node>
        this.count = 0;
    }

    size() {
        return this.count;
    }

    push(data) {
        const newNode = new Node(data);
        if (!this.count) this.head = newNode;
        else this.tail.next = newNode;

        this.tail = newNode;
        this.count ++;
    }

    unshift(data) {
        const newNode = new Node(data);
        if(!this.count) {
            this.push(data);
        } else {
            newNode.next = this.head;
            this.head = newNode;
            this.count ++;
        }
    }

    shift() {
        if (!this.count) return undefined;
        this.count --;
        const result = this.head;
        this.head = this.head.next;

        return result;
    }
}

function solution(n, path, order) {
    const graph = Array.from({ length: n }, () => []);
    const canVisitArr = Array.from({ length: n }, () => true);
    const nextObject = new Array(n).fill(-1);
    const visitedArr = new Array(n).fill(false);
    const queue = new Queue();
    queue.push(0);

    for(const [from, to] of path) {
        graph[from].push(to);
        graph[to].push(from);
    }

    for(const [before, after] of order) {
        canVisitArr[after] = false;
        nextObject[before] = after;
    }


    let falseCount = 0;
    while(queue.size()) {
        const nodeValue = queue.shift().value;
        const next = nextObject[nodeValue];
        const canVisit = canVisitArr[nodeValue];

        // queue 내부의 모든 노드를 방문할 수 없으면 false 를 반환한다.
        if(falseCount > queue.size()) return false;

        // 노드를 방문할 수 없다면 다음 노드로 넘어간다.
        // falseCount 를 증가시킨다.
        if(!canVisit) {
            queue.push(nodeValue);
            falseCount ++;
        } else {
            console.log(nodeValue);
            // 방문 처리
            visitedArr[nodeValue] = true;
            falseCount = 0;
            canVisitArr[next] = true;

            // 연결된 노드들을 queue 에 추가한다.
            for(const nextNode of graph[nodeValue]) {
                if(!visitedArr[nextNode]) {
                    if(canVisitArr[nextNode]) queue.unshift(nextNode);
                    else queue.push(nextNode);
                }
            }
        }
    }

    return true;
}

console.log(solution(n, path, order));
