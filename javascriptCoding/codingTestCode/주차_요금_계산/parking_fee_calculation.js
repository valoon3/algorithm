const [fees, records, result] = [
    [
        180, // 기본 시간(분)
        5000, // 기본 요금
        10, // 단위 시간(분)
        600 // 분위 요금
    ],
    [
        "05:34 5961 IN",
        "06:00 0000 IN",
        "06:34 0000 OUT",
        "07:59 5961 OUT",
        "07:59 0148 IN",
        "18:59 0000 IN",
        "19:09 0148 OUT",
        "22:59 5961 IN",
        "23:00 5961 OUT"
    ], [ // result
        14600,
        34400,
        5000]
]

class Car {
    #parkingIn = '';
    #carNumber = null;
    #status = '';
    #parkingTime = 0;

    constructor(time, carNumber, status) {
        this.#parkingIn = this.timeConverter(time);
        this.#carNumber = carNumber;
        this.#status = status;
    }

    park = (time, status) => {
        if(status == 'IN')
            this.parkIn(time);
        else
            this.parkOut(time);
    }

    parkOut = (time) => {
        this.#status = 'OUT';
        this.#parkingTime += this.timeConverter(time) - this.#parkingIn;
        this.#parkingIn = 0;
    }

    parkIn = (time) => {
        this.#status = 'IN';
        this.#parkingIn = this.timeConverter(time);
    }

    timeConverter = (time) => {
        let [h, m] = time.split(':');
        return parseInt(h)*60 + parseInt(m);
    }

    getParkingTime = () => {
        return this.#status == 'OUT' ? this.#parkingTime : this.#parkingTime + this.timeConverter('23:59') - this.#parkingIn
    }

}

function solution(fees, records) {

    let cars = {};

    records = records.map(data => {
        return data.split(' ')
    })

    records.forEach(info => {
        let [time, carNumber, status] = [info[0], info[1], info[2]];

        if(!cars[carNumber]) { // 처음 입력되는 차
            cars[carNumber] = new Car(time, carNumber, status);
        } else { // 출입 이력이 있는 차
            cars[carNumber].park(time, status);
        }
    })

    // 시간별 금액 정산
    return Object.keys(cars).sort((a,b) => a-b).map((carNumber) => {
        let timeCount = cars[carNumber].getParkingTime();
        let [basicTime, basicFee, addTime, addFee] = fees;

        if(timeCount <= basicTime)
            return basicFee;

        return basicFee + (Math.ceil((timeCount - basicTime) / addTime) * addFee);
    })


    // console.log(records);
}

console.log(solution(fees, records));