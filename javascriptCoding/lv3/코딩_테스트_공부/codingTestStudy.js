// const [alp, cop, problems] = [10, 10, [[10,15,2,1,2],[20,20,3,3,4]]];
// const [alp, cop, problems] = [0, 0, [[0,0,2,1,2],[4,5,3,1,2],[4,11,4,0,2],[10,4,0,4,2]]];
const [alp, cop, problems] = [0, 0, [[0, 3, 1, 0, 0], [5, 0, 0, 8, 1], [0, 10, 0, 0, 0]]];

// problems의 원소는 [alp_req, cop_req, alp_rwd, cop_rwd, cost]의 형태로 이루어져 있습니다.

function solution(alp, cop, problems) {
    let answer = Infinity;

    const dp = Array.from({ length : 151 }, () => Array.from({ length : 151 }, () => Infinity));
    dp[alp][cop] = 0;

    let alpMax = 0;
    let copMax = 0;

    // problems.push([0, 0, 0, 1, 1]);
    // problems.push([0, 0, 1, 0, 1]);

    for(const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        alpMax = Math.max(alpMax, alp_req);
        copMax = Math.max(copMax, cop_req);
    }

    const dfs = (alp, cop, cost) => {

        if(alp >= alpMax && cop >= copMax) return;
        // if(alp > alpMax) alp = alpMax;
        // if(cop > copMax) cop = copMax;

        for(const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {

            if(alp >= alp_req && cop >= cop_req) {
                const newAlp = alp + alp_rwd >= alpMax ? alpMax : alp + alp_rwd;
                const newCop = cop + cop_rwd >= copMax ? copMax : cop + cop_rwd;

                if(dp[alp][cop] + cost < dp[newAlp][newCop]) {
                    dp[newAlp][newCop] = dp[alp][cop] + cost;
                    dfs(newAlp, newCop);
                }
            }
        }

        if(alp < alpMax && dp[alp][cop] + 1 < dp[alp+1][cop]) {
            dp[alp+1][cop] = dp[alp][cop] + 1;
            dfs(alp+1, cop);
        }

        if(cop < copMax && dp[alp][cop] + 1 < dp[alp][cop + 1]) {
            dp[alp][cop+1] = dp[alp][cop] + 1;
            dfs(alp, cop+1);
        }
    }

    dfs(alp, cop, 0);
    console.log(dp[alpMax][copMax]);
    return dp[alpMax][copMax];
}

solution(alp, cop, problems);