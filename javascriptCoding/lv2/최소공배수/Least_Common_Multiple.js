function solution(arr) {
    let answer = 1;
    let tempnum = 101;

    // // 최대공약수 구하기
    // for(let i = 100; i > 0; i --) {
    //     for(let j = 0; j < arr.length; j ++) {
    //         if(arr[j] % i != 0) {
    //             break;
    //         }
    //         if(j == arr.length-1){
    //             tempnum = i;
    //             break;
    //         }
    //     }
    //     if(tempnum != 101)
    //         break;
    // }

    arr.forEach((num, index) => {

    })

    arr.forEach(num => {
        answer = answer * Number(num / tempnum);
    })

    return answer * tempnum;
}

console.log(solution([3, 4, 9, 16]));

// console.log(parseInt(1/2)) // 144

