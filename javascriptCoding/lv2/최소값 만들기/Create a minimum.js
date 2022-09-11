const [a, b] = [[1, 4, 2], [5, 4, 4]];

function solution(A,B){
    let answer = 0;

    A.sort((a,b) => {
        return b - a;
    })
    B.sort((a,b) => {
        return a - b;
    })

    for(let i = 0; i  < A.length; i ++) {
        answer += A[i] * B[i];
    }

    // console.log(answer);

    return answer;
}

solution(a, b);