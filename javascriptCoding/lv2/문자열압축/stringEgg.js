// 문자열을 받아온 단위대로 잘라서 배열 리턴
function stringCutter(s, n) {
    let sArr = [];
    for(let i = 0; i < s.length; i=i+n)
        sArr.push(s.substring(i, i +n))

    return sArr;
}

// 배열 압축 // 제출시 오류가 많이남
// function stringCompression(cutArr) {
//     let temp = '';
//     let num = 0;
//     let result = '';
//
//     while(cutArr.length != 0) {
//         if(temp == '') { // temp가 비어있을 때
//             temp = cutArr.shift();
//             num ++;
//         }
//         else if(temp == cutArr[0]){ // temp와 다음 값이 같은 때
//             cutArr.shift();
//             num ++;
//         }
//         else if(temp != cutArr[0]){ // temp와 다음 값이 다를 때
//             if(num > 1)
//                 result += num.toString();
//             result += temp;
//             temp = cutArr.shift()
//             num = 1;
//         }
//         if(cutArr.length == 1){
//             temp == cutArr[0] ?
//                 result+= ((num+1).toString() + temp):
//                 result += temp + cutArr.shift();
//         }
//
//
//     }
//     return result;
// }

function stringCompression(cutArr) {
    let temp = '';
    let num = 0;
    let result = '';

    cutArr.forEach((cut, index) => {
        if(temp == '') {
            temp = cut;
            num ++;
        }
        else if(temp == cut)
            num ++;
        if(temp != cut) {
            num == 1 ? result += temp : result += num.toString() + temp;
            num = 1;
            temp = cut;
        }
    });
    num == 1 ? result += temp : result += num.toString() + temp;

    return result;
}

function solution(s) {
    var answer = 0;

    for(let i = 1; i < s.length / 2 + 1; i ++){
        let sArr = stringCutter(s, i);
        let resultString = stringCompression(sArr);
        if(answer == 0) {
            answer = resultString.length;
        } else {
            answer = Math.min(answer, resultString.length);
        }
    }

    return answer;
}

const testCase1 = "aabbaccc";
const testCase2 = "ababcdcdababcdcd";
const testCase3 = "abcabcdede";
const testCase4 = "abcabcabcabcdededededede";
const testCase5 = "xababcdcdababcdcd";

// console.log(solution(testCase1));
// console.log(solution(testCase2));
// console.log(solution(testCase3));
// console.log(solution(testCase4));
//console.log(solution(testCase5));
