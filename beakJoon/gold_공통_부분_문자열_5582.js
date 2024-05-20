const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [string1, string2] = filter(input);
        solution(string1, string2);
        process.exit();
    });

function filter(input) {
    return [input[0], input[1]];
}

function solution(string1, string2) {
    let shortString = '';
    let longString = '';

    if(string1.length > string2.length) {
        shortString = string2;
        longString = string1;
    } else {
        shortString = string1;
        longString = string2;
    }


    function checkString(stringLength) {
        for(let i = 0; i + stringLength <= shortString.length; i ++) {
            const newString = shortString.substring(i, i + stringLength);
            if(longString.includes(newString)) {
                return true;
            }
        }

        return false;
    }

    let left = 0;
    let mid = Math.floor(shortString.length / 2);
    let right = shortString.length;

    while(true) {
        if(left >= mid || right <= mid) {
            console.log(mid);
            break;
        }

        if(checkString(mid)) {
            left = mid;
            mid = Math.floor((left + right) / 2);
        } else {
            right = mid;
            mid = Math.floor((left + right) / 2);
        }
    }
}