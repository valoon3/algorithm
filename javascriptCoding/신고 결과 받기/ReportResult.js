function solution(id_list, report, k) {
    let reports = [...new Set(report)].map(a => {return a.split(' ')});
    let counts = new Map();

    for(const bad of reports){
        counts.set(bad[1], counts.get(bad[1])+1 || 1);
    }
    let result = new Map();
    for(const report of reports){
        if(counts.get(report[1]) >= k){
            result.set(report[0], result.get(report[0])+1 || 1)
        }
    }
    let answer = id_list.map(a => result.get(a) || 0);

    return answer;
}

let result = solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], 2);
console.log(result);

