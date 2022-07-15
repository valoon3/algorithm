const info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"];
const query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"];

function cutter(arr) {
    return arr.map((value) => {
        return value.split(' ');
    })
}


function find(infos, query) {
    let q = [];
    let result = 0;
    for(let i = 0; i <query.length; i = i+2)
        q.push(query[i])

    for(let i = 0; i < query.length; i ++) {
        let a = infos.filter((info, i) => {
            if(info[0] == query[0] || query[0] == '-')
                return
        })
    }
}

console.log(cutter(info));
console.log(cutter(query));


function solution(info, query) {
    var answer = [];

    let applicants = cutter(info);
    let querys = queryCut(query);



    return answer;
}

// const arr = [1,2,3,4,5,6,7,8,9,10];
//
// console.log(arr.filter((value) => {
//     if(value % 2 == 0)
//         return value
// }))