const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m] = input[0].split(' ').map(Number);
    const map = input.slice(1).map(t => t.split(''));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const moveAble = (y, x) => y >= 0 && x >= 0 && y < n && x < m;

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

    const bfs = (queue, visited) => {
        let max = 0;

        while(queue.length() !== 0) {
            const [y, x, dist] = queue.shift();

            max = Math.max(max, dist);

            // visited[y][x] = true;

            for(const [dy, dx] of dirs) {
                const [ny, nx] = [y + dy, x + dx];

                if(moveAble(ny, nx) && visited[ny][nx] === false && map[ny][nx] === 'L') {
                    visited[ny][nx] = true;
                    queue.push([ny, nx, dist + 1]);
                }
            }
        }

        return max;
    }

    let answer = 0;

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(map[i][j] === 'L') {
                const queue = new Queue();
                queue.push([i, j, 0]);
                const visited = Array.from({ length : n }, () => Array.from({ length : m }, () => false))
                visited[i][j] = true;
                const an = bfs(queue, visited);
                answer = Math.max(answer, an);
            }
        }
    }

    console.log(answer);
}

solution(input);