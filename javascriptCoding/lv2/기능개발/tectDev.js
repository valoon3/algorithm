function solution(progresses, speeds) {
    var answer = [];

    let temp = 0;
    while(progresses.length != 0){
        for(let i = 0; i < progresses.length; i ++) {
            progresses[i] += speeds[i];
        }
        while (progresses.length != 0 && progresses[0] >= 100) {
            progresses.shift();
            speeds.shift();
            temp++;
        }
        if(temp != 0)
            answer.push(temp);
        temp = 0;
    }

    return answer;
}

const progresses = [95, 90, 99, 99, 80, 99];
const speeds = [1, 1, 1, 1, 1, 1];

console.log(solution(progresses, speeds));