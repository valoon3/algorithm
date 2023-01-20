// n 화살 수, info 맞춘 발 수
// const [n, info, result] =[5, [2,1,1,1,0,0,0,0,0,0,0], [0,2,2,0,1,0,0,0,0,0,0]];
// const [n, info, result] =[1, [1,0,0,0,0,0,0,0,0,0,0], [-1]];
// const [n, info, result] =[9, [0,0,1,2,0,1,1,1,1,1,1], [1,1,2,0,1,2,2,0,0,0,0]];
const [n, info, result] =[10, [0,0,0,0,0,0,0,0,3,4,3], [1,1,1,1,1,1,1,1,0,0,2]];

function solution(n, apeachShoots) {
    let answer = [-1];
    let winScore = 0;

    const calcScore = (info, result) => {
        return info.reduce((total, apeachArrowCount, index) => {
            let lionArrowCount = result[index];

            if(apeachArrowCount < lionArrowCount) // lion win
                return total + 10 - index;
            else if(apeachArrowCount === 0 && lionArrowCount === 0) // 0
                return total;
            else
                return total - 10 + index; // lion lose
        }, 0);
    }

    // lion이 이겨야함
    const dfs = (arrowCount, lionShoots, shootingPoint = 10) => { // 0 점부터 쏘기 시작
        // 남은 화살이 없다면 리턴
        if(arrowCount == 0) {
            const score = calcScore(apeachShoots, lionShoots);
            if(winScore < score) {
                winScore = score;
                answer = lionShoots;
            }
            return;
        }

        // 작은 점수부터 화살 쏘기
        for(let i = shootingPoint; i >= 0; i --) {
            const copylionResult = [...lionShoots];

            if(arrowCount > apeachShoots[i]) {
                copylionResult[i] = apeachShoots[i] + 1; // 어피치보다 한발 더 쏘기
                dfs(arrowCount - copylionResult[i], copylionResult, i-1)
            } else {
                // copylionResult[10] += arrowCount;
                dfs(arrowCount, copylionResult, i-1); // 더 높은 점수 확인
            }
        }
        
        lionShoots[10] += arrowCount;
        dfs(0, lionShoots, -1);

    }

    dfs(n, new Array(11).fill(0));

    return answer;
}

console.log(solution(n, info));