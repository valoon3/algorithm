const [A, B] = [[5,1,3,7], [2,2,6,8]];
// const [A, B] = [[2,2,2,2], [1,1,1,1]];

function solution(A, B) {
    let answer = 0;

    A.sort((a,b) => a - b);
    B.sort((a,b) => a - b);

    let idx = 0;

    A.forEach(aNum => {

        for(idx; idx < B.length; idx++) {
            if(B[idx] > aNum) {
                answer ++;
                idx++;
                break;
            }
        }
    })

    return answer;
}

console.log(solution(A,B));