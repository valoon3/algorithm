// let [queue1, queue2, result] = [[3, 2, 7, 2], [4, 6, 5, 1], 2];
let [queue1, queue2, result] = [[1, 2, 1, 2], [1, 10, 1, 2], 7];
// let [queue1, queue2, result] = [[1,1], [1,5], -1];


class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;   // 제일 앞 노드
        this.rear = null;
        this.length = 0;
    }

    push(data) {
        // 노드 추가.
        const node = new Node(data); // data를 가진 node를 만들어준다.
        if (!this.head) {
            // 헤드가 없을 경우 head를 해당 노드로
            this.head = node;
        } else {
            this.rear.next = node; // 아닐 경우 마지막의 다음 노드로
        }
        this.rear = node; // 마지막을 해당 노드로 한다.
        this.length++;
    }

    shift() {
        // 노드 삭제.
        if (!this.head) {
            // 헤드가 없으면 한 개도 없는 것이므로 false를 반환.
            return false;
        }
        const data = this.head.data; // head를 head의 다음 것으로 바꿔주고 뺀 data를 return
        this.head = this.head.next;
        this.length--;

        return data;
    }

    getQueue() {
        if (!this.head) return undefined;
        let node = this.head;
        const array = [];
        while (node) {
            // node가 없을 때까지 array에 추가한 후 반환해준다.
            array.push(node.data);
            node = node.next;
        }
        return array;
    }

}

function ___(queue1, queue2) {
    let answer = 0;

    let total = (arr) => {
        return arr.reduce((acc, cur) => {
            return acc + cur;
        }, 0);
    };

    let q1Total = total(queue1);
    let q2Total = total(queue2);

    let q1 = new Queue();
    let q2 = new Queue();
    queue1.forEach(data => {
        q1.push(data);
    });
    queue2.forEach(data => {
        q2.push(data);
    });

    let count = queue1.length * 2;
    let i = 0;

    while(i < count && q1Total != q2Total) {

        if(q1Total > q2Total) {
            let data = q1.shift();
            q2Total += data;
            q1Total -= data;
            q2.push(data);
            answer++;
        } else {
            let data = q2.shift();
            q1Total += data;
            q2Total -= data;
            q1.push(data);
            answer++;
        }

        i++;
    }


    if(q1Total != q2Total)
        return -1;

    return answer;
}

console.log(___(queue1, queue2));
