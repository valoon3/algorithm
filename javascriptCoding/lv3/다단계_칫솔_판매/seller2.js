const [enroll, referral, seller, amount] = [
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10]
];
// result [360, 958, 108, 0, 450, 18, 180, 1080]

// const [enroll, referral, seller, amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"], ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"], ["sam", "emily", "jaimie", "edward"], [2, 3, 5, 4]];
// result [0, 110, 378, 180, 270, 450, 0, 0]

function solution (enroll, referral, seller, amount) {
    const tree = { 'minho' : [] };
    enroll.forEach(name => tree[name] = []);

    referral.forEach((ref, index) => {
        const parent = ref === '-' ? 'minho' : ref;
        tree[parent].push(enroll[index]);
    })

    const salesObject = seller.reduce((object, name, index) => {
        const cost = amount[index] * 100;
        object[name] ? object[name].push(cost) : object[name] = [cost];
        return object;
    }, {})

    const stack = [];
    stack.push(['minho', null]); // [ string, string ]
    const visit = { 'minho' : false };
    enroll.forEach(name => visit[name] = false);

    while(stack.length !== 0) {
        const [name, parent] = stack.pop();

        if(visit[name]) {
            if(salesObject[name] && name !== 'minho') {
                for(let i = 0; i < salesObject[name].length; i ++) {
                    const income = salesObject[name][i] < 10 ? 0 : salesObject[name] * 0.1 >> 0;
                    salesObject[parent] ? salesObject[parent].push(income) : salesObject[parent] = [income];
                    salesObject[name][i] -= income;
                }
            }

            continue;
        }

        stack.push([name, parent]);
        visit[name] = true;

        for(const next of tree[name]) {
            if(!visit[next]) stack.push([next, name]);
        }
    }

    return enroll.map(name => salesObject[name] ? salesObject[name].reduce((a, b) => a + b) : 0);
}

console.log(solution(enroll, referral, seller, amount));