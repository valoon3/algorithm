const len = 6;
const want = [19,15,10,17];

function solution() {

    const binary_search = function(want, target, start, end) {
        if(start >= end) {
            return start;
        }

        let cutSize = parseInt((start+end)/2);
        let sum = want.reduce((sum, cur) => {
            if(cur - cutSize > 0) {
                return sum + cur - cutSize;
            } else {
                return sum;
            }
        }, 0);

        if(sum == target) {
            return cutSize;
        } else if(sum < target) {
            end = cutSize-1;
            return binary_search(want, target, start, end);
        } else {
            start = cutSize + 1;
            return binary_search(want, target, start, end);
        }
    }

    let start = 0;
    let end = want[want.length-1];

    want.sort((a,b) => a-b);

    return binary_search(want, len, start, end);

}

console.log(solution());