const [stones, k] = [[2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3];
// [0, 2, 4, 5, 3, 2, 1, 4, 2, 5, 1]
function solution(stones, k) {

  // 이분탐색을 사용하자
  let left = 1;
  let right = 200000000;

  while(left <= right) {
    // let arr = [...stones];

    // let mid = Math.floor((left+right)/2);
    let mid = (left + right)/2 >> 0;
    let zeroCnt = 0;

    for(let i = 0; i < stones.length; i ++) {
      let stone = stones[i] - mid;

      zeroCnt = stone <= 0 ? zeroCnt + 1 : 0;

      if(zeroCnt === k) {
        break;
      }
    }

    zeroCnt === k ? right = mid - 1 : left = mid + 1;
  }

  return left;
}

solution(stones, k);

