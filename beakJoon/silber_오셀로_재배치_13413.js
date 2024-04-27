const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const othello = filter(input);
        solution(othello);
        process.exit();
    });

function filter(input) {
    const testCount = input.shift();
    const result = [];

    // Othello
    for(let i = 0; i < testCount; i ++) {
        const othelloCount = input[i * 3];
        const nowOthello = input[(i * 3) + 1];
        const targetOthello = input[(i * 3) + 2];

        result.push([nowOthello, targetOthello]);
    }

    return result;
}

function solution(othello) {
    let result = [];

    othello.forEach(([nowOthello, targetOthello]) => {
        const obj = {'W': 0, 'B': 0};

        for(let i = 0; i < nowOthello.length; i ++) {
            if(nowOthello[i] !== targetOthello[i]) {
                obj[nowOthello[i]] ++;
            }
        }
        result.push(obj);
    })

    result = result.map(({W, B}) => Math.max(W, B))

    console.log(result.join('\n'));
}