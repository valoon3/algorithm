const routes = [[-20,-15], [-14,-5], [-18,-13], [-5,-3]];

const solution = function(routes) {

    routes.sort((a,b) => a[0] - b[0]);
    const result = [];
    result.push(routes[0]);

    routes.forEach(([startRoute, endRoute]) => {

        for(let i = 0; i < result.length; i ++) {
            const [point1, point2] = result[i];

            // 두개 모두 cctv 위치보다 작은 경우
            if(startRoute >= point1 && endRoute <= point2) {
                result[i] = [startRoute, endRoute];
                break;
            }
            // 시작부분만 포함되어 있는 경우
            else if(startRoute >= point1 && startRoute <= point2) {
                result[i] = [startRoute, point2];
                break;
            }
            // 끝 부분만 포함되어 있는 경우
            else if(endRoute >= point1 && endRoute <= point2) {
                result[i] = [point1, endRoute];
                break;
            }

            if(i === result.length - 1) {
                result.push([startRoute, endRoute]);
                break;
            }
        }

    });

    return result.length;
}

console.log(solution(routes));