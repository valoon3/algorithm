const [n, bans] = [30, ["d", "e", "bb", "aa", "ae"]] // "ah"
// const [n, bans] = [7388, ["gqk", "kdn", "jxj", "jxi", "fug", "jxg", "ewq", "len", "bhc"]] //"jxk"

function solution(n, bans) {

    const wordsByLength = Array.from({length: 11 + 1}, () => []);
    // let len = 1; // 26

    bans.forEach(ban => {
        wordsByLength[ban.length].push(ban);
    })

    function find(n, len = 1) {
        let count = 26 ** len - wordsByLength[len].length;

        if (count >= n) {
            // 문자열 생성 후 해당하는 순서의 문자열 반환
            let numberArr = wordsByLength[len]
                .sort((a, b) => a.localeCompare(b))
                .map(w => stringToNumber(w));

            for(const num of numberArr) {
                if(num > n) break;
                n++;
            }

            return createString(len, n - 1);
        }

        return find(n - count, len + 1);
    }

    function createString(len, findingIndex) {
        const result = [];

        // *aa ab ac ad *ae af ag ah
        while (findingIndex >= 26) {
            const remain = findingIndex % 26;
            findingIndex = Math.floor(findingIndex / 26);
            result.push(numberToChar(remain));
        }
        result.push(numberToChar(findingIndex));

        while(result.length < len) {
            result.push(numberToChar(0));
        }

        return result.reverse().join("");
    }

    // 0 이면 a , 1이면 b , 2이면 c
    function numberToChar(num) {
        const result = String.fromCharCode(num + 97);
        return result;
    }

    function stringToNumber(str) {
        return str.split("").reduce((acc, cur) => {
            return acc * 26 + (cur.charCodeAt(0) - 97);
        }, 0);
    }

    return find(n);
}

console.log(solution(n, bans));