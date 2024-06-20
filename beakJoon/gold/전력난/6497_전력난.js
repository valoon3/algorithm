const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function filter(input) {
    const testCase = [];

    while(true) {
        const [m, n] = input.shift().split(' ').map(Number);
        if(m === 0 && n === 0) break;
        const edges = input.splice(0, n).map(t => t.split(' ').map(Number)).sort((a, b) => a[2] - b[2]);
        testCase.push([m, n, edges]);
    }

    return testCase;
}

function solution(testCase) {
    class Union {
        constructor(n) {
            this.nodes = [];
            for(let i = 0; i < n; i ++) {
                this.nodes.push(i);
            }
        }

        findRootOfUnion(index) {
            if(this.nodes[index] === index) return index;
            else {
                const next = this.nodes[index];
                const root = this.findRootOfUnion(next);
                this.nodes[index] = root;
                return root;
            }
        }

        create(index1, index2) {
            const rootOfIndex1 = this.findRootOfUnion(index1);
            const rootOfIndex2 = this.findRootOfUnion(index2);

            if(rootOfIndex1 === rootOfIndex2) return false;
            this.nodes[rootOfIndex2] = rootOfIndex1;

            return true;
        }
    }

    for(const [m, n, edges] of testCase) {
        const union = new Union(m);

        let total = 0;
        let answer = 0;

        edges.forEach(([start, end, cost]) => {
            total += cost;

            if(union.create(start, end)) {
                answer += cost;
            }
        })

        console.log(total - answer);
    }





    // console.log(edges);
    // console.log(total);
    // console.log(answer);

}
const testCase = filter(input);
solution(testCase);