function solution(s){
    let arr = [];

    for(let c  of s) {
        if(c == ')' && arr.length == 0){
            return false;
        }
        else if(c == '(') {
            arr.push(c);
        }
        else if(c == ')')
            arr.pop();
    }

    if(arr.length == 0)
        return true;
    return false;
}

console.log(solution(	"()()"));