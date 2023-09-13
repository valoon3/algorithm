// const N = 5;        // result 2
// const N = 6;        // result 2
const N = 5000;     // result 5

function solution(n)
{
    // let result = 1;
    // let dp = new Array(n + 1).fill(n);
    // dp[0] = 0;
    //
    // for(let i = 1; i <= n; i ++) {
    //     if(dp[i] === n) dp[i] = dp[i-1] + 1;
    //     if(dp[i] > i) dp[i] = dp[i-1]+1;
    //
    //     let k = i;
    //     while(k*2 <= n) {
    //         dp[k * 2] = dp[i];
    //
    //         k *= 2;
    //     }
    // }
    //
    // return dp[dp.length-1];

    let result = 0;

    while(n > 0) {
        if(n % 2 === 0) {
            n /= 2;
        } else {
            n -= 1;
            result ++;
        }
    }

    return result;
}

console.log(solution(N));