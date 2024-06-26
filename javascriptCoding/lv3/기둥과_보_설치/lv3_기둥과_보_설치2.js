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
    // 기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 합니다.
    // 보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 합니다.
    // [x, y, a, b] = [가로 좌표, 세로 좌표, type, isInstall]
    // type: 0(기둥), 1(보)
    // isInstall: 0(삭제), 1(설치)

    // build_frame 원소를 차례로 검사하면서
    // 추가 가능하면 추가해주고, 삭제 가능하면 삭제해준다.

    const frames = [];
    build_frame.forEach((frame) => {
        const [x, y, type, isInstall] = frame;

        if (isInstall) {
            // 설치
            if (checkAdd(x, y, type, frames)) frames.push([x, y, type]);
        }
        // 제거
        else checkDelete(x, y, type, frames);
    })
    // x 좌표 기준 오름차 순 정렬, 같다면 y좌표 오름차 순, 모두 같다면 기둥이 보보다 앞으로
    return frames.sort((a, b) => a[0] === b[0] ? a[1] === b[1] ? a[2] - b[2] : a[1] - b[1] : a[0] - b[0]);
}

function checkAdd(x, y, type, frames) {
    if (type) {
        // 보인 경우
        // 1. frames 중에 보이면서 ny = y 이면서 nx가 x-1인게 있고, nx가 x+1인거 있으면 참
        // 2. frames 중에 기둥이면서 nx === x 이면서 ny === y-1인게 있으면 참
        // 3. frames 중에 기둥이면서 nx = x + 1, ny = y + -1 인게 있으면 참
        if (frames.find(([nx, ny, ntype]) => !ntype && nx === x && ny === y - 1)) return true;
        if (frames.find(([nx, ny, ntype]) => !ntype && nx === x + 1 && ny === y - 1)) return true;
        if (frames.find(([nx, ny, ntype]) => ntype && ny === y && nx === x - 1) &&
            frames.find(([nx, ny, ntype]) => ntype && ny === y && nx === x + 1)) return true;
        return false;
    } else {
        // 기둥인 경우
        // 1. y === 0 이면 무조건 참
        // 2. 기둥이면서 x는 같고, ny = y-1 인게 있으면 참
        // 3. 보이면서 x, y 같은게 있으면 참
        // 4. 보이면서 nx = x - 1, ny = y인게 있으면 참
        // some 함수로 대체 가능
        if (y === 0) return true;
        if (frames.find(([nx, ny, ntype]) => !ntype && nx === x && ny === y - 1)) return true;
        if (frames.find(([nx, ny, ntype]) => ntype && nx === x && ny === y)) return true;
        if (frames.find(([nx, ny, ntype]) => ntype && nx === x - 1 && ny === y)) return true;
        return false;
    }
}

function checkDelete(x, y, type, frames) {
    // 프레임 배열 복사
    const copy = frames.slice();

    // 삭제될 인덱스 검색
    // filter 함수로 대체 가능
    const delIdx = copy.findIndex(([nx, ny, ntype]) => type === ntype && x === nx && y === ny);
    copy.splice(delIdx, 1);

    // 제거된 상태에서 프레임들이 조건을 모두 만족하는지 검사
    for (let frame of copy) {
        const [nx, ny, ntype] = frame;
        if (!checkAdd(nx, ny, ntype, copy)) return;
    }

    frames.splice(delIdx, 1);
}

console.log(solution(n, build_frame));