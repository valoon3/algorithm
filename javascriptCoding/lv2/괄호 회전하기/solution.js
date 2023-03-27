// const s = "[](){}"; // 3
// const s = "}]()[{"; // 2
// const s = "[)(]"; // 0
const s = "}}}"; // 0

function solution(s) {
  let answer = 0;

  const moveLeft = (s) => {
    let result = '';

    for(let i = 1; i < s.length; i ++) {
      result += s[i];
    }
    result += s[0];

    return result;
  };

  const check = (s) => {
    const stack = [];

    for(let i = 0; i < s.length; i ++) {
      if(s[i] === ']' && stack[stack.length-1] === '[') {
        stack.pop();
      } else if(s[i] === '}' && stack[stack.length-1] === '{') {
        stack.pop();
      } else if(s[i] === ')' && stack[stack.length-1] === '(') {
        stack.pop();
      } else {
        stack.push(s[i]);
      }

    }

    return stack.length === 0;
  }

  for(let i = 0; i < s.length; i ++) {
    answer += check(s) === true ? 1 : 0;
    s = moveLeft(s);
  }

  return answer;
}

console.log(solution(s));