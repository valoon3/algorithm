// const [rectangle, characterX, characterY, itemX, itemY] = [[[1,1,7,4],[3,2,5,5],[4,3,6,9],[2,6,8,8]], 1,3,7,8]; // result 17
// const [rectangle, characterX, characterY, itemX, itemY] = [[[1,1,8,4],[2,2,4,9],[3,6,9,8],[6,3,7,7]], 9,7,6,1]; // result 11
// const [rectangle, characterX, characterY, itemX, itemY] = [[[1,1,5,7]],1,1,4,7]; // result 9
const [rectangle, characterX, characterY, itemX, itemY] = [[[2,1,7,5],[6,4,10,10]], 3,1,7,10]; // result 15
// const [rectangle, characterX, characterY, itemX, itemY] = [[[2,2,5,5],[1,3,6,4],[3,1,4,6]], 1,4,6,3]; // result 10

function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = Infinity;
    const map = Array.from({ length: 102}, () => Array.from({length: 102}, () => 0));
    const dirs = [
        [0,1],   //right
        [0 ,-1], // left
        [1, 0],  // up
        [-1, 0]  // down
    ];

    // drawing map
    rectangle.forEach((rec, index) => {
        const [x1, y1, x2, y2] = rec.map(v => v * 2);

        // 테두리 그리기
        for(let x = x1; x <= x2; x ++) {
            if(map[y1][x] !== 2) map[y1][x] = 1;
            if(map[y2][x] !== 2) map[y2][x] = 1;
        }
        for(let y = y1; y <= y2; y ++) {
            if(map[y][x1] !== 2) map[y][x1] = 1;
            if(map[y][x2] !== 2) map[y][x2] = 1;
        }
        // 내부 그리기
        for(let x = x1 + 1; x < x2; x ++) {
            for(let y = y1 + 1; y < y2; y ++) {
                map[y][x] = 2;
            }
        }
    })

    map.forEach((value, index) => console.log((index%2 == 0 ? index/2  + '번째 줄 : ' + value : '')));

    const bfs = function(characterX, characterY, itemX, itemY, count = 0) {
        if(characterX === itemX && characterY === itemY) {
            if(count / 2 < answer) answer = count / 2;
            return;
        }

        map[characterY][characterX] = 0;

        dirs.forEach(([dirX, dirY]) => {
            let x = characterX + dirX;
            let y = characterY + dirY;
            if(map[y][x] === 1) {
                bfs(x, y, itemX, itemY, count + 1);
            }
        })

        return count;
    }

    bfs(characterX * 2, characterY * 2, itemX * 2, itemY * 2);

    return answer;
}

console.log(solution(rectangle, characterX, characterY, itemX, itemY));