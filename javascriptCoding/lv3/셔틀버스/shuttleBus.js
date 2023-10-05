// 셔틀 운행 횟수 n,
// 셔틀 운행 간격 t,
// 한 셔틀에 탈 수 있는 최대 크루 수 m,
// 크루가 대기열에 도착하는 시각을 모은 배열 timetable이 입력으로 주어진다.

// const [n, t, m, timetable] = [1, 1, 5, ["08:00", "08:01", "08:02", "08:03"]]; // result "09:00"
// const [n, t, m, timetable] = [2,10,2, ["09:10", "09:09", "08:00"]	] // result "09:09"
const [n, t, m, timetable] = [2,1,2,["09:00", "09:00", "09:00", "09:00"]	] // result "08:59"
// const [n, t, m, timetable] = [1,1,5,["00:01", "00:01", "00:01", "00:01", "00:01"]	] // result "00:00"
// const [n, t, m, timetable] = [1,1,1,["23:59"]	] // result "09:00"
// const [n, t, m, timetable] = [10,60,45,["23:59","23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59"]	] // result "18:00"


function solution(n, t, m, timetable) {
    let busTimeTable = [['09', '00']];
    let busTimeObject = {};

    while(n !== 1) {
        let [hour, minute] = busTimeTable[busTimeTable.length-1];
        hour = Number(hour);
        minute = Number(minute);


        if(minute + t >= 60) hour ++;
        else minute += t;

        hour = hour.toString();
        minute = minute.toString();

        if(hour.length === 1) hour = '0' + hour;
        if(minute.length === 1) minute = '0' + minute;

        busTimeTable.push([hour, minute]);

        n--;
    }

    timetable = timetable.map(time => {
        let hour = time[0] + time [1];
        let minute = time[3] + time[4];
        return [hour, minute];
    })
    timetable.sort((a, b) => {
        if(a[0] === b[0]) {
            return b[1] - a[1];
        }
        return b[0] - a[0];
    })

    for(let i = 0; i < busTimeTable.length; i ++) { // 버스 시간표
        let busTime = busTimeTable[i].join('');
        let seats = m;

        busTimeObject[busTime] = [];

        while(busTimeObject[busTime].length < m && timetable.length !== 0 && busTime >= timetable[timetable.length-1].join('')) {
            let crew = timetable.pop();
            busTimeObject[busTime].push(crew);
        }
    }

    let answerArray = busTimeObject[busTimeTable[busTimeTable.length-1].join('')];

    if(answerArray.length < m) return busTimeTable[busTimeTable.length-1].join(':');
    else {
        let [hour, minute] = answerArray[answerArray.length - 1];

        if(minute === '00') {
            hour = (hour - 1).toString();
            if(hour.length === 1) hour = '0' + hour;
            minute = '59';
        } else {
            minute = (minute - 1).toString();
            if(minute.length === 1) minute = '0' + minute;
        }
        return hour + ':' + minute;
    }

    // console.log('busTimeTable : ', busTimeTable);
    // console.log('timetable : ', timetable);
    // console.log('busTimeObject : ', busTimeObject);
}

console.log(solution(n, t, m, timetable));