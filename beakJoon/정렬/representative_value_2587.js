const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

rl.on('line', (line) => {

    input.push(parseInt(line));
    if(input.length == 5){
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