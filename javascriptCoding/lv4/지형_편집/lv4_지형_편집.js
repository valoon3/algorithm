// const [land, P, Q] = [[[1, 2], [2, 3]], 3, 2];
// result 5
const [land, P, Q] = [[[4, 4, 3], [3, 2, 2], [ 2, 1, 0 ]], 5, 3];
// result 33

// p 추가 비용, q 제거 비용

function solution(land, P, Q) {
    const arr = [];
    land.forEach(row => {
        row.forEach(v => {
            arr.push(v);
        })
    })
    arr.sort((a, b) => a - b)

    // 2 3 4 5 6 7 8 9
    const binarySearch = (arr) => {
        const height = [...new Set(arr)];
        let result = Infinity;

        let frontHeight = 0;
        let backHeight = height[height.length - 1];

        while(frontHeight <= backHeight) {
            const midHeight = Math.floor((frontHeight + backHeight) / 2);
            const leftCost = howMuch(midHeight, arr);
            const rightCost = howMuch(midHeight + 1, arr);

            if(leftCost < rightCost) {
                backHeight = midHeight - 1;
            } else if(leftCost > rightCost) {
                frontHeight = midHeight + 1;
            } else {
                backHeight = midHeight -1;
            }

            result = Math.min(result, leftCost, rightCost);
        }

        return result;
    }

    const howMuch = (height, arr) => {
        let result = 0;

        arr.forEach(v => {
            let num = v - height; // 양수면 제거 음수면 추가
            if(num > 0) {
                result += num * Q; // 제거 비용
            } else {
                result += num * -P; // 추가 비용
            }
        })

        return result;
    }

    return binarySearch(arr);
}

console.log(solution(land, P, Q));