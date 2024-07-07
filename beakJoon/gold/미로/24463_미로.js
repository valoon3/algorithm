var fs = require('fs');
var filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
var input = fs.readFileSync(filePath).toString().trim().split('\n');
function solution(input) {
    var _a = input[0].split(' ').map(Number), n = _a[0], m = _a[1];
    var map = input.slice(1).map(function (t) { return t.split('').map(function (v) {
        if (v === '.')
            return '@';
        return v;
    }); });
    var dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    var startOrEnd = function (y, x) { return map[y][x] === '@' && (x === 0 || y === 0 || x === m - 1 || y === n - 1); };
    var moveAble = function (y, x) { return x >= 0 && y >= 0 && y < n && x < m && map[y][x] === '@'; };
    var dfs = function (y, x) {
        map[y][x] = '.';
        var result = false;
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var _a = dirs_1[_i], dy = _a[0], dx = _a[1];
            if (result === true)
                break;
            var _b = [y + dy, x + dx], ny = _b[0], nx = _b[1];
            if (startOrEnd(ny, nx)) {
                map[ny][nx] = '.';
                return result = true;
            }
            else {
                if (!moveAble(ny, nx))
                    continue;
                else
                    result = result || dfs(ny, nx);
            }
        }
        if (!result)
            map[y][x] = '@';
        return result;
    };
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (startOrEnd(i, j))
                dfs(i, j);
        }
    }
    map.map(function (row) { return console.log(row.join('')); });
}
solution(input);
