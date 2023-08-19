// function solution(s){
//     let arr = [];
//
//     for(let c  of s) {
//         if(c == ')' && arr.length == 0){
//             return false;
//         }
//         else if(c == '(') {
//             arr.push(c);
//         }
//         else if(c == ')')
//             arr.pop();
//     }
//
//     if(arr.length == 0)
//         return true;
//     return false;
// }

const s = "()()"; // result true
// const s = "(())()"; // result true
// const s = ")()("; // result false
// const s = "(()("; // result false

const solution = function(s) {
    const stack = [];

    if(s[0] === ')') return false;

    for(let i = 0; i < s.length; i++) {
        if(stack.length === 0 && s[i] === ')') return false
        s[i] === '(' ? stack.push(s[i]) : stack.pop();
    }

    return stack.length === 0;
}

console.log(solution(s));