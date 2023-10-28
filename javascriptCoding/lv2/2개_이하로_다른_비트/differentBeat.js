const numbers = [2, 7];

function solution(numbers) {

    const result = numbers.map(number => {
        if(number === 0) return 1;
        if(number === 1) return 2;
        if(number === 2) return 3;
        if(number === 3) return 5;

        let nNumber = number;
        let oBinary = ('0' + number.toString(2)).split('');

        if(oBinary[oBinary.length - 1] === '0') return number + 1;

        for(let i = oBinary.length - 1; i >= 0; i --) {
            const first = oBinary[i - 1];
            const second = oBinary[i];

            if(first === '0' && second === '1') {
                oBinary[i - 1] = '1';
                oBinary[i] = '0';
                break;
            }
        }

        return parseInt(oBinary.join(''), 2);
    })

    return result;
}

console.log(solution(numbers));