const scores = [[2, 2], [1, 4], [3, 2], [3, 2], [2, 1]];
const result = 4;

// [[2,2],[1,4],[3,2],[3,2],[2,1]]
// []

function solution(scores) {
    const [wanhoA, wanhoB] = scores[0];

    for ([a, b] of scores) {
        if (wanhoA < a && wanhoB < b) {
            return -1;
        }
    }

    scores.sort((a, b) => {
        if (a[0] !== b[0]) return b[0] - a[0];
        return a[1] - b[1];
    });

    return scores
        .filter(([scoreA, scoreB], b) => {
            if(b === scores.length - 1) {
                return true;
            }

            const [sa, sb] = scores[b + 1];

            if(scoreA < sa && scoreB < sb) {
                return false;
            }
            return true;
        })
        .map(([scoreA, scoreB]) => scoreA + scoreB)
        .sort((a, b) => b - a)
        .findIndex((value, index) => {
            if (value === wanhoA + wanhoB) {
                return true;
            }
        }) + 1;
}

console.log(solution(scores));