// const [orders, course] = [["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4]];
// const [orders, course] = [["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2,3,5]];
// const [orders, course] = [["XYZ", "XWY", "WXA"], [2,3,4]];
//
// function solution(orders, course) {
//     let answer = [];
//     let courseName = {};
//
//     course.map((num) => {
//         orders.forEach((menu) => {
//
//         });
//     });
//
//     const combination = (arr, num) => {
//         const result = [];
//
//         if(num === 1) return arr.map(el => [el]);
//
//         arr.forEach((fix, idx, array) => {
//             const restArray = array.slice(idx + 1);
//             const combiArr = combination(restArray, num -1);
//             const combiFix = combiArr.map(el => [fix, ...el]);
//
//             result.push(...combiFix);
//         });
//
//         return result;
//     }
//
//     return answer;
// }
//
// console.log(solution(orders, course));