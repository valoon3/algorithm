//https://github.com/codeisneverodd/programmers-coding-test
//더 좋은 풀이가 존재할 수 있습니다.
//정답 1(🎩 refactor 220425) - codeisneverodd
function solution(dartResult) {
    const regex = /\d{1,2}[SDT]{1}[*|#]?/g;
    let result = [];
    for (const dart of dartResult.match(regex)) {
        const game = [...dart.split(/([SDT]{1})/)];
        const score = game[0];
        let bonus = 1;
        let option = 1;
        if (game[1] === "S") bonus = 1;
        if (game[1] === "D") bonus = 2;
        if (game[1] === "T") bonus = 3;

        if (game[2] === "*") {
            if (result.length !== 0) result[result.length - 1] *= 2;
            option = 2;
        }
        if (game[2] === "#") option = -1;

        result.push(score ** bonus * option);
    }

    return result.reduce((a, b) => a + b);
}