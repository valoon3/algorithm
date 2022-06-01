const number = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}


function solution(s) {
    var answer = '';
    let temp = '';

    for(let a of s){

        if(a != '1' && a != '2' && a != '3' && a != '4' && a != '5' && a != '6' && a != '7' && a != '8' && a != '9' && a != '0'){
            temp += a;
        }
        else{
            answer += a;
        }

        if(number[temp]){
            answer += number[temp];
            temp = '';
        }
    }

    return Number(answer);
}

solution("one4seveneight");
console.log(solution("one4seveneight"));