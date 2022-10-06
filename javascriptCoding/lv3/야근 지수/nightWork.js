const [n, works] = [4, [4, 3, 3]];
// const [n, works] = [1, [2, 1, 2]];
// const [n, works] = [3, [1,1]];

function solution(n, works) {
    works.sort((a, b) => b - a);

    while(n !== 0 ) {
        let max = works[0];

        for(let i = 0; i < works.length; i ++) {
            if(works[i] == max) {
                works[i] --;
                n --;
            }
            if(!n) {
                break;
            }
        }
    }

    if(works[0] < 0) return 0;

    return works.reduce((sum, cur) => sum + cur**2, 0);
}

solution(n, works);
