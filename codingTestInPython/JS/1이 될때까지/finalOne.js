
function makeOne(n, k, count) {
    if(n == 1)
        return count;
    count ++;
    if(n % k == 0 && n >= k){
        return makeOne(n/k, k, count);
    }
    else if(n % k !== 0){
        return makeOne(n --, k, count);
    }
}

// n : 1로 만드려는 값
// k : 나누는 값
function solution(n, k) {
    result = makeOne(n, k, 0);

    console.log(result);
}
solution(25, 5);