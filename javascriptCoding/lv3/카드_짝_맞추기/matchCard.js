const [board, r, c] =[[[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]], 1, 0]
//result 14
// const [board, r, c] = [[[3, 0, 0, 2], [0, 0, 1, 0], [0, 1, 0, 0], [2, 0, 0, 3]], 0, 1]
//result 16

function solution(board, r, c) {
    const newBoard = board.slice();
    const cardPos = new Map();

    const isMovable = (y, x) => {
        return -1 < y && y < 4 && -1 < x && x < 4;
    }

    // ctrl + 방향키 이동
// 입력된 방향과 가장 가까이 있는 카드 좌표 반환
    const ctrl_move = (y, x, dy, dx, board) => {
        // x, y는 현재 카드의 좌표, dx, dy는 이동 방향
        let ny = y, nx = x;
        while (true) {
            // 따라서 nnx, nny는 이동방향이 적용된 후 좌표
            const nny = ny + dy;
            const nnx = nx + dx;
            // 해당 이동방향으로 갈 수 없다면 현재 좌표 반환
            if(!isMovable(nny, nnx)) return [ny, nx];
            // 이동 방향 좌표에 카드가 있다면 해당 좌표 반환
            if(board[nny][nnx]) return [nny, nnx];
            // 카드가 없는 경우 동일한 방향으로 계속 진행해야 하므로
            // 현재 좌표값을 이동방향이 적용된 좌표로 갱신 후
            // 다음 계산에 이용하며 계속 진행
            ny = nny;
            nx = nnx;
        }
    }

    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(board[i][j]) {
                const card = board[i][j];

                cardPos.has(card) ? cardPos.get(card).push([i,j]) : cardPos.set(card, [[i, j]]);

                // if(cardPos.has(card)) {
                //     const origin = cardPos.get(card);
                //     cardPos.set(card, [...origin, [i, j]]);
                // } else {
                //     cardPos.set(card, [[i, j]]);
                // }
            }
        }
    }

    // 탐색해야하는 카드 번호 순서를 정한다.
    const getPermutation = (arr, n) => {
        if(n === 1) return arr.map(v => [v]);
        const result = [];

        arr.forEach((selectedV, idx) => {
            const newArr = [...arr.slice(0, idx), ...arr.slice(idx+1)];
            const perms = getPermutation(newArr, n-1);
            const attached = perms.map(perm => [selectedV, ...perm]);

            result.push(...attached);
        })

        return result;
    }

    const permutation = getPermutation([...cardPos.keys()], cardPos.size);

    const searchMinBacktracking = () => {

    }

}

solution(board, r, c);