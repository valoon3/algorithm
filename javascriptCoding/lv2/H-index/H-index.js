const citations = [3, 0, 6, 1, 5];

function solution(citations) {
    // let answer = 0;
    // let h = 0
    // let length = 0
    // while(length >= h){
    //     h++
    //     length = citations.filter(citation => citation>=h).length
    // }
    // answer = h - 1
    // return answer;


    let answer = 0;
    let h = citations.length; // 인용 횟수
    citations.sort((a,b) => b - a);

    while(h <= citations.length) {
        let fail = 0;

        for(let i = 0; i < h; i ++) {
            if(citations[i] < h) {
                fail ++;
                break;
            }
        }
        for(let i = h; i < citations.length; i ++) {
            if(citations[i] > h) {
                fail ++;
                break;
            }
        }

        if(fail != 0){
            h--;
            continue;
        }

        answer = h;
        break;
    }

    return answer;
}

console.log(solution(citations));