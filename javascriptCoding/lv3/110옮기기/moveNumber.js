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

    const find0Index = (str) => {
        const result = [];
        for(let i = str.length - 1; i >= 0; i--) {
            if(str[i] === '0') {
                result.push(i);
            }
        }
        return result;
    }

    s.forEach(str => {
        const index111 = find111Index(str);
        const index0 = find0Index(str);
        const arr = [...str];

        let frontIndex = 0;
        let front = index111[frontIndex];
        let backIndex = index0.length - 1;
        let back = index0[backIndex];

        console.log(index111, index0);

        // console.log(front, back);
        // console.log(str);
        // while(front < back) {
        //     arr[index111[front]] = '0';
        //     arr[index0[back]] = '1';
        //     front++;
        //     back--;
        // }

        console.log(arr.join(''));
        answer.push(arr.join(''));
    })


    return answer;
}

console.log(solution(s));