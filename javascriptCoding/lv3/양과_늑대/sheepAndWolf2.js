const [info, edges] = [
    [0,0,1,1,1,0,1,0,1,0,1,1]	,
    [[0,1],[1,2],[1,4],[0,8],[8,7],[9,10],[9,11],[4,3],[6,5],[4,6],[8,9]]
];
// result 5
// const [info, edges] = [[0,1,0,1,1,0,1,0,0,1,0]	, [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,8],[6,9],[9,10]]	];
// result 5

// 0 : 양
// 1 : 늑대

function solution(info, edges) {
    let answer = 0;
    let way = Array.from({ length: info.length }, () => []);

    edges.forEach(([pIndex, cIndex]) => {
        way[pIndex].push(cIndex);
    })

    edges.sort((a,b) => {
        if(a[0] === b[0]) return b[1] - a[1];
        return b[0] - a[0];
    })

    const dfs = (node = 0, sheepCount = 0, wolfCount = 0, possibleNode = []) => {
        info[node] === 0 ? sheepCount++ : wolfCount++;

        if(sheepCount <= wolfCount) return;

        answer = Math.max(answer, sheepCount);

        const newPossibleNode = [...possibleNode];
        let currentIndex = newPossibleNode.indexOf(node);
        newPossibleNode.splice(currentIndex, 1);

        way[node].forEach((nextNode) => newPossibleNode.push(nextNode));

        for(let nextNode of newPossibleNode) {
            dfs(nextNode, sheepCount, wolfCount, newPossibleNode);
        }
    }

    dfs(0, 0, 0, [0]);


    console.log(way);
    console.log(answer);

    return answer;
}

solution(info, edges);