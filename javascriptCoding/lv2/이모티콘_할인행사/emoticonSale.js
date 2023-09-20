// const [users, emoticons] = [[[40, 10000], [25, 10000]], [7000, 9000]] // result [1, 5400];
const [users, emoticons] = [[[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]], [1300, 1500, 1600, 4900]] // result [4, 13860];

// 가장많은 가입자를 확보하는 방법

function solution(users, emoticons) {
    const resultArr = []; // [[가입자, 비용 총 합], [가입자, 비용 총 합]]
    const emoticons_cost = Array.from({ length : 4 }, () => []); // [10%, 20%, 30%, 40%]

    // 모든 퍼센트 배열 경우의 수
    const makePercentArr = function(totalPrice = 0, level = 0) {
        const result = [];

        const dfs = (percentArr = []) => {
            if(percentArr.length === emoticons.length) return result.push(percentArr);

            [10, 20, 30, 40].forEach((percent) => {
                const _percentArr = [...percentArr];
                _percentArr.push(percent);
                dfs(_percentArr);
            });
        }

        dfs();
        return result;
    }

    makePercentArr().forEach((percentArr) => {
        const result = [0, 0];

        users.forEach(([userPercent, userMoney]) => {
            let usedMoney = 0;

            for(let i = 0; i < percentArr.length; i ++) {
                if(userPercent <= percentArr[i]) {
                    usedMoney += emoticons[i] / 100 * (100-percentArr[i]);
                }
            }

            if(usedMoney >= userMoney) {
                result[0] ++;
            } else {
                result[1] += usedMoney;
            }
        })

        resultArr.push(result);
    })

    resultArr.sort((a,b) => {
        if(a[0] > b[0]) {
            return -1
        } else if(b[0] > a[0]) {
            return 1
        } else {
            return b[1] - a[1];
        }
    })

    console.log(resultArr);

    return resultArr[0];
}

console.log(solution(users, emoticons));