
function give(array) {

    for(let i = 0; i < array.length; i ++) {
        if(array[i] == 0) {
            // 왼쪽 검사
            if(i - 1 >= 0 && array[i-1] > 1) {
                array[i] ++;
                array[i-1] --;
            }
            // 오른쪽 검사
            else if(i + 1 < array.length && array[i+1] > 1) {
                array[i] ++;
                array[i+1] --;
            }
        }
    }
}

function solution(n, lost, reserve) {
    var answer = 0;

    let students = [];

    for(let i = 0; i < n; i ++) {
        students.push(1);
        if(lost.find(value => value == i+1))
            students[i] --;
        if(reserve.find(value => value == i+1))
            students[i] ++;
    }

    give(students);
    answer = students.reduce((sum, curVal, idx ) => {
        if(curVal != 0)
            return sum + 1;
        return sum;
    }, 0)
    console.log(answer);


    return answer;
}

solution(5, [2, 4], [1, 3, 5])