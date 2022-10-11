const [n, target, money] = [2, 15, [2,3]];
// const [n, target, money] = [3, 4, [3, 5, 7]];

function solution(n, target, money) {
    let answer = new Array(target + 1).fill(Infinity);

    // 한 번 계산된 결과를 저장하기 위한 DP 테이블 초기화
    let temp = money.shift();
    for(let i = 1; i < answer.length; i ++) {
        answer[temp*i] = i;
    }

    // 다이나믹 프로그래밍(Dynamic Programming) 진행(바텀업)
    answer[0] = 0;






    return answer;
}

solution(n, target, money);