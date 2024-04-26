const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [number1, number2] = filter(input);
        solution(number1, number2);
        process.exit();
    });

function filter(input) {
    const [number1, number2] = input[0].split(' ');

    return [number1, number2];
}

function solution(number1, number2) {
    const numberMap = [];

    for(let i = Number(number1); i <= Number(number2); i ++) {
        let numberString = '';

        for(let s of i.toString()) {
            numberString += numberObj[s];
        }

        numberMap.push([i, numberString]);
    }

    numberMap.sort((a,b) => a[1].localeCompare(b[1]));

    let result = '';

    numberMap.forEach(([num, _], i) => {
        result += num.toString();
        if((i + 1) % 10 === 0) result += '\n';
        else result += ' ';
    })

    console.log(result);
}

const numberObj = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
}