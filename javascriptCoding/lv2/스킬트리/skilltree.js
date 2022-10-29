const [skill, skill_trees] = ["CBD", ["BACDE", "CBADF", "AECB", "BDA"]];

function solution(skill, skill_trees) {
    let answer = 0;

    skill_trees.forEach(skillTree => {

        let skillArray = [];
        for(let i = 0; i < skill.length; i ++) {
            let temp = [...skillTree].findIndex(d => d == skill[i]);
            skillArray.push(temp);
        }
        console.log(skillArray);
        let bigNum = 0;
        for(let i = 0; i < skillArray.length; i ++)  {
            // -1 뒤에는 -1보다 큰수가 나오면 안된다.
            if(bigNum == -1 && skillArray[i] != -1) {
                break;
            }
            // skillArray[i] 뒤에는 skillArray[i] 보다 작은수가 나오면 안된다.
            if(bigNum > skillArray[i] && skillArray[i] != -1) {
                break;
            }
            if(i == skillArray.length-1)
                answer ++;
            bigNum = skillArray[i];
        }

    })
    console.log(answer);
    return answer;
}

solution(skill, skill_trees);