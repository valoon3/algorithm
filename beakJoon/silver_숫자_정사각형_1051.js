const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [rCount, cCount, map] = filter(input);
        solution(rCount, cCount, map);
        process.exit();
    });

function filter(input) {
    const [rCount, cCount] = input.shift().split(' ').map(Number);
    return [rCount, cCount, input];
}

function solution(rCount, cCount, map) {
    let answer = 1;

    let minCount = Math.min(rCount, cCount) - 1;

    while(minCount > 0) {
        for(let i = 0; i + minCount < rCount; i ++) {
            for(let j = 0; j + minCount < cCount; j ++) {
                if(map[i][j] === map[i + minCount][j] && map[i][j] === map[i][j + minCount] && map[i][j] === map[i + minCount][j + minCount]) {
                    answer = Math.max(answer, (minCount+1) * (minCount + 1));
                    break;
                }
            }
        }
        minCount --;
        if(answer !== 1) break;
    }

    console.log(answer);
}