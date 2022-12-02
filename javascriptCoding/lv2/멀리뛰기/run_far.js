// 1 = 1
// 2 11 2 = 2
// 3 111 12 21 3 = 3
// 4 1111 112 121 211 31 13 = 5

function solution(n) {
    let answer = 0;
    let workspace = ['1', '1', '2'];

    answer = working(n);

    function working(x) {
        if (x == 1) {
            return 1;
        } else if (x == 2) {
            return 2;
        } else {
            if(workspace[x]) {
                return workspace[x];
            }
            workspace[x] = (working(x - 1) + working(x - 2)) % 1234567;
            return workspace[x];
        }
    }


    return answer;
}

console.log(solution(10));
