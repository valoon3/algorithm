// const [n, build_frame] = [5,
//     [
//         [1,0,0,1],
//         [1,1,1,1],
//         [2,1,0,1],
//         [2,2,1,1],
//         [5,0,0,1],
//         [5,1,0,1],
//         [4,2,1,1],
//         [3,2,1,1]
//     ]
// ];
// result [[1,0,0],[1,1,1],[2,1,0],[2,2,1],[3,2,1],[4,2,1],[5,0,0],[5,1,0]]

const [n, build_frame] = [5,
    [
        [0,0,0,1],
        [2,0,0,1],
        [4,0,0,1],
        [0,1,1,1],
        [1,1,1,1],
        [2,1,1,1],
        [3,1,1,1],
        [2,0,0,0],
        [1,1,1,0],
        [2,2,0,1]
    ]
];
// result [[0,0,0],[0,1,1],[1,1,1],[2,1,1],[3,1,1],[4,0,0]]

function solution(n, build_frame) {
    // 기둥 1 보 2
    const map = Array.from({ length : n + 1 }, () => Array.from({ length: n + 1 }, () => 0));
    const result = [];

    const buildPillar = (x, y) => {
        // 건설 가능
        if(y === 0 || map[y - 1][x] === 1 || map[y][x - 1] === 2) {
            map[y][x] = 1;
        }
    }

    const buildBo = (x, y) => {
        if(map[y - 1][x] === 1 || map[y - 1][x + 1]) { // 밑에 기둥이 있거나 밑에 오른쪽에 기둥이 있거나
            map[y][x] = 2;
        } else if(map[y][x - 1] && map[y][x - 1] === 2 && map[y][x + 1] && map[y][x + 1] === 2) { // 양쪽에 보가 있거나
            map[y][x] = 2;
        }
    }

    const checkRightSidePillar = (x, y) => {
        if(map[y - 1][x + 1] && map[y - 1][x + 1] === 1) return true;
        else {
            if(map[y][x + 1] && map[y][x + 1] === 2) {
                return checkRightSidePillar(x + 1, y);
            }
            return false;
        }
    }

    const checkLeftSidePillar = (x, y) => {
        if(map[y - 1][x - 1] && map[y-1][x-1] === 1) return true;
        else {
            if(map[y][x - 1] && map[y][x - 1] === 2) {
                return checkLeftSidePillar(x - 1, y);
            }
            return false;
        }
    }

    const removePillar = (x, y) => {
        map[y][x] = 0;

        // 바로 아래 위에 기둥이 존재하는 경우
        if(map[y + 1][x] && map[y + 1][x] === 1) {
            removePillar(x, y + 1);
        }

        // 오른쪽 방향으로 있는 보가 존재하는 경우
        if(map[y + 1][x] && map[y + 1][x] === 2) {
            if(!checkRightSidePillar(x, y + 1)) {
                removeBo(x, y + 1);
            }
        }

        if(!checkRightSidePillar(x, y + 1) || !checkLeftSidePillar(x - 1, y + 1)) {

        }

        if(map[y + 1][x - 1] && map[y + 1][x - 1] === 2) {
            if(!checkLeftSidePillar(x-1, y+1)) {
                removeBo(x-1, y+1);
            }
        }

        // 왼쪽 방향으로 있는 보가 존재하는 경우
    }

    const removeBo = (x, y) => {
        map[y][x] = 0;

        // 자신에게 의존하고 있는것
        if(map[y][x + 1] && map[y][x + 1] === 2) {
            removeBo(x + 1, y);
        }
    }

    // a: 0 기둥 1 보
    // b: 0 삭제 1 설치
    build_frame.forEach(([x, y, a, b]) => {
        if(a === 0 && b === 1) {
            buildPillar(x, y);
        }else if(a === 1 && b === 1) {
            buildBo(x, y);
        }
    });

    for(let i = 0; i <= n; i ++) {
        for(let j = 0; j <= n; j ++) {
            const v = map[j][i];
            if(v === 1) result.push([i, j, 0]);
            if(v === 2) result.push([i, j, 1]);
        }
    }

    console.log(map);

    return result;
}

console.log(solution(n, build_frame));