const dungeons = [[80,20],[50,40],[30,10]];
const k = 80;

const solution = function(k, dungeons) {
    let result = 0;
    const dfs = (k, startIndex, count = 0, visited) => {
        if(visited === undefined) visited = new Array(dungeons.length).fill(false);
        const newVisited = [...visited];

        if(newVisited[startIndex] === false && dungeons[startIndex][0] <= k) {
            k -= dungeons[startIndex][1];
            count ++;
        }
        newVisited[startIndex] = true;

        for(let i = 0; i < dungeons.length; i++) {
            if(newVisited[i] === false) {
                dfs(k, i, count, newVisited);
            }
        }
        if(count > result) result = count;
    }

    for(let i = 0; i < dungeons.length; i ++) {
        dfs(k, i);
    }

    console.log(result);

    return result;
}

solution(k, dungeons);