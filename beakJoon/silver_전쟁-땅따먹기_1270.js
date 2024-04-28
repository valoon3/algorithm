const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const cases = filter(input);
        solution(cases);
        process.exit();
    });

function filter(input) {
    input.shift();

    return input.map(c => {
        c = c.split(' ');
        c.shift();
        return c.map(Number).sort((a, b) => a - b);
    });
}

function solution(cases) {
    const answer = Array(cases.length).fill('SYJKGW');

    cases.forEach((c, index) => {
        // console.log(c);
        let lands = Math.floor(c.length / 2);
        let allCount = 0;
        let thisCount = 0;
        let thisNumber = '';

        for(let i = 0; i < c.length; i ++) {
            let number = c[i].toString();

            if(number !== thisNumber) {
                thisNumber = number;
                thisCount = 0;
                if(allCount > lands) break;
            }

            allCount ++;
            thisCount ++;
            if(thisCount > lands) {
                answer[index] = number;
                break;
            }
        }


    })

    console.log(answer.join('\n'));
}