// const msg = "KAKAO";
const msg = 'TOBEORNOTTOBEORTOBEORNOT';
// const msg = 'ABABABABABABABAB';

const solution = function(msg) {
    const result = [];
    const alphabetArr = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K' ,'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ,'U', 'V', 'W', 'X', 'Y', 'Z'];

    let w = '';
    let c = '';

    let i = 0;
    while(i < msg.length) {
        w += msg[i];
        if(i + 1 < msg.length) c = msg[i + 1];
        else {
            result.push(alphabetArr.indexOf(w));
            break;
        }

        if(alphabetArr.indexOf(w + c) !== -1) { // 사전에 존재하면
            i++;

            continue;
        } else { // 사전에 존재하지 않으면
            result.push(alphabetArr.indexOf(w));
            alphabetArr.push(w + c);
            w = '';
        }

        i++;
    }

    return result;
}

console.log(solution(msg));