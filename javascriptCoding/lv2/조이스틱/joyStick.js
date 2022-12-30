// const alphabet = {O:12,P:11,Q:10,R:9,S:8,T:7,U:6,V:5,W:4,X:3,Y:2,Z:1,A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,}
// // const name = "JEROEN";
// // const name = 'JAN';
// const name = 'AAAAAAA';
// // const name = 'HAATAAA';
//
// function solution(name) {
//     let answer = 0;
//
//     let aCount = checkACount(name);
//
//     answer += moveCount(aCount, name);
//
//     for(let i = 0; i < name.length; i ++) {
//         answer += selectAlphabet(name[i]);
//     }
//
//
//
//
//
//
//     return answer;
//
//     function selectAlphabet(select) {
//         return alphabet[select];
//     }
//
//     function checkACount(name) {
//         let aCount = 0;
//
//         for(let i = 1; i < name.length; i ++) {
//             if(name[i] == 'A') {
//                 aCount ++;
//             } else {
//                 break;
//             }
//         }
//
//         let temp = 0;
//         for(let i = name.length - 1; i >= 0; i --) {
//             if(name[i] == 'A') {
//                 temp ++;
//             } else {
//                 break;
//             }
//         }
//
//         if(temp > aCount && temp >= 0) {
//             aCount = temp;
//         }
//
//         return aCount;
//     }
//
//     function moveCount(aCount, name) {
//         return name.length - 1 - aCount;
//     }
// }
//
// console.log(solution(name));
//
