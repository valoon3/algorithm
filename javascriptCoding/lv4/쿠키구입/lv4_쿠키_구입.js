// const cookie = [1,1,2,3]; // result 3
const cookie = [1,2,4,5]; // result 0

function solution(cookie) {
    let result = 0;

    const isPossible = (index) => index >= 0 && index < cookie.length;

    for(let i = 0; i < cookie.length - 1; i ++) {
        let left = i;
        let right = left + 1;
        let leftSum = cookie[left];
        let rightSum = cookie[right];

        while(true) {
            if(leftSum === rightSum && leftSum > result) {
                result = Math.max(result, leftSum);
            } else if(leftSum <= rightSum && isPossible(left - 1)) {
                left --;
                leftSum += cookie[left];
            } else if(rightSum <= leftSum && isPossible(right + 1)) {
                right ++;
                rightSum += cookie[right];
            } else {
                break;
            }
        }
    }

    console.log(result);
    return result;
}

solution(cookie);