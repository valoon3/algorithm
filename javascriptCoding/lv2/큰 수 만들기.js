

function solution(number, k) {
    var answer = '';
    let arr = [...number];

    while(k != 0) {
        let temp = arr.slice(0, k+1);
        let max = Math.max(...temp);

        if(temp[0] == '9') {
            answer += arr.shift();
            continue;
        }


        else if(temp[0] == max.toString()) {
            answer += arr.shift();
            continue;
        }
        arr.shift();
        k --;
    }
    answer += arr.join('');

    return answer;
}

// solution("4177252841", 4);
let result = solution("1231234", 3);
console.log(result);

// 41772 52841 4 max 7
// 7758 41 0 max 5



