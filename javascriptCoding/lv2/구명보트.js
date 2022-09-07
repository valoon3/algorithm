const [people1, people2] = [[70, 50, 80, 50], [70, 80, 50]];
const [limit1, limit2] = [100, 100];

function solution(people, limit) {
    let firstPeople = 0;
    let lastPeople = people.length-1;
    let result = 0;
    people.sort((a,b) => b - a);

    if(people.length == 1)
        return 1;

    while(firstPeople <= lastPeople) {
        if(people[firstPeople] + people[lastPeople] <= limit) {
            firstPeople ++;
            lastPeople --;
        } else {
            firstPeople++;
        }
        result ++;
    }

    return result;


}

console.log(solution(people2, limit2));