// const words = ["go", "gone", "guild"];
// const words = ["abc","def","ghi","jklm"];
const words = ["word","war","warrior","world"];

function solution(words) {
    const dict = new Map();
    let answer = 0;

    words.forEach(word => {
        let current = dict;
        for(let i = 0; i < word.length; i ++) {
            const key = word[i];
            if(!current.has(key)) {
                current.set(key, [0, new Map()]);
            }
            current.get(key)[0] ++;
            current = current.get(key)[1];
        }
    })

    const keys = dict.keys();

    function search(dict) {
        const keys = dict.keys();
        for(let key of keys) {
            const [count, nextDic] = dict.get(key);
            answer += count;
            if(count > 1) search(nextDic);
        }
    }
    search(dict);

    console.log(answer);
}

solution(words);