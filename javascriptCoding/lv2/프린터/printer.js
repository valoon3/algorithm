

function solution(priorities, location) {
    var answer = 0;
    let temp = 0;
    while(priorities.length != 0) {
        if(priorities[0] >= Math.max(...priorities)) {
            if(location == 0) {
                temp++;
                break;
            }
            priorities.shift();
            location--;
            temp ++;
        }
        else {
            priorities.push(priorities.shift());
            if(location == 0)
                location = priorities.length - 1;
            else
                location --;
        }
    }

    answer = temp;
    return answer;
}

let arr1 = [1, 1, 9, 1, 1, 1];
let arr2 = [2, 1, 3, 2];

console.log(solution(arr1, 0));