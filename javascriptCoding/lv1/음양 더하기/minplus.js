function solution(absolutes, signs) {
    var answer = 0;

    for(let i = 0; i < absolutes.length; i ++) {
        let temp = '';
        temp += signs[i] ? '+' : '-';
        temp += absolutes[i].toString();
        answer += Number(temp);
    }
    return answer;
}

console.log(solution([4,7,12], [true,false,true]));