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
    const tree = new Map();
    tree.set('center', {parent: null, profit: 0});

    enroll.forEach((name) => {
        tree.set(name, {parent: null, profit: 0});
    })

    referral.forEach((name, idx) => {
        if(name === '-') {
            tree.get(enroll[idx]).parent = 'center';
        } else {
            tree.get(enroll[idx]).parent = name;
        }
    })

    seller.forEach((name, idx) => {
        const price = amount[idx] * 100;
        const obj = tree.get(name);
        setProfit(obj, price);
    })

    function setProfit(parentAndProfitObj, price) {
        if(price < 10 || parentAndProfitObj.parent === null) {
            parentAndProfitObj.profit += price;
        } else {
            parentAndProfitObj.profit += price - Math.floor(price / 10);
            setProfit(tree.get(parentAndProfitObj.parent), Math.floor(price / 10));
        }
    }

    return enroll.map((name) =>
        tree.get(name).profit)
}

console.log(solution(enroll, referral, seller, amount));