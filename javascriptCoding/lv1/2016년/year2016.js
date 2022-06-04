const week = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED',];
const month = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



function solution(a, b) {
    var answer = '';
    let day = 0;

    for(let i = 0; i < a; i++ ) {
        day += month[i];
    }
    day += b;
    answer = week[day % 7];

    return answer;
}

console.log(solution(1, 1));