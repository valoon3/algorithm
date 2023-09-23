// const [orders, course] = [["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4]];
// ["AC", "ACDE", "BCFG", "CDE"]

// const [orders, course] = [["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2,3,5]];
// ["ACD", "AD", "ADE", "CD", "XYZ"]

const [orders, course] = [["XYZ", "XWY", "WXA"], [2,3,4]];
// ["WX", "XY"]

const solution = function(orders, course) {
    let answer = new Object();
    let result = {};

    orders.forEach((order, index) => {
        const word = [];
        for(let i = 0; i < order.length; i ++) {
            word.push(order[i]);
        }

        orders[index] = word.sort();
    })

    function makeList(order, length) {
        const menus = [];

        const dfs = function(start, menu = '') {
            if(menu.length === length) menus.push(menu);
            else {
                for (let i = start; i < order.length; i++) {
                    let _menu = menu + order[i];
                    if (i + 1 <= order.length) dfs(i + 1, _menu);
                }
            }
        }

        dfs(0);
        return menus;
    }

    orders.forEach(order => {
        course.forEach(length => {
            makeList(order, length).forEach(menu => {
                if(answer[menu]) answer[menu] ++;
                else answer[menu] = 1;
            });
        })
    })

    course.forEach(length => {
        result[length] = { max: 0, result: []}
    })

    Object.keys(answer).forEach(key => {
        if(answer[key] > result[key.length].max && answer[key] > 1) {
            result[key.length].max = answer[key];
            result[key.length].result = [key];
        } else if(answer[key] === result[key.length].max) {
            result[key.length].result.push(key);
        }
    })

    // console.log(result);
    let real = [];

    Object.keys(result).forEach(key => {
        // console.log(result[key].result)
        result[key].result.forEach(menu => real.push(menu));
    })

    return real.sort();
}

console.log(solution(orders, course));