const changeTimeToSeconds = (time) => {
    let totalTime = 0;
    let times = time.split(":");
    totalTime += Number(times[0]) * 3600;
    totalTime += Number(times[1]) * 60;
    totalTime += Number(times[2]);

    return totalTime;
};

const changeSecondsToTime = (time) => {
    let totalTime = time;
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime - hours * 3600) / 60);
    let seconds = (totalTime - hours * 3600) % 60;

    hours = hours > 9 ? hours : "0" + hours;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    seconds = seconds > 9 ? seconds : "0" + seconds;

    return `${hours}:${minutes}:${seconds}`;
};

function solution(play_time, adv_time, logs) {
    const playTime = changeTimeToSeconds(play_time); // 초단위로 변환
    const advTime = changeTimeToSeconds(adv_time); // 초단위로 변환
    const times = Array(playTime).fill(0);

    logs.forEach((log) => {
        const [start, end] = log.split("-");
        const startSeconds = changeTimeToSeconds(start); // 초단위로 변환
        const endSeconds = changeTimeToSeconds(end); // 초단위로 변환
        times[startSeconds]++;
        times[endSeconds]--;
    });

    for (let i = 1; i <= playTime; i++) {
        times[i] += times[i - 1];
    }

    for (let i = 1; i <= playTime; i++) {
        times[i] += times[i - 1];
    }

    let total = times[advTime - 1];
    let index = 0;

    for (let i = advTime - 1; i < playTime; i++) {
        // 누적합을 활용하여 최대의 구간을 찾는다
        if (total < times[i] - times[i - advTime]) {
            // 해당 누적합이 더 클경우
            total = times[i] - times[i - advTime]; // 해당 값을 저장
            index = i - advTime + 1; // 해당 값을 저장
        }
    }

    return changeSecondsToTime(index); // 시간단위로 변환
}