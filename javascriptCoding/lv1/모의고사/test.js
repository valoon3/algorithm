const students = [[1, 2, 3, 4, 5], [2, 1, 2, 3, 2, 4, 2, 5], [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]];

// 학생의 점수를 반환한다.
function scoring(answerArr, student) { // 답지, 학생 모의고사
    let score = 0;
    for(let i = 0; i < answerArr.length; i ++) {
        if(answerArr[i] == student[i % student.length])
            score ++;
    }
    return score;
}
// console.log(score([1, 2, 3, 4, 5], [1,3,2,4,2]));

function solution(answers) {
    var answer = [];
    let bigScore = 0;
    students.forEach((student, idx) => {
        let score = scoring(answers, student)
        if(answer.length == 0) { // 함수가 비어있을 때
            bigScore = score;
            answer.push(idx + 1);
        }
        else { // 함수에 값이 있을 때
            if(bigScore < score) {
                bigScore = score;
                answer = [idx + 1];
            }
            else if(bigScore == score)
                answer.push(idx + 1);

        }
    })

    console.log(answer);

    return answer;
}

solution([1, 2, 3, 4, 5]);