const num = 26; // return 3

function solution(num) {
    const tempArray = [0,0,1];

    // 바텀업 방식으로 진행
    for(let i = 3; i <= num; i ++) {
        tempArray[i] = tempArray[i-1]+1;

        if(i % 5 == 0) {
            tempArray[i] = Math.min(tempArray[i], tempArray[i/5]+1);
        }
        if(i % 3 == 0) {
            tempArray[i] = Math.min(tempArray[i], tempArray[i/3]+1);
        }
        if(i % 2 == 0) {
            tempArray[i] = Math.min(tempArray[i], tempArray[i/2]+1);
        }
    }

    console.log(tempArray);

    return tempArray[num];
}

console.log(solution(num));

// 다이나믹 프로그래밍 1로만들기