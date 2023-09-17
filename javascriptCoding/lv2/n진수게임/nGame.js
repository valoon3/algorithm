// n : 진법
// t : 미리 구할 숫자의 갯수
// m : 게임에 참가하는 인원
// p : 튜브의 순서
// const [n,t,m,p] = [2,4,2,1]; // result 0111
const [n,t,m,p] = [16,16,2,1]; // result 02468ACE11111111
// const [n,t,m,p] = [16,16,2,2]; // result 13579BDF01234567

const solution = function(n, t, m, p) {
    let str = '';
    let result = '';

    let number = 0;
    while(str.length < t*m) {
        str += number.toString(n);
        number ++;
    }

    while(result.length < t) {
        result += str[p-1];
        p += m;
    }

    console.log(str);
    return result.toUpperCase();
}

console.log(solution(n, t, m, p));