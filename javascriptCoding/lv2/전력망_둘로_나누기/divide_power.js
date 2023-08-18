const [wires, n] = [[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]], 9]; // 3
// const [wires, n] = [[[1,2],[2,3],[3,4]], 4]; // 0
// const [wires, n] = [[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]], 7]; // 1

function solution(n, wires) {
    let answer = 100;

    const bfs = (startIndex, visited=[], count) => {
        visited.push(startIndex);
        count[0] = count[0] + 1;

        wires.forEach(([x, y]) => {
            if(x === startIndex && !visited.includes(y)) {
                bfs(y, visited, count);
            } else if (y === startIndex && !visited.includes(x)) {
                bfs(x, visited, count);
            }
        });

    }

    wires.forEach(([x, y]) => {
        let numA = [0];
        bfs(x, [y], numA);
        let numB = [0];
        bfs(y, [x], numB);
        let count = Math.abs(numA[0] - numB[0]);

        if(count < answer) answer = count;
    })

    console.log(answer);

    return answer;
}

solution(n, wires);