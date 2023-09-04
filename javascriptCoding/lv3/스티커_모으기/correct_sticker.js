const sticker = [14, 6, 5, 11, 3, 9, 2, 10]; // result 36
//11 9 10 6
// const sticker = [1, 3, 2, 5, 4]; // result 8
// 3 5

const solution = function(sticker) {
    const len = sticker.length+2;
    let dp1 = Array(len).fill(0);
    let dp2 = Array(len).fill(0);

    // dp1[0] = sticker[0];
    // dp1[1] = 0;
    //
    // dp2[0] = 0;
    // dp2[1] = sticker[1];

    if(sticker.length === 1) return sticker[0];

    for(let i = 2; i < len-1; i ++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i-2]);
    }

    for(let i = 3; i < len; i ++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i-2]);
    }

    console.log(dp1);
    console.log(dp2);

    return Math.max(dp1[len-2], dp2[len-1]);
}

console.log(solution(sticker));