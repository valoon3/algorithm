class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor(datas) {
        this.front = null;
        this.rear = null;
        this.size = 0;

        if(typeof datas === 'object') {
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