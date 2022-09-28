const [n, computers] = [3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
]
];
// const [n, computers] = [3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]];

function solution(n, computers) {
    let answer = 0;

    computers.forEach((computer, computerIndex) => {
        if(computer.reduce((sum, cur) => sum+cur) >= 1) {
            dfs(computer);
            answer ++;
        }
    })

    function dfs(computer) {
        for(let i = 0; i < n; i ++) {
            if(computer[i] == 1) {
                computer[i] = 0;
                dfs(computers[i]);
            }
        }
    }

    return answer;
}

console.log(solution(n, computers));
console.log(computers);