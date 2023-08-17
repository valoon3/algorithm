const sizes = [[60, 50], [30, 70], [60, 30], [80, 40]]; // result 4000
// const sizes = [[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]] // result 120
// const sizes = [[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]]	 // 133

const solution = function(sizes) {
    let maxWidth = 0;
    let maxHeight = 0;

    sizes.forEach(size => {
        const [big, small] = size[0] >= size[1] ? [size[0], size[1]] : [size[1], size[0]];

        if(big > maxWidth) maxWidth = big;
        if(small > maxHeight) maxHeight = small;
    })

    return maxWidth * maxHeight;
}

console.log(solution(sizes));