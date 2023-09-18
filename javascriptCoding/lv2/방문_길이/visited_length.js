const dirs = 'ULURRDLLU'; // result 7
// const dirs = 'LULLLLLLU'; // result 7

function solution(dirs) {
    const visited = [];
    const status = {x : 0, y : 0};
    let answer = 0;


    const inMap = (x, y) => {
        if(x < -5 || x > 5 || y < -5 || y > 5) return false;
        return true;
    }

    const direction = (dir, status) => {
        switch(dir) {
            case 'U':
                if(inMap(status.x, status.y + 1)) status.y ++;
                break;
            case 'D':
                if(inMap(status.x, status.y - 1)) status.y --;
                break;
            case 'L':
                if(inMap(status.x - 1, status.y)) status.x --;
                break;
            case 'R':
                if(inMap(status.x + 1, status.y)) status.x ++;
                break;
        }
        return [status.x, status.y];
    }

    for(let i = 0; i < dirs.length; i ++) {
        let dir = dirs[i];
        let point = [status.x, status.y];
        let toPoint = direction(dir, status);

        // 이동이 맵을 벗어날 경우 다음명령어로 넘어간다.
        if(point[0] === toPoint[0] && point[1] === toPoint[1]) continue;

        if(visited.length === 0) visited.push([point[0], point[1], toPoint[0], toPoint[1]]);

        for(let j = 0; j < visited.length; j ++) {
            const newDirectionArray = [point[0], point[1], toPoint[0], toPoint[1]];
            const visitedDirectionArray1 = [visited[j][0], visited[j][1], visited[j][2], visited[j][3]];
            const visitedDirectionArray2 = [visited[j][2], visited[j][3], visited[j][0], visited[j][1]];

            // 이미 존재하는 경우
            if(newDirectionArray.join() === visitedDirectionArray1.join() || newDirectionArray.join() === visitedDirectionArray2.join()) {
                break;
            }

            if(j === visited.length - 1) {
                visited.push(newDirectionArray);
                answer ++;
            }
        }
    }

    return visited.length;
}

console.log(solution(dirs));
// console.log([0,1,2].join() === [0,1,2].join());