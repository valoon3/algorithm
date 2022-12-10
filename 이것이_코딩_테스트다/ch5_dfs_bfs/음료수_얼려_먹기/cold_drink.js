// 1은 얼음

const ice = [ // return 3
    [0,0,1,1,0],
    [0,0,0,1,1],
    [1,1,1,1,1],
    [0,0,0,0,0]
];

function solution(ice) {

    let answer = 0;
    const dfs = function(x,y) {
        if(x < 0 || x >= ice[0].length || y < 0 || y >= ice.length) {
            return false;
        }

        if(ice[y][x] == 0) {
            ice[y][x] = 1; // 노드 방문 처리

            dfs(x, y-1);
            dfs(x, y+1);
            dfs(x+1, y);
            dfs(x-1, y);

            return true;
        }
        return false;
    }

    for(let y = 0; y < ice.length; y ++) {
        for(let x = 0; x < ice[0].length; x ++) {
            if(dfs(x,y) == true) {
                answer ++;
            }
        }
    }


    return answer;
}

console.log(solution(ice));