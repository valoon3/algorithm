
const dupArr = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"];
const set = new Set(dupArr);
const uniqueArr = [...set].map(a => {
    return a.split(' ');
});

console.log(uniqueArr);