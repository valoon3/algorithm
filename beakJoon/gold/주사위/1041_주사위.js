const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const n = +input[0];
    const diagram = input[1].split(' ').map(Number);

    const r = [5, 4, 3, 2, 1, 0];

    const oneSideOpen = Math.min(...diagram);
    let twoSideOpen = Infinity;
    let threeSideOpen = Infinity;

    if(n === 1) {
        console.log(diagram.reduce((pre, cur) => pre += cur, 0) - Math.max(...diagram));
        return;
    }

    const force = (index, result) => {
        if(result.length === 3) {
            const sum = result.reduce((pre, cur) => pre += diagram[cur], 0);
            threeSideOpen = Math.min(threeSideOpen, sum);
            result.pop();
            return;
        }

        if(result.length === 2) {
            const sum = result.reduce((pre, cur) => pre += diagram[cur], 0);
            twoSideOpen = Math.min(twoSideOpen, sum);
        }

        for(let i = index; i < 6; i ++) {
            const reverse = r[i];
            if(result.includes(reverse))
                continue;

            result.push(i);
            force(i + 1, result);
        }

        result.pop();
    }

    force(0, []);

    const sideCount = (n) => {
        let three = 4;
        // let two = (n * 4) - 4 + (n - 2) * 4;
        let two = 4*(n-1) + 4*(n-2);
        let one = (n - 2) * (n - 2) + (n-2) * (n-1) * 4;

        return [one, two, three];
    }

    const [one, two, three] = sideCount(n);
    // console.log(oneSideOpen, twoSideOpen, threeSideOpen);
    // console.log(one, two, three);
    console.log(one * oneSideOpen + two * twoSideOpen + three * threeSideOpen);

    // const answer = (threeSideOpen * 4) + (((n * 4) - 4 + (n - 2) * 4) * twoSideOpen) + (n-2)^2*5*oneSideOpen;
    // console.log(answer);
}

solution(input);