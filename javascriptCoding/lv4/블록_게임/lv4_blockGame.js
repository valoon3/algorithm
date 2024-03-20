const board = [
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0],[0,0,0,0,0,4,4,0,0,0],[0,0,0,0,3,0,4,0,0,0],[0,0,0,2,3,0,0,0,5,5],[1,2,2,2,3,3,0,0,0,5],[1,1,1,0,0,0,0,0,0,5]
];

function solution(board) {
    const colCount = board.length;
    const rowCount = board[0].length;
    const canCrush = Array.from({ length : rowCount }, () => true);

    let result = 0;

    // 부서지는 블록 다섯가지


    const isAble = (y, x) => y >= 0 && y < colCount && x >= 0 && x < rowCount;

    const crush = (y, x, num) => {
        const dirs = [[1, 0], [-1, 0], [0, -1], [0, 1]];

        if(board[y][x] === num) {
            board[y][x] = 0;
            dirs.forEach(([dy, dx]) => {
                const [ny, nx] = [y + dy, x + dx];
                if(isAble(ny, nx) && board[ny][nx] === num) {
                    crush(ny, nx, num);
                }
            })
        }
    }

    const checkVertical = (y, x, num) => {
        for(let i = y; i >= 0; i --) {
            if(!(board[i][x] === 0 || board[i][x] === num)) return false;
        }

        return true;
    }

    const checkBlock1 = (y, x, num) => {
        return (
            isAble(y, x) && board[y][x] === num &&
            isAble(y, x+1) && board[y][x+1] === 0 &&
            isAble(y, x+2) && board[y][x+2] === 0 &&
            isAble(y+1, x) && board[y+1][x] === num &&
            isAble(y+1, x+1) && board[y+1][x+1] === num &&
            isAble(y+1, x+2) && board[y+1][x+2] === num &&
            checkVertical(y, x, num) && checkVertical(y+1, x, num)
        )
    }

    const checkBlock2 = (y, x, num) => {
        return (
            isAble(y, x) && board[y][x] === num &&
            isAble(y, x-1) && board[y][x-1] === 0 &&
            isAble(y+1, x) && board[y+1][x] === num &&
            isAble(y+1, x-1) && board[y+1][x-1] === 0 &&
            isAble(y+2, x) && board[y+2][x] === num &&
            isAble(y+2, x-1) && board[y+2][x-1] === num &&
            checkVertical(y, x, num) && checkVertical(y+1, x, num) && checkVertical(y+2, x, num)
        )
    }

    const checkBlock3 = (y, x, num) => {
        return (
            isAble(y, x) && board[y][x] === num &&
            isAble(y+1, x) && board[y+1][x] === num &&
            isAble(y+2, x) && board[y+2][x] === num &&
            isAble(y, x+1) && board[y][x+1] === 0 &&
            isAble(y+1, x+1) && board[y+1][x+1] === 0 &&
            isAble(y+2, x+1) && board[y+2][x+1] === num &&
            checkVertical(y, x, num) && checkVertical(y+1, x, num) && checkVertical(y+2, x, num)
        )
    }

    const checkBlock4 = (y, x, num) => {
        return (
            isAble(y, x) && board[y][x] === num &&
            isAble(y, x-1) && board[y][x-1] === 0 &&
            isAble(y, x-2) && board[y][x-2] === 0 &&
            isAble(y+1, x) && board[y+1][x] === num &&
            isAble(y+1, x-1) && board[y+1][x-1] === num &&
            isAble(y+1, x-2) && board[y+1][x-2] === num &&
            checkVertical(y, x, num) && checkVertical(y+1, x, num)
        )
    }

    const checkBlock5 = (y, x, num) => {
        return (
            isAble(y, x) && board[y][x] === num &&
            isAble(y, x-1) && board[y][x-1] === 0 &&
            isAble(y, x+1) && board[y][x+1] === 0 &&
            isAble(y+1, x) && board[y+1][x] === num &&
            isAble(y+1, x-1) && board[y+1][x-1] === num &&
            isAble(y+1, x+1) && board[y+1][x+1] === num &&
            checkVertical(y, x, num) && checkVertical(y+1, x, num)
        )
    }

    const check = (y, x, num) => {
        if(checkBlock1(y, x, num) || checkBlock2(y, x, num) || checkBlock3(y, x, num) || checkBlock4(y, x, num) || checkBlock5(y, x, num)) {
            crush(y, x, num);
            result ++;
            return true;
        } else {
            return false;
        }
    }

    for(let i = 0; i < colCount; i ++) {
        for(let j = 0; j < rowCount; j ++) {
            if(board[i][j] !== 0 && check(i, j, board[i][j])) {
                j = 0;
            }
        }
    }

    return result;
}

console.log(solution(board));
