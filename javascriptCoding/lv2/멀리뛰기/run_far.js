function solution(n) {

    if(n < 2) {
        return 1;
    }
    const count = [0, 1, 2, ...Array(n-2).fill(0)];
    count.forEach((_, i) => {
        if(i > 2) {
            count[i] = (count[i-2] + count[i-1]) % 1234567;
        }
    });

    return count[n];
}

console.log(solution(4));