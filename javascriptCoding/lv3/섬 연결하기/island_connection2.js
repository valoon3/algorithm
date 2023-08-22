const [n, costs] = [4, [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]]; // result 4
// const [n, costs] = [4, [[1,0,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]];
// const [n, costs] = [7, [ [2,3,7],[3,6,13],[3,5,23],[5,6,25],[0,1,29],[1,5,34],[1,2,35],[4,5,53],[0,4,75] ]];

const solution = function(n, costs) {
    const constructedIsland = new Set();
    costs.sort((a,b) => a[2] - b[2]);
    console.log(costs);

    const constructedBridgeIndex = [0];
    constructedIsland.add(costs[0][0]);
    constructedIsland.add(costs[0][1]);

    while(constructedBridgeIndex.length !== n-1) {
        for(let i = 1; i < costs.length; i ++) {
            const [islandIndex1, islandIndex2, cost] = costs[i];
            if(constructedBridgeIndex.includes(i)) {
                continue;
            } else {
                if(constructedIsland.has(islandIndex1) && constructedIsland.has(islandIndex2)) {
                    continue;
                } else if(constructedIsland.has(islandIndex1) || constructedIsland.has(islandIndex2)) {
                    constructedIsland.add(islandIndex1);
                    constructedIsland.add(islandIndex2);
                    constructedBridgeIndex.push(i);
                    break;
                }
            }
        }
    }

    constructedBridgeIndex.forEach(index => {
        console.log(costs[index]);
    })

    return constructedBridgeIndex.reduce((pre, cur) => pre + costs[cur][2], 0);
}

console.log(solution(n, costs));