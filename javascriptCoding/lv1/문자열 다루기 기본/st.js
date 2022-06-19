const s1= 'a234';

function solution(s) {
    var answer = true;
    let numberList = [1,2,3,4,5,6,7,8,9,0]

    if (s.length !== 4 && s.length !== 6) {
        return false;
    }

    for(let i = 0; i < s.length; i ++) {
        if(isNaN(s[i])) {
            answer = false;
            break;
        }
    }

    console.log(answer);

    return answer;
}

solution(s1);