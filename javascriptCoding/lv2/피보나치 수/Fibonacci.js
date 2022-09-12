let cache = [0, 1, 1, 2];

function solution(n) {
    return fibonacci_1234567(n);
}

function fibonacci_1234567(n) {
    for(let i = 2; i <= n; i ++) {
        cache[i] = (cache[i-1] + cache[i-2]) % 1234567;
    }

    return cache[n];
}