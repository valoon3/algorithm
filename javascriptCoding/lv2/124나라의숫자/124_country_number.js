const n = 4; // result 11
// 124 012
/*
* 0  1 x
*
* 1  1      1
* 2  2      2
* 3  4      10  !
*
* 4  11     11
* 5  12     12
* 6  14     20  !
*
* 7  21     21
* 8  22     22
* 9  24     100  !
*
* 10 41     101  !
*
* */

// 10 4
// 20 14
// 40 24

// 100 40 24

function solution(n) {
    let answer = '';
    let country124 = [4, 1, 2];

    while(n) {
        answer = country124[n%3] + answer;
        n = n%3 == 0 ? parseInt(n/3) - 1: parseInt(n/3);
    }




    return answer;
}