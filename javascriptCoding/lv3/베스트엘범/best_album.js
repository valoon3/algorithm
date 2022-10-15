const [genres, plays] = [["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]];

function solution(genres, plays) {
    let answer = [];

    // let obj = {};
    let arr = [];

    function makeFormat(genre, play, playIndex) {

        function findIndex(genre) {
            return arr.findIndex(obj => obj.genre === genre);
        }

        let index = findIndex(genre);

        if(index == -1) {
            arr.push({
                genre,
                allCount: play,
                countArr : [{play, playIndex}],
            })
            return ;
        }

        let obj = {...arr[index]};

        obj.allCount += play;
        obj.countArr.push({play, playIndex});

        arr[index] = obj;
    }

    for(let i = 0; i < genres.length; i ++) {
        makeFormat(genres[i], plays[i], i);
    }

    arr.sort((a,b) => b.allCount - a.allCount);
    arr.forEach(obj => {
        obj.countArr.sort((a, b) => b.play - a.play);

        answer.push(obj.countArr[0].playIndex);

        if(obj.countArr[1]) {
            answer.push(obj.countArr[1].playIndex);
        }
    })



    return answer;
}

console.log(solution(genres, plays));