const [a, b] = [[1, 4, 2], [5, 4, 4]];

// function solution(A,B){
//     let answer = 0;
//
//     A.sort((a,b) => {
//         return b - a;
//     })
//     B.sort((a,b) => {
//         return a - b;
//     })
//
//     for(let i = 0; i  < A.length; i ++) {
//         answer += A[i] * B[i];
//     }
//
//     // console.log(answer);
//
//     return answer;
// }

// 다른 사람의 풀이
function solution(A, B) {
    A.sort((a,b) => a-b);
    B.sort((a,b) => b-a);
    return A.reduce((total, value, index) => total + value * B[index], 0);
}

;
console.log(solution(a, b))