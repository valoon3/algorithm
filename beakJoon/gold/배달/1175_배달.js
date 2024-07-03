const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
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

    const [n, m] = input[0].split(' ').map(Number);
    const map = input.slice(1).map(t => t.split(''));
    const moveAble = (y, x) => y >= 0 && x >= 0 && y < n && x < m;
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const start = [0];
    const dp = Array.from({ length : n }, () => Array.from({ length : m }, () => Array.from({ length : 4 }, () => Array.from({ length : 2 }, () => Array.from({ length : 2 }, () => Infinity)))));

    for(let i = 0; i < n; i ++) {
        for(let j = 0; j < m; j ++) {
            if(map[i][j] === 'C') {
                start.push([i, j]);
            } else if(map[i][j] === 'S') {
                start[0] = [i, j];
            }
        }
        // if(start.length === 3) break;
    }

    // console.log(start);

    const queue = new Queue();
    queue.push([start[0][0], start[0][1], 0, 4, 0, 0]); // y, x, cost, preDirIndex, v1, v2

    const [v1y, v1x] = start[1];

    const bfs = () => {
        while(queue.length()) {
            const [y, x, cost, preDirIndex, v1, v2] = queue.shift();

            if(v1 === 1 && v2 === 1) {
                return cost;
            }

            // if(preDirIndex !== 4) dp[y][x][preDirIndex][v1][v2] = cost;

            for(let i = 0; i < 4; i ++) {
                // if(i === preDirIndex) continue;

                const [dy, dx] = dirs[i];
                const [ny, nx] = [y + dy, x + dx];

                if(i !== preDirIndex && moveAble(ny, nx) && map[ny][nx] !== '#' && dp[ny][nx][i][v1][v2] > cost + 1) {
                    if(map[ny][nx] === 'C') {
                        if(ny === start[1][0] && nx === start[1][1]) {
                            queue.push([ny, nx, cost + 1, i, 1, v2]);
                            dp[ny][nx][i][1][v2] = cost + 1;
                        }
                        else {
                            queue.push([ny, nx, cost + 1, i, v1, 1]);
                            dp[ny][nx][i][v1][1] = cost + 1;
                        }
                    } else {
                        queue.push([ny, nx, cost + 1, i, v1, v2]);
                        dp[ny][nx][i][v1][v2] = cost + 1;
                    }
                }
            }
        }

        return -1;
    }

    console.log(bfs());
}

solution(input);