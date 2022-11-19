// const [number, k] = ["1924", 2];
// const [number, k] = ["1231234", 3];
const [number, k] = ["4177252841", 4];

//// 10번 테스트 통과 못함 (시간 초과)
// function solution(number, k) {
//     let startNum = 0;
//
//     while(k != 0) {
//         for(let i = startNum; i < number.length; i ++) {
//             if(number[i] < number[i+1]) {
//                 number = number.slice(0,i) + number.slice(i+1, number.length);
//                 k--;
//                 break;
//             } else if(i + 1 == number.length-1) {
//                 number = number.slice(0, i+1);
//                 k--;
//                 break;
//             }
//         }
//     }
//
//     return number;
// }

function solution(number, k) {
    let stack = [];

    for(let i = 0; i < number.length; i ++) {
        if(stack.length == 0) {
            stack.push(number[i]);
            continue;
        }

        while(k != 0 && stack[stack.length-1] < number[i]) {
            stack.pop();
            k--;
        }

        stack.push(number[i]);
    }

    while(k != 0) {
        stack.pop();
        k--;
    }

    return stack.reduce((pre, cur) => pre + cur);
}

console.log(solution(number, k));