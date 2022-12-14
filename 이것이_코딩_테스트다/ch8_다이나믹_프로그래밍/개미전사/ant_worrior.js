// 개미 전사
const storage = [1,3,1,5];

const solution = function(storage) {

    const attackScore = [storage[0]];

    attackScore[1] = Math.max(attackScore[0], storage[1]);

    for(let i = 2; i < storage.length; i ++) {
        attackScore[i] = Math.max(attackScore[i-1],attackScore[i-2] + storage[i])
    }

    return attackScore[storage.length-1];
}

console.log(solution(storage));