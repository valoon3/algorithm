const N = 4; // 떡의 갯수
const M = 6; // 소비자가 가져갈 길이
const arr = [19, 15, 10, 17];

function cutter(arr, h) {
    return arr.reduce((sum, value) =>  value <= h ? sum - value : sum + value - h );
}

// ( 찾을 배열, 탐색할 값, 시작점, 끝점 )
const binarySearch = (list, target, left, right) => {
    let mid = 0;

    while (left <= right) {
        // 가운데 인덱스
        mid = Math.floor((left + right) / 2);

        if (list[mid] === target) {
            return mid;
        }

        // 대소 비교로 범위 지정
        if (list[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

function solution(N, M, arr) {

    // cutter의 결과는 M보다 크지만 그중 가장 작아야한다.
    let num = (Math.max(arr) + Math.min(arr)) / 2;


}

console.log(cutter(arr, 10));