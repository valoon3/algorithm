const [food_times, k] = [[3, 1, 2], 5]; // result 1

function solution(food_times, k) {
    const map = new Map; // 다 먹은 음식들의 인덱스가 저장된다.
    const total = food_times.reduce((acc, cur) => acc + cur, 0);

    if(total < k) return -1; // 먹을 음식이 없다.

    const getFoodIndex = (index) => {
        index = index % food_times.length;

        if(!map.has(index)) {
            return index; // 안먹은 음식의 인덱스
        }

        const nextFoodIndex = getFoodIndex(map.get(index));
        map.set(index, nextFoodIndex); // 먹음 음식의 다음 인덱스 갱신
        return nextFoodIndex;
    }

    for(let i = 0; i < k; i ++) {
        const foodIndex = getFoodIndex(i);
        food_times[foodIndex] --;

        if(food_times[foodIndex] === 0) {
            const nextFoodIndex = getFoodIndex(foodIndex + 1);
            map.set(foodIndex, nextFoodIndex); // 다먹음 음식 다음 음식 설정
        }
    }

    return getFoodIndex(k) + 1;
}

console.log(solution(food_times, k));