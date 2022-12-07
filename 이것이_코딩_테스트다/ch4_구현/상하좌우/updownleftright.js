const size = 5;
const move = ['R','R','R','U','D','D'];

const solution = function(size, move) {

    let position = [1,1];

    move.forEach((direction) => {

        if(direction == 'L' && position[1] - 1 > 0) {
            position[1] --;
        } else if(direction == 'U' && position[0] - 1 > 0) {
            position[0] --;
        } else if(direction == 'R' && position[1] + 1 <= size) {
            position[1] ++;
        } else if(direction == 'D' && position[0] + 1 <= size) {
            position[0] ++;
        }

    })

    return position;
}

console.log(solution(size, move));