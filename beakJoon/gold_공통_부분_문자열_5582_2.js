const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [string1, string2] = filter(input);
        solution(string1, string2);
        process.exit();
    });

function filter(input) {
    return [input[0], input[1]];
}

function solution(string1, string2) {
    let shortString = '';
    let longString = '';
    let answer = 0;

    if(string1.length > string2.length) {
        shortString = string2;
        longString = string1;
    } else {
        shortString = string1;
        longString = string2;
    }
    let sameArr = Array.from({ length: shortString.length + 1 }, () => Array.from({ length: longString.length + 1 }, () => 0));

    for(let i = 1; i <= shortString.length; i ++) {
        for(let j = 1; j <= longString. length; j ++) {
            if(shortString[i-1] === longString[j-1]) {
                sameArr[i][j] = sameArr[i-1][j-1] + 1;
            }
        }
    }

    sameArr.forEach(arr => {
        answer = Math.max(answer, ...arr);
    })

    console.log(answer);
}