// const numbers = "17"; // result 3
const numbers = "011"; // result 2

const solution = function(numbers) {
    let count = 0;
    const dp = ['0', '0', '1'];
    let values = new Set();

    for(let i = 0; i < numbers.length; i ++) {
        if(numbers[i] === '0') continue;
        dfs(i, Array(numbers.length).fill(false));
    }

    function dfs(visitIndex, visited, number = '') {
        const newVisited = [...visited];
        newVisited[visitIndex] = true;

        const newNum = number + numbers[visitIndex];

        if(values.has(Number(newNum))) return;
        values.add(Number(newNum));

        for(let i = 0; i < numbers.length; i ++) {
            if(newVisited[i] === false) dfs(i, newVisited, newNum); // 1 0   1 1
        }
    }

    function isPrime(number) {
        if(dp[number]) return dp[number] === '1' ? true : false;
        if(number % 2 === 0) return false;

        for(let i = 3; i < number; i += 2) {
            if(number % i === 0){
                dp[number] = '0';
                return false;
            }
        }
        return true;
    }

    values.forEach((value) => {
        if(isPrime(value) == true) count ++;
    })

    console.log(values);

    return count;
}

console.log(solution(numbers));