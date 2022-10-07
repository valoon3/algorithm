function solution(routes) {
    let answer = 0;
    let routesArray = [];

    routesArray.push(routes.shift());

    while(routes.length !== 0) {
        let originRoute = routes.shift();

        for(let i = 0; i < routesArray.length; i ++) {
            // 겹치는 부분이 있으면
            if(routesArray[i][0] <= originRoute[0] <= routesArray[i][1] || routesArray[i][0] <= originRoute[1] <= routesArray[i][1]) {

            }
            // 겹치는 부분이 더 크면
            else if(originRoute[0] <= routesArray[i][0] && originRoute[1] >= routesArray[i][1]) {
                break;
            }

            // 탐색을 다했는데 겹치는 경우가 하나도 없는경우
            if(i == routesArray.length-1) {
                routesArray.push(originRoute);
            }
        }

    }

    return answer;
}
