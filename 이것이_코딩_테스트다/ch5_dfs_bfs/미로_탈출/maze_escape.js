// 괴물이 있는 부분 0, 없는 부분 1

const maze = [
    [1,0,1,0,1,0],
    [1,1,1,1,1,1],
    [0,0,0,0,0,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1]
];

const [escapeX,escapeY] = [maze[0].length-1, maze.length-1]; // escape point

const result = 10;

function solution(maze) {

    const bfs = function(x,y) {
        let queue = [];
        let dx = [-1,1,0,0];
        let dy = [0,0,-1,1];

        queue.push([x,y]);

        while(queue.length != 0) {
            let [x,y] = queue.shift();

            for(let i = 0; i < 4; i ++) {
                let [nx, ny] = [x + dx[i],y + dy[i]];

                if(nx < 0 || nx >= maze[0].length || ny < 0 || ny >= maze.length) {
                    continue;
                }

                if(maze[ny][nx] == 0) {
                    continue;
                }

                // 해당 노드를 처음 방문하는 경우에만 최단 거리 기록
                if(maze[ny][nx] == 1) {
                    maze[ny][nx] = maze[y][x] + 1;
                    queue.push([nx,ny]);
                }
            }

        }
    }

    bfs(0,0);
    console.log(maze[escapeY][escapeX]);

}

solution(maze);