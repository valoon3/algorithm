// const [priorities, location] = [[2, 1, 3, 2], 2]; // result 1
const [priorities, location] = [[1, 1, 9, 1, 1, 1], 0] // result 5

// 1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
// 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
// 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
// 3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.

const solution = function(priorities, location) {
    let result = 0;
    let max = 0;

    while(priorities.length > 0 || location !== -1) {
        if(max === 0) {
            max = Math.max(...priorities);
        }
        const q = priorities.shift();
        location --;

        if(max > q) {
            priorities.push(q);
            if(location < 0) location = priorities.length - 1;
        } else {
            max = 0;
            result ++;
            if(location < 0) break;
        }
    }

    return result;
}

console.log(solution(priorities, location));