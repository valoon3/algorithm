const [n,s,a,b,fares] = [6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]];
// 82
// const [n,s,a,b,fares] = [7,3,4,1,[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]];
// 14
// const [n,s,a,b,fares] = [6,4,5,6,[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]];
// 18


function solution(n, s, a, b, fares) {

    const cheapCost = function(startPoint, endPoint) {
        const map = Array(n+1).fill(Infinity);
        map[startPoint] = 0;
        const q = [startPoint];

        while(q.length !== 0) {
            let thisPoint = q.shift();

            fares.forEach(([p1, p2, cost], index) => {
                if(thisPoint === p1 || thisPoint === p2) {
                    if(p1 === thisPoint) {
                        if(map[p2] >= map[p1]+cost) {
                            map[p2] = map[p1]+cost
                            q.push(p2);
                        }
                    } else {
                        if(map[p1] >= cost + map[p2]) {
                            map[p1] = cost + map[p2];
                            q.push(p1);
                        }
                    }
                }
            });
        }
        return map[endPoint];
    }

    const priceMap = Array(n+1).fill(Infinity);

    for(let i = 1; i <= n; i ++) {
        priceMap[i] = cheapCost(s, i);
    }

    let answer = cheapCost(s, a) + cheapCost(s, b);

    for(let middlePoint = 1; middlePoint <= n; middlePoint++) {
        if(middlePoint === s) continue;
        let newCost = priceMap[middlePoint] + cheapCost(middlePoint, a) + cheapCost(middlePoint, b);
        if (answer > newCost) answer = newCost;
    }

    return answer;
}

console.log(solution(n, s, a, b, fares));