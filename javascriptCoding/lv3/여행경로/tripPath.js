// const tickets = [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]] // return ["ICN", "JFK", "HND", "IAD"]
const tickets = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]] // return ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]

function solution(tickets) {
    let answer = ['ICN'];
    let now = 'ICN';
    let target = '';

    // 티켓 정렬
    tickets.sort((a,b) => {
        if(a[1] > b[1])
            return 1;
        if(a[1] < b[1])
            return -1;
        return 0;
    })

    while(tickets.length != 0) {
        for(let i = 0; i < tickets.length; i ++) {
            if(tickets[i][0] == now) {
                target = tickets[i][1];
                tickets.splice(i,1);
                break;
            }

        }
        answer.push(target);
        now = target;
    }

    return answer;
}

console.log(solution(tickets));

// console.log(tickets);
// let temp = tickets.splice(1,1);
// console.log(tickets);
// console.log(temp);
