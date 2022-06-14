function solution(n) {
    var answer = 0;
    let s = '';

    s = n.toString(3);

    console.log(s);

    for(let i=0; i<s.length; i ++) {
        answer += Number(s[i])*3**i;
    }



    return answer;
}

console.log(solution(45));