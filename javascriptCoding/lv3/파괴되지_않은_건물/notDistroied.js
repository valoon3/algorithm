const [board, skill] = [[[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5]]	, [[1,0,0,3,4,4],[1,2,0,2,3,2],[2,1,0,3,1,2],[1,0,1,3,3,1]]	];
// result 10

// const [board, skill] = [[[1,2,3],[4,5,6],[7,8,9]]	, [[1,1,1,2,2,4],[1,0,0,1,1,2],[2,2,0,2,0,100]]	];
// result 6

function solution(board, skill) {
    // 1: 공격
    // 2: 회복

    // 2차원 누적 계산 방법
    const imosMap = Array.from({ length: board.length + 1 }, () => Array.from({ length : board[0].length + 1 }, () => 0));
    let result = 0;
    skill.forEach(([type, r1, c1, r2, c2, degree], index) => {
        imosMap[r1][c1] += type === 1 ? -degree : degree;
        imosMap[r1][c2 + 1] += type === 1 ? degree : -degree;
        imosMap[r2 + 1][c1] += type === 1 ? degree : -degree;
        imosMap[r2 + 1][c2 + 1] += type === 1 ? -degree : degree;
    })

    // imosMap 가로 완성
    for(let i = 0; i < imosMap.length; i++) {
        for(let j = 0; j < imosMap[0].length - 1; j++) {
            imosMap[i][j + 1] += imosMap[i][j];
        }
    }

    // imos 세로 완성
    for(let i = 0; i < imosMap.length - 1; i++) {
        for(let j = 0; j < imosMap[0].length; j++) {
            imosMap[i + 1][j] += imosMap[i][j];
        }
    }

    // board 와 imosMap 합치기
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            board[i][j] += imosMap[i][j]
            if(board[i][j] > 0) result ++;
        }
    }

    return result;
}

console.log(solution(board,skill));
