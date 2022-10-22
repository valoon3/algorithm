function solution(n) {
    let answer = 0;
    let sum = sumTwoBit(n);
    let another = n +1;

    while(sum != sumTwoBit(another)) {
        another ++;
    }

    return another;
}

function sumTwoBit(n) {
    let result = 0;
    let twoBit = n.toString(2);
    for(let i = 0; i < twoBit.length; i ++) {
        result += Number(twoBit[i]);
    }

    return result;
}

console.log(solution(78));