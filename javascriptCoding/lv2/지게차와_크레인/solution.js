// const [storage, requests] = [
//     ["AZWQY", "CAABX", "BBDDA", "ACACA"],
//     ["A", "BB", "A"]
// ]; // 11

const [storage, requests] = [
    ["HAH", "HBH", "HHH", "HAH", "HBH"],
    ["C", "B", "B", "B", "B", "H"]
]; // 4

function solution(storage, requests) {

    const init = (storage) => {
        const start = new Array(storage[0].length + 2).fill('0');
        const end = new Array(storage[0].length + 2).fill('0');
        let lines = storage.map(s => ['0', ...s.split(''), '0']);
        return [start, ...lines, end];
    }

    const isExist = (x, y) => {
        if (x < 0 || x >= map[0].length) return false;
        if (y < 0 || y >= map.length) return false;
        return true;
    }

    const porkLift = function(map, order) {
        const visitedMap = Array.from({ length: map.length }, () => new Array(map[0].length).fill(false));
        const dfs = (x, y) => {
            if(!isExist(x, y)) return;
            if(map[y][x] !== '0' && map[y][x] !== order) return;
            if(visitedMap[y][x]) return;

            visitedMap[y][x] = true;

            if(map[y][x] === order) {
                map[y][x] = '0';
                return;
            }

            dfs(x - 1, y);
            dfs(x + 1, y);
            dfs(x, y - 1);
            dfs(x, y + 1);
        }

        dfs(0, 0);
    }

    const crane = function(map, order) {
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[0].length; j++) {
                if(map[i][j] === order) {
                    map[i][j] = '0';
                }
            }
        }
    }

    const getCount = (map) => {
        let containerCount = 0;

        for(let i = 1; i < map.length - 1; i++) {
            for(let j = 1; j < map[0].length - 1; j++) {
                if(map[i][j] !== '0') containerCount++;
            }
        }
        return containerCount;
    }

    const map = init(storage);

    requests.forEach(request => {
        if(request.length > 1) {
            crane(map, request[0]);
        } else {
            porkLift(map, request[0]);
        }
    })

    return getCount(map)
}

console.log(solution(storage, requests));