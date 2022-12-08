const N = 5;

const solution = function(N) {
    let result = 0;

    for(let hour = 0; hour <= N; hour ++) {
        for (let min = 0; min < 60; min ++) {
            for (let sec = 0; sec < 60; sec ++) {
                let time = hour.toString() + min.toString() + sec.toString();

                if(time.includes('3')) {
                    result ++;
                }
            }
        }
    }

    return result;
}

console.log(solution(N));