// const dice = [[1, 2, 3, 4, 5, 6], [3, 3, 3, 3, 4, 4], [1, 3, 3, 4, 4, 4], [1, 1, 4, 4, 5, 5]];
// const dice = [[1, 2, 3, 4, 5, 6], [2, 2, 4, 4, 6, 6]];
const dice = [[40, 41, 42, 43, 44, 45], [43, 43, 42, 42, 41, 41], [1, 1, 80, 80, 80, 80], [70, 70, 1, 1, 70, 70]];

function solution(dice) {
    // dice = dice.map(arr => arr.sort((a,b) => a - b));
    // const selectedDice =[];
    const choice = [];

    // 주사위 선택 배열 경우의 수
    const selectDiceIndexDfs = (diceIndex, result = [], visited = Array.from({ length : dice.length }, () => false)) => {
        visited[diceIndex] = true;
        if(diceIndex !== 0) result.push(diceIndex);
        if(result.length === dice.length / 2) {
            const temp = [...result];
            choice.push(temp);
            result.pop();
            visited[diceIndex] = false;
            return;
        }

        for(let i = 1; i <= dice.length; i ++) {
            if(i <= diceIndex) continue;
            if(visited[i]) continue;
            selectDiceIndexDfs(i, result, visited);
        }
        result.pop();
        visited[diceIndex] = false;
    }
    selectDiceIndexDfs(0);

    // 다이스 그룹의 모든 경우의 수
    const allCase = (arr) => {
        let result = [0];

        const a = (arr1, arr2) => {
            const newArr = [];
            for(let i = 0; i < arr1.length; i ++) {
                for(let j = 0; j < arr2.length; j ++) {
                    newArr.push(arr1[i] + arr2[j]);
                }
            }
            return newArr;
        }

        arr.forEach(diceIndex => {
            result = a(result, dice[diceIndex-1]);
        })

        return result.sort((a, b) => a- b);
    }

    const choiceCase = Array(choice.length).fill(0);

    const binarySearch = (num, array) => {
        let left = 0;
        let right = array.length - 1;

        while(left <= right) {
            let mid = parseInt((left + right) / 2);
            if(array[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }

    for(let i = 0; i < choice.length / 2; i ++) {
        const case1 = allCase(choice[i]);
        const case2 = allCase(choice[choice.length - 1 - i]);
        let case1win = 0;
        let case2win = 0;

        case1.forEach(v1 => {
            case1win += binarySearch(v1, case2)
        })
        case2.forEach(v2 => {
            case2win += binarySearch(v2, case1);
        })

        choiceCase[i] = case1win;
        choiceCase[choice.length - i - 1] = case2win;
    }

    let max = 0;
    let answer = [];
    choiceCase.forEach((v, i) => {
        if(v > max) {
            max = v;
            answer = choice[i];
        }
    })
    return answer;
}

solution(dice);