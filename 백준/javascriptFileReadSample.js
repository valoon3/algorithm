// 한 줄 입력받기

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input = line.split(' ').map(el => parseInt(el)); // 1 2 3 4
    rl.close();
});

rl.on('close', () => {
    input.forEach(el => {
        console.log(el);
    })
    process.exit();
})


// 여러줄 입력받기

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

rl.on('close', () => {
    console.log(input);
    process.exit();
})