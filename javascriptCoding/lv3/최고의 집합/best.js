

function solution(n, s) {
    if(s < n) {
        return [-1];
    }

    let a = parseInt(s / n);
    let b = Number(s % n);

    let answer = new Array(n).fill(a);
    for(let i = answer.length-1; i >= 0; i --) {
        if(b == 0)
            break;
        answer[i] += 1;
        b--;
    }

    return answer;
}

solution(2, 9);