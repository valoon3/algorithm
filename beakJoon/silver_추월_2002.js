const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [inputCar, outputCar] = filter(input);
        solution(inputCar, outputCar);
        process.exit();
    });

function filter(input) {
    const count = Number(input[0]);
    const inputCar = [];
    const outputCar = [];

    for(let i = 1; i <= count; i ++) {
        inputCar.push(input[i]);
    }

    for(let i = count + 1; i < input.length; i ++) {
        outputCar.push(input[i]);
    }

    return [inputCar, outputCar];
}

function solution(inputCar, outputCar) {
    let count = 0;
    const N = inputCar.length;
    const passedCar = new Map();

    inputCar.forEach(car => passedCar.set(car, false));

    // console.log(passedCar);

    while(inputCar.length) {
        const inCar = inputCar[inputCar.length - 1];
        const outCar = outputCar[outputCar.length - 1];

        // console.log('in : ', inputCar);
        // console.log('ot : ', outputCar);
        // console.log(count);


        // 추월해서 나간 차량 제외
        if(passedCar.get(outCar)) {
            outputCar.pop();
            continue;
        }

        if(inCar === outCar) { // 추월하지 않음
            inputCar.pop();
            outputCar.pop();
        } else { // 추월함
            count ++;
            const inCar = inputCar.pop();
            passedCar.set(inCar, true);
        }
    }


    console.log(count);
}