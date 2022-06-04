// 자르고 정렬 k번째 숫자 리턴
function controller(array, i, j, k) {

    //console.log(array);

    let tempArr = [...array].slice(i-1, j);
    console.log('정렬 안된 ', tempArr);
    console.log('정렬된 ', tempArr.sort());

    return tempArr.sort()[k-1];
}

function solution(array, commands) {
    var answer = [];

    for(let i = 0; i < commands.length; i++ ) {
        answer.push(controller(
            array,
            commands[i][0],
            commands[i][1],
            commands[i][2],
        ));
    }

    console.log('answer: ', answer);
    return answer;
}

solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]] );

//console.log('test : ', [[2, 5, 3], [4, 4, 1], [1, 7, 3]]);