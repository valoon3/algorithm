// const s = "{{2},{2,1},{2,1,3},{2,1,3,4}}";
// const s = "{{1,2,3},{2,1},{1,2,4,3},{2}}";
// const s = "{{123}}";
const s = "{{4,2,3},{3},{2,3,4,1},{2,3}}";

function solution(s) {
    let answer = [];

    let arr = stringFilter(s);
    console.log(arr);

    arr.forEach(array => {
        for(let i = 0; i < array.length; i++) {
            if(answer.find(element => element == array[i]) == undefined) {
                answer.push(Number(array[i]));
                break;
            }
        }
    })





    return answer;

    function stringFilter(s) {
        let arrayS = s.substring(2, s.length-2)
            .split('},{')
            .map(data => data.split(','));

        arrayS.sort((a,b) => {
            return a.length - b.length;
        })

        return arrayS;
    }
}

console.log(solution(s));