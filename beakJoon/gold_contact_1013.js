const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const arr = filter(input);
        solution(arr);
        process.exit();
    });

function filter(input) {
    input.shift();
    return input;
}
// 111100
// 01 100011 011 0001

function solution(arr) {
    // (100+1+ | 01)+
    const result = [];

    let search01 = (string, index) => {
        if(!string[index + 1]) return -1;
        if(string[index] === '0' && string[index + 1] === '1') return index + 2;
        return -1;
    }

    let search100plus1plus = (string, index) => {
        if(string[index + 1] === '0' && string[index + 2] === '0') {
            index += 3;

            while(string[index] === '0') {
                index ++;
            }
            index ++;

            while(string[index] === '1') {
                if(string[index + 1] === '0' && string[index + 2] === '0') {
                    return index;
                }
                index ++;
            }

            return index;
        }
        else
            return -1;
    }

    arr.forEach(string => {
        let flag = 0;

        while(flag < string.length && flag >= 0) {
            if(string[flag] === '0') flag = search01(string, flag);
            else flag = search100plus1plus(string, flag);
        }

        if(flag === -1) result.push('NO');
        else result.push('YES');
    })

    console.log(result.join('\n'));
}