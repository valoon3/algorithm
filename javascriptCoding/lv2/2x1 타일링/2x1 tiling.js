// 1 1
// 2 2
// 3 3

// 1000000007

function solution(n) {

    let workspace = [1,1];

    // for(let i = 3; i <= n; i ++) {
    //      workspace[i] = (workspace[i-1]%1000000007 + workspace[i-2]%1000000007)%1000000007;
    // }

    for(let i = 2; i <= n; i ++) {
        workspace.push((workspace[i-1] + workspace[i-2])%1000000007);
    }


    return workspace[n]%1000000007;
}
