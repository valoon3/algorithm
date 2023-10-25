const expression = "100-200*300-500+20";
// const expression = "50*6-3*2";

function solution(expression) {
    let answer = 0;

    const formulas = [
        ['*', '+', '-'],
        ['*', '-', '+'],
        ['+', '-', '*'],
        ['+', '*', '-'],
        ['-', '*', '+'],
        ['-', '+', '*'],
    ];

    expression = expression.split(/(\D)/);
    console.log(expression);

    const countFuc = (array, operator) => {
        const result = [];
        array.forEach((value) => {
            if(result[result.length-1] === operator) {
                const op = result.pop();
                const beforeValue = result.pop();
                result.push(eval(`${beforeValue} ${op} ${value}`));
            } else {
                result.push(value);
            }
        })

        return result;
    }

    formulas.forEach((formula) => {
        let result = [];

        formula.forEach((operator, i) => {
            if(i === 0) {
                result = countFuc(expression, operator);
            } else {
                result = countFuc(result, operator);
            }
        })

        // 절대값
        if(answer < Math.abs(result[0])) answer = Math.abs(result[0]);
    })

    return answer;
}

console.log(solution(expression));