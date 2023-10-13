// const [play_time, adv_time, logs] = ["02:03:55", "00:14:15", ["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]];
//result "01:30:59";

// const [play_time, adv_time, logs] = ["99:59:59"	, "25:00:00"	, ["69:59:59-89:59:59", "01:00:00-21:00:00", "79:59:59-99:59:59", "11:00:00-31:00:00"]	];
// result "01:00:00";


const [play_time, adv_time, logs] = ["50:00:00"	, "50:00:00"	, ["15:36:51-38:21:49", "10:14:18-15:36:51", "38:21:49-42:51:45"]	];
// result "00:00:00";

function solution(play_time, adv_time, logs) {
    const timeToSecond = (time) => {
        let result = time.split(":");
        return Number(result[0]) * 60 * 60 + Number(result[1]) * 60 + Number(result[2]);
    }

    const secondToTime = (_second) => {
        let hour = Math.floor(_second / 3600);
        let minute = Math.floor((_second % 3600) / 60);
        let second = Math.floor((_second % 3600) % 60);

        hour = hour < 10 ? `0${hour}` : hour;
        minute = minute < 10 ? `0${minute}` : minute;
        second = second < 10 ? `0${second}` : second;

        return `${hour}:${minute}:${second}`;
    }

    const prefixSum = new Array(timeToSecond(play_time) + 1).fill(0);

    logs.forEach(log => {
        const [start, end] = log.split("-");
        prefixSum[timeToSecond(start)] += 1;
        prefixSum[timeToSecond(end) + 1] -= 1;
    })

    // 누적합 완성
    for(let i = 0; i < prefixSum.length - 1; i ++) {
        prefixSum[i + 1] += prefixSum[i];
    }
    prefixSum.pop();

    let mostWatchingTimeIndex = 0;

    let addTime = timeToSecond(adv_time);

    let topWatchingTime = 0;
    let watchingTime = 0;

    for(let startTime = 0; startTime <= addTime; startTime ++) {
        topWatchingTime += prefixSum[startTime];
    }
    watchingTime = topWatchingTime;

    for(let i = 1; i < prefixSum.length - addTime; i ++) {
        watchingTime = prefixSum[i + addTime] - prefixSum[i - 1] + watchingTime;
        if(watchingTime > topWatchingTime) {
            topWatchingTime = watchingTime;
            mostWatchingTimeIndex = i;
        }
    }

    return secondToTime(mostWatchingTimeIndex);
}

console.log(solution(play_time, adv_time, logs));