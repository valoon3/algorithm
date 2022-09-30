const [begin, target, words] = ['hit', 'cog', ["hot", "dot", "dog", "lot", "log", "cog"]];
// const [begin, target, words] = ['hit', 'cog', ["hot", "dot", "dog", "lot", "log"]];

function solution(begin, target, words) {
    let answer = 0;
    let queue = [{nowWord: begin, words, level : 1}];

    if(!words.includes(target))
        return 0;

    while(queue.length != 0) {
        let {nowWord, words, level} = queue.shift();
        words.forEach(word => { if(wordCheck(nowWord, word)) {
            if(word == target)
                return answer = level;
            let newWords = words.filter(data => {
                if(data == word)
                    return false;
                return data;
            })
            queue.push({nowWord: word, words: newWords, level: level+1});
        }})
        if(answer != 0)
            break;
    }

    return answer;
}



function wordCheck(nowWord, newWord) {
    let different = 0;

    for(let i = 0; i < nowWord.length; i ++) {
        if(nowWord[i] != newWord[i]) {
            different ++;
        }
        if(different > 1)
            return false
    }

    return true;
}

console.log(solution(begin, target, words));