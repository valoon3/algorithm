const s = ["1110","100111100","0111111010"];
// result ["1101","100110110","0110110111"]


// 0111111010
// 01111 10 110
// 0111 110 110

function solution(s) {
    const answer = [];

    for(let str of s) {
        let stack110 = [];
        let result = [];

        for(let right of str) {
            if(right === '1') {
                result.push(right);
                continue;
            }

            if(result.length > 1) {
                const mid = result.pop();
                const left = result.pop();

                if(`${left}${mid}${right}` === '110')
                    stack110.push('110');
                else
                    result.push(left, mid, right);
            }  else {
                result.push(right);
            }
        }

        let sample = result.join('');
        const last0Index = sample.lastIndexOf('0');

        if(last0Index === -1) {
            answer.push(stack110.join('') + result.join(''));
        } else {
            const front = sample.slice(0, last0Index+1);
            const back = sample.slice(last0Index+1);
            answer.push(front + stack110.join('') + back);
        }
    }

    return answer;
}

console.log(solution(s));