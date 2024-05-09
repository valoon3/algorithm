const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    input = input[1].split(' ').map(Number);
    const answer = Array.from({ length : Number(input.length) }, () => 0);
    const stack = [];

    input.forEach((height, i) => {
        while(stack.length > 0) {
            const [top, index] = stack[stack.length - 1];

            if(top < height) {
                stack.pop();
                continue;
            }
            break;
        }

        if(stack.length > 0) answer[i] = stack[stack.length - 1][1];

        stack.push([height, i + 1]);
    })

    console.log(answer.join(' '));
}

solution(input);