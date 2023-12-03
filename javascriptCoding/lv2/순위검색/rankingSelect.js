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
    let infoMap = new Map;

    const binarySearch = (list,num) => {
        let [left,right] = [0,list.length-1]

        while (left <= right) {
            let mid = ~~((left + right) / 2)
            if (list[mid] === num) {
                while (mid>0 && list[mid-1]===num) mid --
                return mid
            }

            if (list[mid] > num) right = mid-1
            else left = mid+1
        }
        return left
    }

    const infoArr = info.map((value) => {
        const arr = value.split(' ');
        const score = arr.pop();
        const str = arr.reduce((acc, cur) => {
            return acc += cur;
        }, '');

        return [str, Number(score)];
    }).sort((a, b) => a[1] - b[1]);

    infoArr.forEach(([str, score]) => {
        if(infoMap.has(str)) {
            infoMap.get(str).push(score);
        } else {
            infoMap.set(str, [score]);
        }
    })

    const queryArr = query.map(value => {
        const arr = value.split(' ').filter(value => value !== 'and');
        const score = arr.pop();

        return [arr, Number(score)];
    })

    // console.log(infoMap);

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
                    let newStrArr = [];
                    ordersExample[orderIndex].forEach((ex) => { // backend, frontend
                        strArr.forEach((str) => newStrArr.push(str + ex));
                    })
                    strArr = newStrArr;
                } else {
                    strArr = strArr.map((str) => str + order)
                }
            }
        })

        return [strArr, score];
    })

    console.log(queryResult);

    return queryResult.map(([orders, targetScore], idnex) => {
        let result = 0;

        orders.forEach(order => {
            if(infoMap.has(order)) {
                const infoArr = infoMap.get(order);
                // const count = binarySearchCount(infoArr, targetScore);
                result += (infoArr.length - binarySearch(infoArr, targetScore));
            }
        })

        return result;
    })
}

console.log(solution(info, query));