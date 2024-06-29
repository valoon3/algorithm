const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [m, n] = input[0].split(' ').map(Number);
    const map = input.slice(1).map(t => t.split(' ').map(Number));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const moveAble = (y, x) => y >= 0 && x >= 0 && y < n && x < m;
    const tomato = Array.from({ length : n }, () => Array.from({ length: m }, () => Infinity));

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

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(map[i][j] === 1) {
                queue.push([i, j, 1]);
                tomato[i][j] = 1;
            }
        }
    }

    while(queue.length()) {
        const [y, x, dist] = queue.shift();

        for(const [dy, dx] of dirs) {
            const [ny, nx, nDist] = [y + dy, x + dx, dist + 1];

            if(!moveAble(ny, nx)) continue;
            if(map[ny][nx] === -1) continue;

            if(nDist < tomato[ny][nx]) {
                tomato[ny][nx] = nDist;
                queue.push([ny, nx, nDist]);
            }
        }
    }

    let answer = 0;

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(tomato[i][j] === Infinity) tomato[i][j] = 0;
            if(map[i][j] === 0 && tomato[i][j] === 0) return console.log(-1);
            answer = Math.max(tomato[i][j], answer);
        }
    }

    // console.log(tomato);
    console.log(answer-1);
}

solution(input);