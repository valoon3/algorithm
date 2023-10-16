const numbers = [7, 42, 5]; // result [1,1,0]
// const numbers = [63, 111, 95] // [1,1,0]

function solution(numbers) {

    const map = numbers.map(number => {
        let binaryNumber = number.toString(2);

        let n = binaryNumber.length; // 노드의 갯수
        let level = n.toString(2).length;

        for(let i = 0; i < 2**level - 1 - n; i++) {
            binaryNumber = '0' + binaryNumber;
        }

        return binaryTreeCheck(binaryNumber, 0, binaryNumber.length-1) ? 1 : 0;
    });

    return map;

    // 1 2
    // 3 5

    // 010101010101010

    function binaryTreeCheck(binaryString, start, end) {
        const middleIndex = Math.floor((start + end) / 2); // 3
        const leftIndex = Math.floor((middleIndex - 1 + start) / 2);
        const rightIndex = Math.floor((middleIndex + 1 + end) / 2);

        const parent = binaryString[middleIndex];
        const leftChild = binaryString[leftIndex];
        const rightChild = binaryString[rightIndex];

        if(start === end) return true;

        if(parent === '0' && (leftChild === '1' || rightChild === '1')) {
            return false;
        }

        console.log(binaryString, ' ', leftIndex, ' ', middleIndex, ' ', rightIndex);

        // 왼쪽 루트 확인
        if(!binaryTreeCheck(binaryString, start, middleIndex-1)) return false;

        // 오른쪽 루트 확인
        if(!binaryTreeCheck(binaryString, middleIndex+1, end)) return false;

        return true;
    }

}

console.log(solution(numbers));