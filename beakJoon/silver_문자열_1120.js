const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [stringA, stringB] = filter(input);
        solution(stringA, stringB);
        process.exit();
    });

function filter(input) {
    const [stringA, stringB] = input[0].split(' ');

    return [stringA, stringB];
}

function solution(stringA, stringB) {
    const stringArr = [];

    for(let i = 0; i <= stringB.length - stringA.length; i ++) {
        stringArr.push(stringB.substring(i, i + stringA.length));
    }


    let result = Infinity;

    const stringDiff = (stringA, stringB) => {
        let count = 0;

        for(let i = 0; i < stringA.length; i ++) {
            if(stringA[i] !== stringB[i]) count ++;
        }

        result = Math.min(result, count);
    }

    stringArr.forEach(stringB => stringDiff(stringA, stringB));

    console.log(result);
}