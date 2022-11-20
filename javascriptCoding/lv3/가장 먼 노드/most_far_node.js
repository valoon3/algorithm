const [n, vertex] = [6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]];
// 최단거리중에서 최장거리 구하는 문제

function solution(n, edge) {
    const graph = Array.from(Array(n + 1), () => [])

    for (const [src, dest] of edge) {
        graph[src].push(dest)
        graph[dest].push(src)
    }

    const distance = Array(n + 1).fill(0)
    distance[1] = 1
    const toBeSearched = [1]
    while (toBeSearched.length > 0) {
        const src = toBeSearched.shift()
        for (const dest of graph[src]) {
            if (distance[dest] === 0) {
                distance[dest] = distance[src] + 1
                toBeSearched.push(dest)
            }
        }
    }
    return distance.filter(x => x === Math.max(...distance))
}


console.log(solution(n, vertex));