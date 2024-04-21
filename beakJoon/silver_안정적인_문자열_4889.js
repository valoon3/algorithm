const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const arr = filter(input);
        solution(arr);
        process.exit();
    });

function filter(input) {
    input.pop();
    return input;
}

function solution(str) {
    const answer = [];

    str.forEach((s, i) => {
        const stack = [];
        let count = 0;
        for(const c of s) {
            if(c === '{') {
                stack.push(c);
            } else {
                if(stack[stack.length - 1] && stack[stack.length - 1] === '{') {
                    stack.pop();
                } else stack.push(c);
            }
        }

        while(stack.length) {
            const second = stack.pop();
            const first = stack.pop();

            if(first === '}') count ++;
            if(second === '{') count ++;
        }

        answer.push(`${i + 1}. ${count}`)
    })

    answer.forEach(a => console.log(a));
}