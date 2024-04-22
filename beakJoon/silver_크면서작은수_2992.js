const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const number = filter(input);
        solution(number);
        process.exit();
    });

function filter(input) {
    return input[0]
}

function solution(number) {
    const numberArr = number.split('').map(Number).sort((a, b) => a - b).map(String);
    let numberMap = new Set();

    const dfs = (madeNumber, visited) => {
        if(madeNumber.length === numberArr.length) {
            numberMap.add(madeNumber);
            return;
        }

        for(let i = 0; i < numberArr.length; i ++) {
            if(visited[i]) continue;

            let newMadeNumber = madeNumber;
            const newVisited = [...visited];
            newVisited[i] = true;
            newMadeNumber += numberArr[i];
            dfs(newMadeNumber, newVisited);
        }
    }

    dfs('', new Array(numberArr.length).fill(false));
    numberMap = [...numberMap];
    let index = numberMap.indexOf(number);

    if(index === -1) console.log(0);
    else {
        while(numberMap[index] === number) index ++;
        numberMap[index] ? console.log(numberMap[index]) : console.log(0);
    }
}