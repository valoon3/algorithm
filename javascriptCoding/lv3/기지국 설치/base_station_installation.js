// const [n, stations, w] =[11, [4,11], 1];
const [n, stations, w] =[16, [9], 2];

function solution(n, stations, w) {
    let answer = 0;

    let i = 0;
    let rangeArray = stations.map((data) => {
        let temp = data-w-1-i;
        i = data+w;
        return temp;
    })
    if(n > i) {
        rangeArray.push(n - i);
    }

    rangeArray.forEach(data => {
        if(data > 0) {
            if(data % (2*w+1) != 0)
                answer ++;
            answer += parseInt(data / (2*w+1));
        }
    })

    return answer;
}

console.log(solution(n, stations, w));