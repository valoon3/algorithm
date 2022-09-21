

function solution(brown, yellow) {
    let x = 0;
    let y = 1;

    while(true) {
        if (yellow % y == 0) {
            x = yellow / y;
            if (x * 2 + y * 2 + 4 === brown) {
                break;
            }
        }
        y++;
    }

    return [x+2, y+2];
}

console.log(solution(10,2));