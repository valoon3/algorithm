const [w, h] = [8, 12];

function solution(w, h) {
    let getGCD = (num1, num2) => {
        let gcd = 1;

        for(let i=2; i<=Math.min(num1, num2); i++){
            if(num1 % i === 0 && num2 % i === 0){
                gcd = i;
            }
        }

        return gcd;
    }

    const percent = (w, h) => {
        if(w === h) return [1, 1];
        let smallNumber = w < h ? w : h;

        let gcd = getGCD(w, h);

        return [w/gcd, h/gcd];
    }

    const canUseCount = ([w, h]) => {
        if(w === h) return 1;

        else return w + h - 1;
    }

    const p = percent(w, h);
    const [wPercent, hPercent] = p;
    let useCount = canUseCount(p);

    return (w / wPercent * wPercent * hPercent - useCount) * h / hPercent;
}

console.log(solution(w, h));