// const numbers = [2,1,3,4,1]; // result [2,3,4,5,6,7]
const numbers = [5,0,2,7]	; // result [2,5,7,9,12]

function solution(numbers) {
    const result = new Set();

    const dfs = (number, index, visited = []) => {
        for(let i = index + 1; i < numbers.length; i ++) {
            result.add(number + numbers[i]);
        }
    }

    numbers.forEach((number, index) => {
        dfs(number, index);
    })

    return [...result].sort((a, b) => a - b);
}

console.log(solution(numbers));