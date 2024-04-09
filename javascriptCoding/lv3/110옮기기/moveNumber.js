const s = ["1110","100111100","0111111010"];
// result ["1101","100110110","0110110111"]

function solution(s) {
    const answer = [];

    const find111Index = (str) => {
        const result = [];
        let idx = str.indexOf('111');

        while(idx !== -1) {
            result.push(idx + 2);
            idx = str.indexOf('111', idx + 3);
        }

        return result;
    }

    const find110Index = (str) => {
        const result = [];
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '0') {
                result.push(i);
            }
        }
        return result;
    }

    for(let str of s) {
        const index111 = find111Index(str);
        const index0 = find110Index(str);
        const arr = [...str];

        if(index111.length === 0 || index0.length === 0) {
            answer.push(str);
            continue;
        }

        let frontIndex = 0;
        let backIndex = 0;

        let front = index111[frontIndex];
        let back = index0[backIndex];

        console.log(str);
        console.log(index111, index0);

        while(index111[frontIndex] !== undefined && index0[backIndex] !== undefined && index111[frontIndex] < index0[backIndex]) {
            arr[front] = '0';
            arr[back] = '1';

            frontIndex++;
            backIndex--;
        }

        console.log(arr.join(''));
        answer.push(arr.join(''));
    }


    return answer;
}

console.log(solution(s));