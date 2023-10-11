function solution(number, k) {
    var answer = '';
    let startNum = 0;

    while(k > 0) {
        let temp = number.substring(startNum, startNum + k+1);
        let max = Math.max(...temp);

        if(temp[0] == max) {
            answer += temp[0];
            startNum ++;
            continue;
        }

        startNum ++;
        k--;
    }
    answer += number.substring(startNum);

    return answer;
}

// ___("4177252841", 4);
let result = solution("1231234", 3);
console.log(result);



