const lines = [
    "2016-09-15 01:00:04.002 2.0s",
    "2016-09-15 01:00:07.000 2s"
]; // result 2

// const lines = [
//     "2016-09-15 20:59:57.421 0.351s",
//     "2016-09-15 20:59:58.233 1.181s",
//     "2016-09-15 20:59:58.299 0.8s",
//     "2016-09-15 20:59:58.688 1.041s",
//     "2016-09-15 20:59:59.591 1.412s",
//     "2016-09-15 21:00:00.464 1.466s",
//     "2016-09-15 21:00:00.741 1.581s",
//     "2016-09-15 21:00:00.748 2.31s",
//     "2016-09-15 21:00:00.966 0.381s",
//     "2016-09-15 21:00:02.066 2.62s"
// ]; // result 7

function solution(lines) {
    let answer = 0;
    const startTimeLine = [];
    const endTimeLine = [];
    const timeLine = [];

    lines.forEach(line => {
        const [y, s, t] = line.split(' ');

        const date = new Date(y + ' ' + s);
        const startDate = new Date(date);
        const endDate = new Date(date);
        startDate.setMilliseconds(date.getMilliseconds() - t.slice(0, -1) * 1000 + 0.001);
        endDate.setMilliseconds(date.getMilliseconds() + 1000);
        timeLine.push(['start', startDate]);
        timeLine.push(['end', endDate]);
    })
    timeLine.sort((a, b) => {
        if(a[1] === b[1]) {
            return a[0] === 'start' ? -1 : 1;
        }
        return a[1] - b[1]
    });

    let count = 0;
    for (let i = 0; i < timeLine.length; i++) {
        if (timeLine[i][0] === "start") {
            count++; // start가 나오면 count를 증가
        } else {
            count--; // end가 나오면 감소
        }
        answer = Math.max(answer, count); // 매 시간마다 answer과 비교해 count의 최대값을 구한다
    }
    return answer;
}

solution(lines);