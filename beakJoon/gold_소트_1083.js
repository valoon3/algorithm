const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [N, arr, chance] = filter(input);
        solution(N, arr, chance);
        process.exit();
    });

function filter(input) {
    const N = Number(input[0]);
    const arr = input[1].split(' ').map(Number);
    const S = Number(input[2]);
    return [N, arr, S];
}

function solution(N, arr, S) {
    let flag = 0;

    const swap = (idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }

    while(S > 0 && flag < N) {
        let index = flag + S;
        if(index > N) index = N-1;

        let newFlag = index;
        while(index > flag) {
            if(arr[index] > arr[index-1]) {
                swap(index, index-1);
                S--;
                newFlag = index - 1;
            }
            index --;
        }
        flag = newFlag;
    }


    console.log(arr.join(' '));
}

// console.log(solution(3, [1, 2, 3], 4));
// console.log(solution(10, [19, 20, 17, 18, 15, 16, 13, 14, 11, 12], 5));

// 19 20 17 18 15 16 13 14 11 12
// 20 19 17 18 15 16 13 14 11 12
// 20 19 18 17 15 16 13 14 11 12
// 20 19 18 17 16 15 13 14 11 12
// 20 19 18 17 16 15 14 13 11 12
// 20 19 18 17 16 15 14 13 12 11