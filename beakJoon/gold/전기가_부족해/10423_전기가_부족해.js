const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    const [n, m, k] = input[0].split(' ').map(Number);
    const targets = input[1].split(' ').map(Number);
    const edges = input.slice(2, m + 2).map(t => t.split(' ').map(Number)).sort((a, b) => a[2] - b[2]);

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

    const union = new Union(n + 1);
    targets.forEach(t => union.create(0, t));

    // n - temp.length

    let totalCost = 0;
    let completeCount = 0;

    for(const [city1, city2, cost] of edges) {
        if(completeCount === n - targets.length) break;
        const result = union.create(city1, city2);
        if(result) {
            completeCount++;
            totalCost += cost;
        }
    }

    // console.log(targets);
    // console.log(completeCount);
    console.log(totalCost);
}

solution(input);