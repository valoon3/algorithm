const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const n = Number(input[0]);
    return input.slice(1, n + 1);
}

function solution(strArr) {
    const dic = new Map();
    let answer = 0;

    strArr.forEach((str, i) => {
        for(let i = 0; i < str.length; i ++) {
            const c = str[str.length - 1 - i];
            const score = 10**i;

            if(dic.has(c)) {
                const d = dic.get(c);
                dic.set(c, d + score);
            } else {
                dic.set(c, score);
            }
        }
    })

    const diction = [];

    for(const key of [...dic.keys()]) {
        diction.push([key, dic.get(key)]);
    }
    diction.sort((a,b) => b[1] - a[1]);

    let dicScore = 9;
    diction.forEach(([alp, _]) => {
        dic.set(alp, dicScore);
        dicScore --;
    })

    // console.log(dic);

    strArr.forEach(str => {
        let numberString = '';

        for(let i = 0; i < str.length; i ++) {
            numberString += dic.get(str[i]).toString();
        }
        answer += Number(numberString);
    })

    console.log(answer);
}

const stringArr = filter(input);
solution(stringArr);