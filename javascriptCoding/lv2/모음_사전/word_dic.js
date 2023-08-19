const words = ['A', 'E', 'I', 'O', 'U']

const solution = (word) => {
    const dictionary = [];

    const dfs = function(maxLength = 5, nowWord = '') {
        if(nowWord.length >= maxLength) return;

        words.forEach((alphabet) => {
            const newWord = nowWord + alphabet;
            dictionary.push(newWord);
            dfs(maxLength, newWord);
        });
    }

    dfs();
    console.log(dictionary);

    return dictionary.findIndex(element => element === word) + 1
}

console.log(solution("I"));