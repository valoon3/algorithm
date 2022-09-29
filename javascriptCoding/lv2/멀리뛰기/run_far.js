function solution(n) {
    let answer = 0;
    dfs(0, n);

    function dfs(sum, n) {
        if(sum < n) {
            dfs(sum+1, n);
            dfs(sum+2, n);
        }
        else if(sum == n) {
            answer ++;
        }
        else if(sum > n) {
            return;
        }

    }
    return answer;
}

console.log(solution(4));