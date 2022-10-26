const nums = [3,1,2,3];
// const nums = [3,3,3,2,2,4];
// const nums = [3,3,3,2,2,2];

function solution(nums) {
    let answer = 0;
    let getPokemon = nums.length/2;
    let set = new Set(nums);

    answer = set.size > getPokemon? getPokemon : set.size;
    return answer;
}

console.log(solution(nums));