function solution(n, words) {
    let answer = [];
    let failIndex = 1;
    let cantWords = [];

    for(let i = 0; i < words.length; i ++) {
        if(cantWords.find(word => word == words[i])) {
            failIndex = i + 1;
            return converter(n, failIndex);
        }
        else if(i+1 >= words.length)
            return [0,0];
        else if(words[i][words[i].length-1] == words[i+1][0]) {
            cantWords.push(words[i]);

        } else {
            failIndex = i+2;
            return converter(n, failIndex);
        }
    }

    return answer;
}

function converter(n, failIndex) {
    let temp = failIndex % n;
    if(temp == 0)
        return [n, failIndex/n];
    else
        return [temp, parseInt(failIndex/n) + 1];
}

// 테스트 코드
// n = 3;
// const words = ["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"];
// n = 5;
// const words = ["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"];
// n = 2;
// const words = ["hello", "one", "even", "never", "now", "world", "draw"];
// console.log(solution(n, words));
