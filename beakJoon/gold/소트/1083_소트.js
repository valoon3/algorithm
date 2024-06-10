const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const N = Number(input[0]);
    const nums = input[1].split(' ').map(Number);
    const count = Number(input[2]);

    return [N, nums, count];
}

function solution(N, nums, count) {
    let flag = 0;
    let answer = '';

    // console.log(flag, nums, count);

    const swap = (index1, index2) => {
        [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
    }

    const sortSwap = (maxIndex) => {
        while(flag < maxIndex) {
            swap(maxIndex, maxIndex - 1);
            maxIndex --;
        }
    }

    const bubbleSort = (count) => {
        let start = flag;
        let end;

        if(flag + count >= nums.length - 1) {
            end = nums.length - 1;
        } else end = flag + count;

        let max = 0;
        let maxIndex = 0;

        for(let i = flag; i < flag + count + 1; i ++) {
            if(nums[i] > max) {
                max = nums[i];
                maxIndex = i;
            }
        }

        sortSwap(maxIndex);
        count -= maxIndex - flag;
        flag ++;

        if(count > 0 && flag < nums.length) bubbleSort(count);
    }

    bubbleSort(count);
    console.log(nums.join(' '));
}

const [N, nums, count] = filter(input);
solution(N, nums, count);