const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;
let input = [];

rl.on('line', (line) => {

    if(count == 0) {
        count = parseInt(line);
    } else {
        input.push(parseInt(line));
    }

    if(input.length <= count) {
        rl.close();
    }

}).on('close', () => {
    let avg = input.reduce((acc, cur) => {
        return acc + cur;
    }, 0);

    let centerNum = input.sort((a,b) => a- b)[2];

    console.log(avg/5);
    console.log(centerNum);
});