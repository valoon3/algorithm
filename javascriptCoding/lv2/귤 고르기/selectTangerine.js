// const [k, tangerine] = [6, [1, 3, 2, 5, 4, 5, 2, 3]]; // result 3
// const [k, tangerine] = [4, [1, 3, 2, 5, 4, 5, 2, 3]]; // result 2
// const [k, tangerine] = [2, 	[1, 1, 1, 1, 2, 2, 2, 3]]; // result 1

function solution(k, tangerine) {
    var answer = 0;

    let sizeArr = [];

    tangerine.forEach(size => {
        if(sizeArr[size]) {
            sizeArr[size] ++;
        }
        else {
            sizeArr[size] = 1;
        }
    });

    sizeArr.sort((a,b) => b-a);

    let num = 0;
    for(let i = 0; i < sizeArr.length; i ++) {
        num += sizeArr[i];
        answer ++;

        if(num >= k) {
            break;
        }
    }

    return answer;
}


solution(k, tangerine);