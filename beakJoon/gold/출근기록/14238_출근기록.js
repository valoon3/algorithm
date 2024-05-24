const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    let answer = '-1';
    let aCount = 0;
    let bCount = 0;
    let cCount = 0;

    for(let c of input[0]) {
        if(c === 'A') {
            aCount ++;
        } else if(c === 'B') {
            bCount ++;
        } else {
            cCount ++;
        }
    }

    // -1 미방문 0 방문 불가능 1 방문 가능
    const dp = Array.from({ length : aCount+1 },
        () => Array.from({ length : bCount+1 },
            () => Array.from({ length : cCount+1 },
                () => Array.from({ length : 3 } , // 0 A 1 B 2 C
                    () => Array.from({ length : 3 },
                        () => -1 )))));

    const canWriteB = (word) => {
        if(word.length > 0 && word[word.length - 1] === 'B') return false;
        return true;
    }
    const canWriteC = (word) => {
        if(word.length > 1 && (word[word.length - 1] === 'C' || word[word.length - 2] === 'C')) return false;
        return true;
    }
    const alpToNum = (alp) => {
        if(alp === 'A') return 0;
        else if(alp === 'B') return 1;
        else return 2;
    }
    const check = (a, b, c, word) => {
        if(word.length < 2) return -1;
        const prev = alpToNum(word[word.length - 1]);
        const pprev = alpToNum(word[word.length - 2]);
        return dp[a][b][c][prev][pprev];
    }

    const makeWord = (a, b, c, word) => {
        if(answer !== '-1') return;
        if(a === 0 && b === 0 && c === 0) {
            dp[a][b][c][alpToNum(word[word.length - 1])][alpToNum(word[word.length - 2])] = 0;
            answer = word;
            return;
        }
        // if(check(a, b, c, word) === 0) return;
        if(word.length > 1) {
            const prev = alpToNum(word[word.length - 1]);
            const pprev = alpToNum(word[word.length - 2]);
            if(dp[a][b][c][prev][pprev] !== -1) return;
            dp[a][b][c][prev][pprev] = 1;
        }
``
        if(a > 0 && answer === '-1') {
            if(check(a-1, b, c, word + 'A') === -1)
                makeWord(a - 1, b, c, word + 'A');
        }
        if(b > 0 && canWriteB(word) && answer === '-1') {
            if(check(a, b-1, c, word + 'B') === -1)
                makeWord(a, b - 1, c, word + 'B');
        }

        if(c > 0 && canWriteC(word) && answer === '-1' ) {
            if(check(a, b, c - 1, word + 'C') === -1)
                makeWord(a, b, c - 1, word + 'C');
        }
    }

    makeWord(aCount, bCount, cCount, '');

    if(answer === '-1') console.log(answer);
    else console.log(answer);
}

solution(input);