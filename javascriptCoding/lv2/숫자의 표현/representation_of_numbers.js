function solution(n) {
    let answer = 0;

    for(let i = 1; i <= n; i = i + 1) {
        let sum = i * (i-1) / 2;
        if(n <= sum) {
            break;
        }
        if((n-sum)%i == 0)
            answer ++ ;
    }

    return answer;
}

console.log(solution(15));
