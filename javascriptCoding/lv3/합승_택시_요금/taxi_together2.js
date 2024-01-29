const [n,s,a,b,fares] = [6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]];
// 82
// const [n,s,a,b,fares] = [7,3,4,1,[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]];
// 14
// const [n,s,a,b,fares] = [6,4,5,6,[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]];
// 18

// n : 지점의 개수
// s : 출발지점
// a : A의 도착지점
// b : B의 도착지점
// fares : 택시요금

function solution(n, s, a, b, fares) {
    let totalPrice = Infinity;
    const priceMap = Array.from(Array(n+1), () => Array(n+1).fill(Infinity));

    for(const [start, end, price] of fares) {
        priceMap[start][end] = price;
        priceMap[end][start] = price;
    }

    // 본인 경로로 가는 경우 0 으로 초기화
    for(let i = 1; i <= n; i ++) {
        priceMap[i][i] = 0;
    }

    // 플로이드 마샬 알고리즘
    for(let k = 1; k <= n; k++) { // 중간 지점
        for(let i = 1; i <= n; i ++) { // 출발 지점
            for(let j = 1; j <= n; j++) { // 도착 지점
                priceMap[i][j] = Math.min(priceMap[i][j], priceMap[i][k] + priceMap[k][j])
            }
        }
    }

    // // k는 경유노드, i는 시작노드, j는 도착노드
    // for(let k = 0; k < n; k++) {
    //     for(let i = 0; i < n; i++) {
    //         for(let j = 0; j < n; j++) {
    //             if(priceMap[i][k] + priceMap[k][j] < priceMap[i][j])
    //                 priceMap[i][j] = priceMap[i][k] + priceMap[k][j];
    //         }
    //     }
    // }

    // const queue = [s];
    //
    // while(queue.length) {
    //     const startPoint = queue.shift();
    //     const priceArr = priceMap[startPoint];
    //
    //     for(let endPoint = 1; endPoint <= n; endPoint ++) {
    //
    //     }
    // }


    totalPrice = priceMap[s][a] + priceMap[s][b];

    for(let i = 1; i <= n ; i ++) {
        const shortest = priceMap[s][i] + priceMap[i][a] + priceMap[i][b];
        totalPrice = Math.min(totalPrice, shortest);
    }



    // console.log(priceMap);
    return totalPrice;
}

console.log(solution(n, s, a, b, fares));