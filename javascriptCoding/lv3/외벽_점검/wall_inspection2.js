const [n, weak, dist] =
    [12, [1, 5, 6, 10], [1, 2, 3, 4]];
// result 2

// const [n, weak, dist] = [12, [1, 3, 4, 9, 10]	, [3, 5, 7]	];
// result 1

function solution(n, weak, dist) {
    let count = 10;
    // let walls = new Array(n).fill(0);
    // weak.forEach(w => walls[w] = 1);

    const overNumber = (num) => num >= n ? num - n : num;

    const fixFunction = (startPoint, _dist, _weak, count = 0) => {
        if(_dist.length === 0) return -1;

        const dist = [..._dist];
        const d = dist.pop();
        count ++;

        let weak = _weak.filter(w =>
            !(
                w >= startPoint ||
                w <= overNumber(startPoint + d)
            )
        );

        if(weak.length === 0) return count;

        for(const newStartPoint of weak) {
            const result = fixFunction(newStartPoint, dist, weak, count);
            if(result !== -1) return result;
        }
    }

    for(const startPoint of weak) {
        const result = fixFunction(startPoint, dist, weak);
        if(result !== -1) count = Math.min(count, result);
    }




    return count === 10 ? -1 : count;
}

console.log(solution(n, weak, dist));
