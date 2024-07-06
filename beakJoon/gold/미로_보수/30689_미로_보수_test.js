"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var process = require("node:process");
var filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
var input = fs.readFileSync(filePath).toString().trim().split('\n');
function solution(input) {
    var _a = input[0].split(' ').map(Number), n = _a[0], m = _a[1];
    var map = input.slice(1, n + 1).map(function (t) { return t.split(''); });
    var costMap = input.slice(n + 1, n + n + 2).map(function (t) { return t.split(' ').map(Number); });
    var mapState = Array.from({ length: n }, function () { return Array.from({ length: m }, function () { return -1; }); });
    var moveAble = function (y, x) { return y >= 0 && x >= 0 && y < n && x < m; };
    var dirs = function (d) {
        if (d === 'L')
            return [0, -1];
        if (d === 'R')
            return [0, 1];
        if (d === 'U')
            return [-1, 0];
        return [1, 0];
    };
    var dfs = function (y, x) {
        mapState[y][x] = 1;
        var _a = dirs(map[y][x]), dy = _a[0], dx = _a[1];
        var _b = [y + dy, x + dx], ny = _b[0], nx = _b[1];
        // 탈출
        if (!moveAble(ny, nx) || mapState[ny][nx] === 3) {
            mapState[y][x] = 3;
            return [3, 0];
        }
        if (mapState[ny][nx] === -1) {
            var _c = dfs(ny, nx), state = _c[0], cost = _c[1];
            if (state === 3) {
                mapState[y][x] = 3;
                return [state, cost];
            }
            if (state === 2) {
                mapState[y][x] = 3;
                return [2, Math.min(cost, costMap[y][x])];
            }
        }
        if (mapState[ny][nx] === 1) {
            mapState[ny][nx] = 2;
            mapState[y][x] = 3;
            return [2, costMap[y][x]];
        }
        // if(mapState[ny][nx] === 3) {
        mapState[y][x] = 3;
        return [3, 0];
        // }
    };
    var answer = 0;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (mapState[i][j] === -1) {
                var _b = dfs(i, j), _ = _b[0], num = _b[1];
                answer += num;
            }
        }
    }
    // console.log(mapState);
    console.log(answer);
}
solution(input);
