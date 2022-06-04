function solution(a, b) {
    var answer = 0;

    if(a == b)
        return a;

    while(a < b) {
        answer += a;
        a ++;
    }

    while(b < a) {
        answer += b;
        b ++;
    }
    answer += b;

    return answer;
}