const [maps, answer] = [[[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]], 11];
// const [maps, answer] =[[[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]], -1];

function solution(maps) {
    let answer = 0;
    let endPoint = [maps[0].length-1, maps.length-1];

    let queue = [[0,0,1]];
    while(queue.length !== 0) {
        let [x, y, level] = queue.shift();
        if(x == endPoint[0] && y == endPoint[1]) {
            answer = level;
            break;
        }

        if(x+1 < maps[0].length && maps[y][x+1] == 1) { // 오른쪽 검색
            maps[y][x+1] = 0;
            queue.push([x+1, y, level+1]);
        }
        if(y+1 < maps.length && maps[y+1][x] == 1) { // 아래 검색
            maps[y+1][x] = 0;
            queue.push([x, y+1, level+1]);
        }
        if(y-1 >= 0 && maps[y-1][x] == 1) { // 위 검색
            maps[y-1][x] = 0;
            queue.push([x, y-1, level+1]);
        }
        if(x-1 >= 0 && maps[y][x-1] == 1) { // 왼쪽 검색
            maps[y][x-1] = 0;
            queue.push([x-1, y, level+1]);
        }
    }

    if(answer == 0) {
        return -1;
    }

    return answer;
}

console.log(solution(maps, answer));


