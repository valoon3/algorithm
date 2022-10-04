let operations1 = ["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"];
let operations2 = ["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"];

function solution(operations) {
    let queue = [];

    operations.forEach((data) => {
        const order = data.split(' ');

        if(order[0] === 'I') {
            queue.push(parseInt(order[1]));
            queue.sort((a,b) => a - b);
        }
        else if(order[0] === 'D') {
            order[1] === '1' ? queue.pop() : queue.shift();
        }
    })

    if(queue.length == 0)
        return [0,0];

    return [queue.pop(), queue.shift()];
}

console.log(solution(operations2));
