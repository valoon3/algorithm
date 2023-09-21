// const p = "(()())()"; // result "(()())()"
const p = ")("; // result "()"
// const p = "()))((()"; // result "()(())()"

// 균형잡힌 괄호 문자열
// 올바른 괄호 문자열

function solution(p) {

    const checkU = function(u) {
        let stack = [];
        for (let i = 0; i < u.length; i++) {
            if (u[i] === '(') stack.push('(')
            else {
                if (stack.length === 0) return false;
                stack.pop();
            }
        }
        return true;
    }

    const makeUV = function(v) {
        let u = '';
        let _v = '';
        let trueCount = 0;
        let falseCount = 0;

        for(let i = 0; i < v.length; i ++) {
            u += v[i];
            if(v[i] === '(') {
                trueCount++;
            } else {
                falseCount++;
            }

            if(trueCount === falseCount) {
                // return [u, v.slice(i+1)]; // [u, v];
                _v = v.slice(i+1);
                break;
            }
        }

        return [u, _v];
    }

    const again = function(v) {
        if(!v) return '';

        let [_u, _v] = makeUV(v);

        if(checkU(_u))
            return _u + again(_v);
        else {
            let answer = '(' + again(_v) + ')';

            for(let i = 1; i < _u.length - 1; i ++) {
                if(_u[i] === '(')
                    answer += ')';
                else
                    answer += '(';
            }

            return answer;
        }
    }

    return again(p);
}

console.log(solution(p));