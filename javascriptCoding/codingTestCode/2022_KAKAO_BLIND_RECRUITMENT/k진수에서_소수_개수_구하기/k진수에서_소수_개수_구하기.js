const [n, k] = [437674, 3]; // result 3
// const [n, k] = [110011, 10]; // result 2

const isPrime = (num) => {
    if(num || num == 1)
        return false;

    for(let i = 2; i <= +Math.sqrt(num); i ++) {
        if(num%i === 0) return false;
    }
    return true;
}

function k___(n, k) {
    let answer = 0;

    const str = n.toString(k)
    const regex = /[1-9]*/g;
    const arr = str.match(regex).filter(e => e !== '' && e !== '1');

    answer = arr.length;

    arr.forEach(num => {
        for(let i = 2; i<= Math.sqrt(num); i ++) {
            if (num % i == 0) {
                answer--;
                break;
            }
        }
    })

    return answer;
}

console.log(k___(n,k));