const places =
    [
        ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
        ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
        ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
        ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
        ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]
    ];

const fuc = function(arr) {
    for(let y = 0; y <5; y++) {
        for(let x = 0; x < 5; x ++) {
            if(arr[y][x] == 'P'){
                if(0<x && x<4) {
                    if (arr[y][x - 1] == 'P' || arr[y][x + 1] == 'P')
                        return 0
                }
                if(0<y && y<4) {
                    if (arr[y - 1][x] == 'P' || arr[y + 1][x] == 'P')
                        return 0
                }
                if(1<x<3) {
                    if (arr[y][x - 2] == 'P' && arr[y][x - 1] != 'X')
                        return 0
                    if (arr[y][x + 2] == 'P' && arr[y][x + 1] != 'X')
                        return 0
                }
                if(1<y<3) {
                    if (arr[y - 2][x] == 'P' && arr[y - 1][x] != 'X')
                        return 0
                    if (arr[y + 2][x] == 'P' && arr[y + 1][x] != 'X')
                        return 0
                }
                if(0<x<4 && 0<y<4) {
                    if (arr[y - 1][x - 1] == 'P' && arr[y - 1][x] != 'X' && arr[y][x - 1] != 'X')
                        return 0
                    if (arr[y - 1][x + 1] == 'P' && arr[y - 1][x] != 'X' && arr[y][x + 1] != 'X')
                        return 0
                    if (arr[y + 1][x - 1] == 'P' && arr[y + 1][x] != 'X' && arr[y][x - 1] != 'X')
                        return 0
                    if (arr[y + 1][x + 1] == 'P' && arr[y + 1][x] != 'X' && arr[y][x + 1] != 'X')
                        return 0
                }
            }
        }
    }
    return 1;
}

function solution(places) {
    var answer = [];

    places.forEach(value => {
        answer.push(fuc(value));
    })



    return answer;
}

console.log(solution(places));



