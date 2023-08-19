// function solution(progresses, speeds) {
//     var answer = [];
//
//     let temp = 0;
//     while(progresses.length != 0){
//         for(let i = 0; i < progresses.length; i ++) {
//             progresses[i] += speeds[i];
//         }
//         while (progresses.length != 0 && progresses[0] >= 100) {
//             progresses.shift();
//             speeds.shift();
//             temp++;
//         }
//         if(temp != 0)
//             answer.push(temp);
//         temp = 0;
//     }
//
//     return answer;
// }
//
// const progresses = [95, 90, 99, 99, 80, 99];
// const speeds = [1, 1, 1, 1, 1, 1];
//
// console.log(solution(progresses, speeds));


// const [progresses, speeds] = [[93, 30, 55], [1, 30, 5]]; // result [2,1]
const [progresses, speeds] = [[95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]	]; // result [1, 3, 2]

const solution = (progresses, speeds) => {
    const result = [];

    progresses.reverse();
    speeds.reverse();

    const oneCycle = (progresses, speeds) => {
        progresses.forEach((_, index) => {
            progresses[index] += speeds[index];
        });

        let count = 0;
        while(progresses[progresses.length - 1] >= 100) {
            count ++;
            progresses.pop();
            speeds.pop();
        }
        if(count > 0) result.push(count);
    }

    while(progresses.length > 0) {
        oneCycle(progresses, speeds);
    }

    console.log(result);
    return result;
}

solution(progresses, speeds);