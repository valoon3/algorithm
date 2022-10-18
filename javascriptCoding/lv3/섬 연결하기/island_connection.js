// const [n, costs] = [4, [[1,0,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]];
const [n, costs] = [7, [ [2,3,7],[3,6,13],[3,5,23],[5,6,25],[0,1,29],[1,5,34],[1,2,35],[4,5,53],[0,4,75] ]];

function solution(n, costs) {
    let answer = 0;
    let hasBridgeIsland = [0];

    while(hasBridgeIsland.length !== n) {
        let arr = costs.filter(cost => {
            if(hasBridgeIsland.findIndex(islandNum => islandNum === cost[0]) !== -1 && hasBridgeIsland.findIndex(islandNum => islandNum === cost[1]) === -1) {
                return cost;
            } else if(hasBridgeIsland.findIndex(islandNum => islandNum === cost[0]) === -1 && hasBridgeIsland.findIndex(islandNum => islandNum === cost[1]) !== -1) {
                return cost;
            }
        })

        arr.sort((a,b) => a[2] - b[2]);

        answer += arr[0][2];

        hasBridgeIsland.findIndex(islandNum => islandNum === arr[0][0]) !== -1 ? hasBridgeIsland.push(arr[0][1]) : hasBridgeIsland.push(arr[0][0]);
    }

    return answer;
}

console.log(solution(n, costs));