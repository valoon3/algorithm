function solution(s) {

    if(s.length == 1 || s.length == 2)
        return s



    return s.length % 2 == 0 ? s.slice(s.length/2-1, s.length/2+1) : s[Math.floor(s.length / 2)];
}

let s1 = "abcde";
let s2 = "qwer";
