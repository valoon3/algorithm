
// const [left, right] = [13, 17];
const [left, right] = [24, 27];

const solution = function(left, right) {
    let result = 0;

    const calc = function(number) {
        let count = 0;
        for(let i = 1; i <= number; i ++) {
            if(number % i === 0) count ++;
        }

        return count % 2 === 0 ? number : -number;
    }

    for(let i = left; i <= right; i ++) {
        result += calc(i);
    }

    return result;
}

console.log(solution(left, right));