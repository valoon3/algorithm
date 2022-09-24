function solution(numbers, target) {
    let answer = 0;

    function dfs(numbers, sum = 0, level = 0) {

        if(numbers.length-1 == level) {
            if(sum + numbers[level] == target) {
                answer ++;
            }
            if(sum - numbers[level] == target) {
                answer ++;
            }
            return;
        }
        else {
            dfs(numbers, sum + numbers[level], level + 1);
            dfs(numbers, sum - numbers[level], level + 1);
        }
    }
    dfs(numbers);

    return answer;
}



// const arr = [4,1,2,1];
// const arr = [1,2];
const arr = [1, 1, 1, 1, 1];
const target = 3

console.log(solution(arr, target));


