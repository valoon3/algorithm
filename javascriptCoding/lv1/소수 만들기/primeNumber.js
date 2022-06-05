
// 숫자가 소수인지 검사
const primeNumber = function (num) {
    if(num % 2 == 0)
        return false;

    for(let i = 3; i < num; i = i + 2){
        if(num % i == 0)
            return false;
    }

    return true;
}


function solution(nums) {
    var answer = [];
    for(let i = 0; i < nums.length - 2; i ++) {
        let first = nums[i];
        for(let j = i + 1; j < nums.length-1; j ++) {
            let second = nums[j];
            for(let k= j + 1; k < nums.length; k ++) {
                let third = nums[k];
                let sum = first + second + third;
                if(primeNumber(sum) === true)
                    answer.push(sum);
            }
        }
    }
    console.log(answer);

    return answer.length;
}

console.log(solution([1,2,7,6,4]));