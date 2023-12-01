const info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"];
const query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"];

const ordersExample = [
    ['cpp', 'java', 'python'],
    ['backend', 'frontend'],
    ['junior', 'senior'],
    ['chicken', 'pizza']
]

function solution(info, query) {
    let answer = new Array(query.length).fill(0);

    const infoArr = info.map((value) => {
        const arr = value.split(' ');
        const score = arr.pop();
        const str = arr.reduce((acc, cur) => {
            return acc += cur;
        }, '');

        return [str, Number(score)];
    })

    const queryArr = query.map(value => {
        const arr = value.split(' ').filter(value => value !== 'and');
        const score = arr.pop();

        return [arr, Number(score)];
    })

    console.log(queryArr);
    console.log(infoArr);

    const queryResult = queryArr.map((query, index) => {
        const [orders, score] = query;
        let strArr = [];

        orders.forEach((order, orderIndex) => {
            if(strArr.length === 0) {
                if(order === '-') {
                    strArr.push('cpp');
                    strArr.push('java');
                    strArr.push('python');
                } else {
                    strArr.push(order);
                }
            } else {
                if(order === '-') {
                    ordersExample.forEach((ex) => {
                        strArr = strArr.map(str => str + ex[orderIndex])
                    })
                } else {
                    strArr = strArr.map((str) => str + order)
                }
            }
        })

        return [strArr, score];
    })

    function strMaker(orders, index) {
        if(index === 0) {

        } else if(index === 1) {

        }
    }


    return answer;
}

console.log(solution(info, query));