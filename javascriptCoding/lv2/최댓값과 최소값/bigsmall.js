const s1 = "1 2 4 3";
const s2 = "-1 -2 -3 -4";
const s3 = "-1 -1";

function solution(s) {
    var answer = '';
    let arr = s.split(' ');
    let max, min;

    arr.forEach(value => {
        if(!max)
            max = Number(value);
        if(!min)
            min = Number(value);

        if(Number(value) > max)
            max = Number(value);
        if(Number(value) < min)
            min = Number(value);
    })

    answer = `${min} ${max}`;

    return answer;
}

console.log(solution(s2))