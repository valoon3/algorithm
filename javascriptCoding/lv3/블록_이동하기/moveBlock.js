const [board, result] = [[[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]], 7];

function solution(board) {
    let answer = Infinity;

    const moveArr = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const getNextPosition = (left, right, board) => {
        const X = 1; // 가로
        const Y = 0; // 세로

        const result = [];

        for(const move of moveArr) {
            // dy, dx는 각각 상,하,좌,우로 이동을 적용하기 위한 값
            const [dy, dx] = move;
            // 전달받은 left와 right에 이동방향 적용
            const next_left = [ left[Y]+dy, left[X]+dx ];
            const next_right = [ right[Y]+dy, right[X]+dx ];

            // 이동이 끝난 좌표에 벽이 없다면 결과값에 추가
            if(board[next_left[Y]][next_left[X]] === 0 &&
                board[next_right[Y]][next_right[X]] === 0) {
                result.push([next_left, next_right]);
            }
        }
    }

    const dfs = (robot1, robot2) => {
        const move = () => {


        }


    }

    dfs([0,0], [0,1]);


    return answer;
}

console.log(solution(board));