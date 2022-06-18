const arr1 = [1, 3, 6, 4, 1, 2, 2, 2, 2];
const arr2 = [-1, -2];

function solution(A) {
    let result = 1;
    let set = new Set(A);
    while(set.has(result)){
        result++;
    }


    return result;
}

solution(arr1);
