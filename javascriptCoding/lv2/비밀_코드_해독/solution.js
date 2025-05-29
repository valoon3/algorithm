const [n1, q1, ans1] = [
    10,
    [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [3, 7, 8, 9, 10], [2, 5, 7, 9, 10], [3, 4, 5, 6, 7]],
    [2, 3, 4, 3, 3]
];

const [n2, q2, ans2] = [
    15,
    [[2, 3, 9, 12, 13], [1, 4, 6, 7, 9], [1, 2, 8, 10, 12], [6, 7, 11, 13, 15], [1, 4, 10, 11, 14]],
    [2, 1, 3, 0, 1]
];

function solution(n, q, ans) {
    let answer = 0;

    const makeAllList = (arr) => {
        const result = [];

        const backtrack = (start, selected) => {
            if (selected.length === 5) {
                result.push([...selected]);
                return;
            }

            for (let i = start; i < arr.length; i++) {
                selected.push(arr[i]);
                backtrack(i + 1, selected);
                selected.pop();
            }
        };

        backtrack(0, []);

        return result;
    }

    const getCompareCount = (list1, list2) => {
        let count = 0;
        for (let i = 0; i < list1.length; i++) {
            if (list2.includes(list1[i])) {
                count++;
            }
        }
        return count;
    }

    const nums = Array.from({ length: n }, (_, i) => i + 1);
    const allList = makeAllList(nums);

    allList.forEach(list => {
        for(let i = 0; i < q.length; i++) {
            if (getCompareCount(list, q[i]) !== ans[i]) {
                return;
            }

            if (i === q.length - 1) {
                answer++;
            }
        }
    })

    return answer;
}

console.log(solution(n1, q1, ans1) === 3);
console.log(solution(n2, q2, ans2) === 5);