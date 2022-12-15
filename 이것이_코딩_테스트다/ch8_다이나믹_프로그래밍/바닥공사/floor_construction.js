//바닥 공사
const n = 3 // 가로의 길이
// 2x1 1x2 2x2 세가지의 타일 사용 가능

// 점화식 ai = (ai-1) + ((ai-2) * 2);

const solution = function(n) {
    const count = [0, 1, 3, 5];

    for(let i = 3; i <= n; i ++) {
        count[i] = count[i-1] + count[i-2]*2;
    }

    console.log(count);
}

solution(n);