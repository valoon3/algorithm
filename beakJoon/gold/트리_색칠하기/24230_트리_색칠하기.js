var fs = require('fs');
var filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
var input = fs.readFileSync(filePath).toString().trim().split('\n');
function solution(input) {
    var n = +input[0];
    var colors = input[1].split(' ').map(Number);
    var edges = input.slice(2).map(function (t) { return t.split(' ').map(Number); });
    var graph = Array.from({ length: n + 1 }, function () { return []; });
    var visited = Array.from({ length: n + 1 }, function () { return false; });
    for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
        var _a = edges_1[_i], start = _a[0], end = _a[1];
        graph[start].push(end);
        graph[end].push(start);
    }
    var answer = 0;
    var dfs = function (index, color) {
        visited[index] = true;
        if (color !== colors[index - 1]) {
            answer++;
            color = colors[index - 1];
        }
        for (var _i = 0, _a = graph[index]; _i < _a.length; _i++) {
            var next = _a[_i];
            if (visited[next] === true)
                continue;
            dfs(next, color);
        }
    };
    dfs(1, 0);
    // console.log(n)
    // console.log(colors)
    // console.log(edges)
    console.log(answer);
}
solution(input);
