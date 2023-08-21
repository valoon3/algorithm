// const tickets = [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]] // return ["ICN", "JFK", "HND", "IAD"]
const tickets = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]] // return ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]

function solution(tickets) {
    let answer = ['ICN'];
    let ticketCount = tickets.length;

    tickets.sort((a,b) => {
        if(a[1] > b[1]) return 1;
        return -1;
    });

    console.log(tickets);


    const dfs = function(usedTicketIndex = []) {
        if(answer.length === ticketCount + 1) return true;
        const now = answer[answer.length - 1];

        for(let i = 0; i < ticketCount; i ++) {
            const [startPlace, targetPlace] = tickets[i];

            if(startPlace === now && !usedTicketIndex.includes(i)) {
                answer.push(targetPlace);
                usedTicketIndex.push(i);
                if(dfs(usedTicketIndex)) return true;
            }
        }
        answer.pop();
        usedTicketIndex.pop();
    }

    dfs();


    return answer;
}

console.log(solution(tickets));
