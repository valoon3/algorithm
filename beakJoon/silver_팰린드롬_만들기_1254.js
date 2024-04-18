// const input = "abab";
// const input = "abacaba";
// const input = "qwerty";
// const input = "abdfhdyrbdbsdfghjkllkjhgfds";

const solution = s => {
    const n = s.length;
    let answer = n;

    let reverse = s.split('').reverse().join('');

    for (let i = 0; i < n; i++) {
        let flag = true;
        for (let j = 0; j < n - i; j++) {
            if (s[i + j] !== reverse[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            answer += i;
            break;
        }
    }
    return answer;
};

// function solution(input) {
//     const n = input.length - 1;
//     let flagIndex = -1;
//     let front = 0;
//     let back = n;
//
//     while(front <= back) {
//         if(input[front] === input[back]) {
//             front ++;
//             back --;
//         } else {
//             flagIndex = front;
//             front ++;
//             back = n;
//         }
//     }
//
//     console.log(input.length + flagIndex + 1);
// }

// solution(input);


const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        solution(input[0]);
        process.exit();
    });