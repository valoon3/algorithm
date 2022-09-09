// const [n, lost, reserve] = [5, [2, 4], [1,3,5]];
const [n, lost, reserve] = [5, [2, 4], [3]];
// const [n, lost, reserve] = [3, [3], [1]];

function solution(n, lost, reserve) {
    let students = [];

    for(let i =0; i < n; i ++) {
        students[i] = 1;
    }

    lost.forEach(studentNum => {
        students[studentNum-1] --;
    })

    reserve.forEach(studentNum => {
        students[studentNum-1]++;
        // 왼쪽 검색
        if(studentNum - 2 > -1 && students[studentNum - 2] === 0 && students[studentNum - 1] > 1) {
            students[studentNum - 2] ++;
            students[studentNum-1] --;
        }
        // 오른쪽 검색
        else if(studentNum < n && students[studentNum] === 0 && students[studentNum - 1] > 1) {
            students[studentNum] ++;
            students[studentNum-1] --;
        }
    })



    let result = students.reduce((sum, cur) => {
        return cur !== 0? sum + 1: sum;
    })



    // console.log(students);
    // console.log(result);

    return result;
}

solution(n, lost, reserve);

// function give(array) {
//
//     for(let i = 0; i < array.length; i ++) {
//         if(array[i] == 0) {
//             // 왼쪽 검사
//             if(i - 1 >= 0 && array[i-1] > 1) {
//                 array[i] ++;
//                 array[i-1] --;
//             }
//             // 오른쪽 검사
//             else if(i + 1 < array.length && array[i+1] > 1) {
//                 array[i] ++;
//                 array[i+1] --;
//             }
//         }
//     }
// }

// function solution(n, lost, reserve) {
//     var answer = 0;
//
//     let students = [];
//
//     for(let i = 0; i < n; i ++) {
//         students.push(1);
//         if(lost.find(value => value == i+1))
//             students[i] --;
//         if(reserve.find(value => value == i+1))
//             students[i] ++;
//     }
//
//     give(students);
//     answer = students.reduce((sum, curVal, idx ) => {
//         if(curVal != 0)
//             return sum + 1;
//         return sum;
//     }, 0)
//
//
//     return answer;
// }