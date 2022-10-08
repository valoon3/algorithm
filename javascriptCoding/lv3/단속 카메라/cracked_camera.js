const routes = [[-20,-15], [-14,-5], [-18,-13], [-5,-3]];

function solution(routes) {
    let answer = 1;
    routes.sort((a,b) => a[0] - b[0]);
    console.log(routes);

    let end = routes[0][1];

    routes.forEach(route => {
        let [s, e] = route;

        if(s <= end) {
            if(e < end) {
                end = e;
            }
        } else {
            end = e;
            answer ++;
        }
    })

    return answer;
}

console.log(solution(routes));