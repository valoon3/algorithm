const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const numbers = filter(input);
        solution(numbers);
        process.exit();
    });

function filter(input) {
    input.shift();
    return input.map(str => Number(str));
}

function solution(numbers) {
    let result = [];
    const dp = [[1, 0], [0, 1]];

    const fibonacci = (n) => {
        if(dp[n]) return dp[n];

        if(n === 0) {
            return dp[0];
        } else if(n === 1) {
            return dp[1];
        } else {
            const arr1 = fibonacci(n - 1);
            const arr2 = fibonacci(n - 2);

            dp[n] = [arr1[0] + arr2[0], arr1[1] + arr2[1]];
            return dp[n];
        }
    }


    numbers.forEach(number => {
        const arr = fibonacci(number);
        result.push(arr);
    })

    result = result.map(([zero, one]) => `${zero} ${one}`).join('\n');
    console.log(result);
}
