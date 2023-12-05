const [enroll, referral, seller, amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"], ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"], ["young", "john", "tod", "emily", "mary"], [12, 4, 2, 5, 10]];
// result [360, 958, 108, 0, 450, 18, 180, 1080]

// const [enroll, referral, seller, amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"], ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"], ["sam", "emily", "jaimie", "edward"], [2, 3, 5, 4]];
// result [0, 110, 378, 180, 270, 450, 0, 0]

function solution (enroll, referral, seller, amount) {
    const tree = { "minho" : [] };
    enroll.forEach(name => tree[name] = []);

    for(const [idx, ref] of referral.entries()) {
        const target = ref === '-' ? "minho" : ref;
        tree[target].push(enroll[idx]);
    }

    const sales = seller.reduce((acc, cur, idx) => {
        const cost = amount[idx] * 100;
        acc[cur] ? acc[cur].push(cost) : acc[cur] = [ cost ];
        return acc;
    }, {});

    console.log(sales);

    const stack = [ ["minho", null] ];
    const visit = { "minho" : false };
    enroll.forEach(name => visit[name] = false);

    while(stack.length) {
        const [cur, parent] = stack.pop();

        if(visit[cur]) {
            if(sales[cur] && cur !== "minho") {
                for(let i = 0; i < sales[cur].length; i++) {
                    const income = sales[cur][i] < 10 ? 0 : sales[cur][i] * 0.1 >> 0;
                    sales[parent] ? sales[parent].push(income) : sales[parent] = [ income ];
                    sales[cur][i] -= income;
                }
            }
            continue;
        }

        stack.push([cur, parent]);
        visit[cur] = true;

        for(const next of tree[cur]) {
            if(!visit[next]) {
                stack.push([next, cur]);
            }
        }
    }

    const answer = enroll.map(name => sales[name] ? sales[name].reduce((a, b) => a+b) : 0);

    return answer;
}

console.log(solution(enroll, referral, seller, amount));