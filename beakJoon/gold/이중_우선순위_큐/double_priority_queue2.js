const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');



function filter(input) {
    class Node {
        constructor(data){
            this.data = data;
            this.next = null;
        }
    }

    class Queue {
        constructor() {
            this.front = null;
            this.rear = null;
            this.size = 0;
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
    const queue = new Queue();
    input.forEach((line) => queue.push(line));
    queue.shift();
    const testCase = [];

    while(queue.length()) {
        const count = Number(queue.shift());
        const test = [];
        for(let i = 0; i < count; i ++) {
            const [order, value] = queue.shift().split(' ');
            test.push([order, value]);
        }
        testCase.push(test);
    }
    return testCase;
}

function solution(testCases) {
    class BinarySearchTree {
        constructor() {
            this.root = null;
            this.size = 0;
        }

        insert(value) {
            let newNode = {value, left : null, right: null};
            this.size ++;

            if(this.root === null) this.root = newNode;
            else this.insertNode(this.root, newNode);
        }

        insertNode(node, newNode) {
            if(newNode.value < node.value) {
                if(node.left === null) node.left = newNode;
                else this.insertNode(node.left, newNode);
            } else {
                if(node.right === null) node.right = newNode;
                else this.insertNode(node.right, newNode);
            }
        }

        remove(value) {
            this.root = this.removeNode(this.root, value);
            this.size --;
        }

        removeMax() {
            if(this.root === null) return null;
            else {
                let node = this.root;
                while(node.right) {
                    node = node.right;
                }
                let value = node.value;
                this.remove(value);
                return value;
            }
        }

        removeMin() {
            if(this.root === null) return null;
            else {
                let node = this.root;
                while(node.left) {
                    node = node.left;
                }

                let value = node.value;
                this.remove(value);
                return value;
            }
        }

        removeNode(node, value) {
            if(node === null) return null;
            else if(value < node.value) {
                node.left = this.removeNode(node.left, value);
                return node;
            } else if(value > node.value) {
                node.right = this.removeNode(node.right, value);
                return node;
            } else {
                if(node.left === null && node.right === null) {
                    node = null;
                    return node;
                }

                if(node.left === null) {
                    node = node.right;
                    return node;
                } else if(node.right === null) {
                    node = node.left;
                    return node;
                }
            }
        }
    }

    let answer = [];

    testCases.forEach(testCase => {
        const bst = new BinarySearchTree();
        testCase.forEach(([order, value]) => {
            if(order === 'I') {
                bst.insert(Number(value));
            } else {
                if(value === '1') {
                    bst.removeMax();
                } else {
                    bst.removeMin();
                }
            }
        });
        bst.size === 0 ? answer.push('EMPTY') : answer.push(`${bst.removeMax()} ${bst.removeMin()}`);
    });

    console.log(answer.join('\n'));
}

solution(filter(input));