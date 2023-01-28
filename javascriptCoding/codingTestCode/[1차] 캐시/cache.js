// const [cacheSize, cities] = [3, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]];
// const [cacheSize, cities] = [3, ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]];
// const [cacheSize, cities] = [2, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]];
// const [cacheSize, cities] = [5, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]];
const [cacheSize, cities] = [2, ["Jeju", "Pangyo", "NewYork", "newyork"]];
// const [cacheSize, cities] = [0, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]];

function solution(cacheSize, cities) {
    let answer = 0;

    if(cacheSize == 0) {
        return cities.length * 5;
    }

    let cacheArray = [];

    cities.forEach(city => {
        let findResultIndex = cacheArray.findIndex(cacheArray => cacheArray.toLowerCase() == city.toLowerCase());

        if(findResultIndex == -1) { // 캐쉬에 도시가 존재하지 않음
            answer += 5;
            if(cacheArray.length < cacheSize) {
                cacheArray.push(city);
            }else {
                cacheArray.shift();
                cacheArray.push(city);
            }
        } else { // 캐쉬에 도시가 존재함
            answer += 1;
            let used = cacheArray[findResultIndex];

            cacheArray.splice(findResultIndex, 1);
            cacheArray.push(used);
        }
    });

    return answer;
}

console.log(solution(cacheSize, cities));