const board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,4,0,0,0],
    [0,0,0,0,0,4,4,0,0,0],
    [0,0,0,0,3,0,4,0,0,0],
    [0,0,0,2,3,0,0,0,5,5],
    [1,2,2,2,3,3,0,0,0,5],
    [1,1,1,0,0,0,0,0,0,5]
];
// result 2

function solution(board) {
    let answer = 0;
    let map = new Map;
    let visited = new Array(board[0].length).fill(true);
    let boardHigh = board.length;

    const findEmpty = (points) => {
        const ver = new Map;
        const hor = new Map;
        points.map(([x, y]) => {
            ver.set(x, (ver.get(x) || 0) + 1);
            hor.set(y, (hor.get(y) || 0) + 1);
        })
        const point1 = new Array(2);
        const point2 = new Array(2);

        if(ver.size === 2) {
            ver.forEach((value, key) => {
                if(value === 1) {
                    point1[0] = key;
                    point2[0] = key;
                }
            })

            hor.forEach((value, key) => {
                if(value === 1) {
                    if(!point1[1]) point1[1] = key;
                    else point2[1] = key;
                }
            })
        } else {
            hor.forEach((value, key) => {
                if(value === 1) {
                    point1[0] = key;
                    point2[0] = key;
                }
            })

            ver.forEach((value, key) => {
                if(value === 1) {
                    if(!point1[1]) point1[1] = key;
                    else point2[1] = key;
                }
            })
        }

        return [point1, point2];
    }

    const checkUpSide = ([x, y]) => {
        let i = x;
        if(board[i+1] && board[i+1][y] !== 0) return false;
        if(board[i+2] && board[i+2][y] !== 0) return false;
        if(board[i+3] && board[i+3][y] !== 0) return false;

        return true;
    }

    for(let i = 0; i < board.length; i ++) {
        const row = board[i];
        for(let j = 0; j < board[i].length; j ++) {
            const number = row[j];
            if(number !== 0) {
                if(!map.has(number)) {
                    map.set(number, [[i, j]]);
                } else {
                    map.get(number).push([i, j]);
                }
            }
        }
    }

    [...map.keys()].forEach(key => {
        console.log(map.get(key));
        console.log(findEmpty(map.get(key)));
        const [point1, point2] = findEmpty(map.get(key));

        // 위쪽이 방문 불가이면 생략
        if(visited[point1[1]] && visited[point2[1]]) {
            if(checkUpSide(point1) && checkUpSide(point2)) {
                map.get(key).forEach(([x, y]) => {
                    board[x][y] = 0;
                })
                answer ++;
            }
        } else {
            visited[point1[1]] = false;
            visited[point2[1]] = false;
        }
    })



    // console.log(map);

    return answer;
}

console.log(solution(board));