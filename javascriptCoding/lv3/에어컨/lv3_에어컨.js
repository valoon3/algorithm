const [temperature, t1, t2, a, b, onboard] = [28, 18, 26, 10, 8, [0, 0, 1, 1, 1, 1, 1]];
// result 40
// const [temperature, t1, t2, a, b, onboard] = [-10, -5, 5, 5, 1, [0, 0, 0, 0, 0, 1, 0]];
// result 25
// const [temperature, t1, t2, a, b, onboard] = [11, 8, 10, 10, 1, [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1]];
// result 20
// const [temperature, t1, t2, a, b, onboard] = [11, 8, 10, 10, 100, [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1]];
// result 60

// t1, t2 쾌적 온도
// 시작할때 실외온도 실내 온도는 같다
// 실내온도와 희망온도가 다르다면 1분에 1도씩 상승 또는 하강

// a 희망온도로 변화 비용
// b 유지 비용

// -10 ≤ temperature ≤ 40
// 온도를 기준으로 dp 를 만드는데 -10 을 0 으로 잡자

function solution(temperature, t1, t2, a, b, onboard) {
    temperature += 10;
    t1 += 10;
    t2 += 10;

    // 승객이 타고있는 시간
    const lastPassenger = onboard.lastIndexOf(1);
    let now = 0;

    const minuteCostDp = Array.from({ length : onboard.length + 1 },
        () => Array.from({ length : 55 },
            () => Infinity));
    minuteCostDp[0][temperature] = 0; // 시작하는 온도의 비용을 0으로 초기화

    // 온도 변동시키기
    const onConditioner = (cost, inCarTemperature, moveTemp) => {
        return [cost + a, inCarTemperature + moveTemp];
    }

    // 온도 유지
    const maintainConditioner = (cost, inCarTemperature) => {
        return [cost + b, inCarTemperature];
    }
    // 온도 끄기
    const offConditioner = (cost, inCarTemperature) => {
        if(inCarTemperature === temperature) return [cost, inCarTemperature];
        if(inCarTemperature > temperature) return [cost, inCarTemperature - 1];
        if(inCarTemperature < temperature) return [cost, inCarTemperature + 1];
    }

    for(let nowMinute = 0; nowMinute < onboard.length; nowMinute ++) {
        const isPassenger = onboard[nowMinute];
        for(let inCarTemperature = 0; inCarTemperature < minuteCostDp[nowMinute].length; inCarTemperature ++) {
            const cost = minuteCostDp[nowMinute][inCarTemperature];
            if(cost === Infinity) continue;
            if(isPassenger === 1 && inCarTemperature < t1) {
                minuteCostDp[nowMinute][inCarTemperature] = Infinity;
                continue;
            }
            if(isPassenger === 1 && inCarTemperature > t2) {
                minuteCostDp[nowMinute][inCarTemperature] = Infinity;
                continue;
            }

            let moveTemp = 0;

            if(inCarTemperature === temperature) {
                moveTemp = 0;
            } else if(inCarTemperature > temperature) {
                moveTemp = -1;
            } else moveTemp = 1;

            if(minuteCostDp[nowMinute + 1][inCarTemperature + 1] !== undefined && cost + a < minuteCostDp[nowMinute + 1][inCarTemperature + 1]) {
                minuteCostDp[nowMinute + 1][inCarTemperature + 1] = cost + a;
            }
            if(minuteCostDp[nowMinute + 1][inCarTemperature - 1] !== undefined && cost + a < minuteCostDp[nowMinute + 1][inCarTemperature - 1]) {
                minuteCostDp[nowMinute + 1][inCarTemperature - 1] = cost + a;
            }
            if(minuteCostDp[nowMinute + 1][inCarTemperature] !== undefined && cost + b < minuteCostDp[nowMinute + 1][inCarTemperature]) {
                minuteCostDp[nowMinute + 1][inCarTemperature] = cost + b;
            }
            if(minuteCostDp[nowMinute + 1][inCarTemperature + moveTemp] !== undefined && cost < minuteCostDp[nowMinute + 1][inCarTemperature + moveTemp]) {
                minuteCostDp[nowMinute + 1][inCarTemperature + moveTemp] = cost;
            }

        }
        if(nowMinute === lastPassenger) break;
    }
    // console.log(minuteCostDp);
    return Math.min(...minuteCostDp[lastPassenger])
}

console.log(solution(temperature, t1, t2, a, b, onboard));