function solution(s) {
    let answer = [];

    let str = s.split(' ');

    for(let s of str) {
        answer.push(converter(s.toLowerCase()));
    }

    function converter(s) {
        let result = '';

        if(s[0] == 0 || s[0] == 1 || s[0] == 2 || s[0] == 3 || s[0] == 4 || s[0] == 5 || s[0] == 6 || s[0] == 7 || s[0] == 8 || s[0] == 9) {
            return s;
        }

        result += s[0].toUpperCase() + s.substring(1);
        return result;
    }

    return answer.join(' ')
}

let result = solution("3people unFollowed me");
console.log(result);