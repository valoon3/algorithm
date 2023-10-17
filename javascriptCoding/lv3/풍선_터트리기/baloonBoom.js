// const a = [9,-1,-5]; // result 3
const a = [-16,27,65,-2,58,-92,-71,-68,-61,-33]; // result 6

function solution(a) {
    let front = a[0];
    let back = a[a.length - 1];
    let frontArr = [];
    let backArr = [];
    let result = new Set();

    for (let i = 1; i < a.length - 1; i++) {
        // 맨 앞과 뒤는 값과 상관없이 무조건 제외가능하기 때문에 제외를 하고 탐색
        let current = a[i];
        if (current < front) {
            // 앞에서 부터 비교
            front = current; // 맨 앞보다 값이 작으면 해당 값을 front로 변환
            result.add(current);
        }
    }

    for (let i = 1; i < a.length - 1; i++) {
        // 맨 앞과 뒤는 값과 상관없이 무조건 제외가능하기 때문에 제외를 하고 탐색
        let current = a[a.length - i - 1];
        if (current < back) {
            // 뒤에서 부터 비교
            back = current; // 맨 뒤보다 값이 작으면 해당 값을 back로 변환
            result.add(current);
        }
    }

    return result.size + 2;
}
console.log(solution(a));