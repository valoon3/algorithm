// const [survey, choices] = [["AN", "CF", "MJ", "RT", "NA"], [5, 3, 2, 7, 5]];
const [survey, choices] = [["TR", "RT", "TR"], [7, 1, 3]];

const type = {
    "R":0,
    "T":0,

    "C":0,
    "F":0,

    "M":0,
    "J":0,

    "A" : 0,
    "N" : 0,
}


function solution(survey, choices) {
    let answer = '';

    const types = Object.keys(type);

    for(let i = 0; i < survey.length; i ++) {

        let [disagree, agree] = survey[i];
        let choice = choices[i];

        type[choice > 4 ? agree : disagree] += Math.abs(choice - 4);
    }

    answer += type.R >= type.T ? 'R' : 'T';
    answer += type.C >= type.F ? 'C' : 'F';
    answer += type.J >= type.M ? 'J' : 'M';
    answer += type.A >= type.N ? 'A' : 'N';



    return answer;
}

console.log(solution(survey, choices));