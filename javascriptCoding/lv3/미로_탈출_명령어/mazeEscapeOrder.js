const [n, m, x, y, r, c, k] = [3,	4,	2,	3,	3,	1,	5];
// result "dllrl"

// const [n, m, x, y, r, c, k] = [2,	2,	1,	1,	2,	2,	2];
// result "dr"

// const [n, m, x, y, r, c, k] = [3,	3,	1,	2,	3,	3,	4];
// result "impossible"

function solution(n, m, x, y, r, c, k) {
    const directions = [[1, 0, 'd'], [0, -1, 'l'], [0, 1, 'r'], [-1, 0, 'u']]; // d l r u
    const canGo = (x, y, dx, dy) => {
        if(x + dx > n || x + dx < 1 || y + dy > m || y + dy < 1) return false;
        return true;
    }

    let answer = 'impossible';
    if(Math.abs(x - r) + Math.abs(y - c) > k || (Math.abs(x - r) + Math.abs(y - c) - k) % 2 !== 0) return answer;

    const dfs = (x, y, str, thisDist) => {
        if(thisDist > k) return; // 가는데 필요한 거리와 이미 이동한 거리의 합이 k 보다 크면 종료한다.
        if(answer !== 'impossible') return; // 정답이 이미 나왔으면 종료한다.
        if(str.length === k && x === r && y === c) { // 정답이면 종료한다.
            answer = str;
            return;
        }
        if(str.length > k) return; // 문자열의 이동한 거리가 더 길어지면 종료한다.

        for(let i = 0; i < directions.length; i ++) {
            const [dx, dy, d] = directions[i];

            const nx = x + dx;
            const ny = y + dy;

            if(canGo(x, y, dx, dy)) {
                const newStr = str + d;
                dfs(nx, ny, newStr, Math.abs(nx - r) + Math.abs(ny - c) + 1 + str.length);
            }
        }
    }

    dfs(x, y, '', k);
    return answer;
}



console.log(solution(n, m, x, y, r, c, k));