// const [bridge_length, weight, truck_weights] = [2, 10, [7,4,5,6]]; // result 8
// const [bridge_length, weight, truck_weights] = [100, 100, [10]]; // result 101
const [bridge_length, weight, truck_weights] = [100, 100, [10,10,10,10,10,10,10,10,10,10]]; // result 110

class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor(array) {
        this.front = null;
        this.rear = null;
        this.size = 0;

        if(array !== undefined) {
            array.forEach(data => {
                this.push(data);
            })
        }
    }

    isEmpty() {
        return this.size === 0;
    }

    length() {
        return this.size;
    }

    getFront() {
        return this.length() === 0 ? undefined : this.front.data;
    }

    push(data) {
        const newNode = new Node(data);
        if(this.isEmpty()) this.front = newNode;
        else this.rear.next = newNode;
        this.rear = newNode;
        this.size++;
    }

    shift() {
        if(this.isEmpty()) return;
        const data = this.front.data;
        this.front = this.front.next;
        this.size--;
        return data;
    }
}

function solution(bridge_length, weight, truck_weights) {
    const bridge = new Queue();
    for(let i = 0; i < bridge_length; i++) {
        bridge.push(0);
    }
    const _truck_weights = new Queue(truck_weights);
    let onBridgeWeight = 0;
    let time = 0;

    while(_truck_weights.length() > 0 || bridge.length() > 0) {
        onBridgeWeight -= bridge.shift();

        if(_truck_weights.length() !== 0 && onBridgeWeight + _truck_weights.getFront() <= weight) {
            const truck = _truck_weights.shift();
            onBridgeWeight += truck;
            bridge.push(truck);
        } else {
            bridge.push(0);
        }

        time ++;
        if(onBridgeWeight === 0) break;
    }

    return time;
}

console.log(solution(bridge_length, weight, truck_weights));

