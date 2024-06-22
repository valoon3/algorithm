const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
    class directory {
        constructor(n) {
            this.map = new Map();
            this.relation = Array.from({ length : n }, () => [[], []]);
            this.index = 0;
            this.visited = Array.from({ length : n }, () => false);
        }

        makeRelation(parent, child) {
            if(!this.map.has(parent)) {
                this.map.set(parent, this.index);
                this.index ++;
            }
            if(!this.map.has(child)) {
                this.map.set(child, this.index);
                this.index ++;
            }

            const pIndex = this.map.get(parent);
            const cIndex = this.map.get(child);

            this.relation[pIndex][1].push(cIndex);
            this.relation[cIndex][0].push(pIndex);
        }

        findOld(name1Index, name2Index) {
            if(name1Index === name2Index) return true;
            this.visited[name1Index] = true;

            let flag = false;

            const [old, young] = this.relation[name1Index];

            for(const oldNameIndex of old) {
                if(flag === false && !this.visited[oldNameIndex]) flag = this.findOld(oldNameIndex, name2Index);
            }

            this.visited[name1Index] = false;

            return flag;
        }

        findYoung(name1Index, name2Index) {
            if(name1Index === name2Index) return true;
            this.visited[name1Index] = true;

            let flag = false;

            const [old, young] = this.relation[name1Index];

            for(const youngIndex of young) {
                if(flag === false && !this.visited[youngIndex]) flag = this.findYoung(youngIndex, name2Index);
            }

            this.visited[name1Index] = false;

            return flag;
        }

        find(name1, name2) {
            const index1 = this.map.get(name1);
            const index2 = this.map.get(name2);
            if(this.findYoung(index1, index2)) return name1;
            if(this.findOld(index1, index2)) return name2;
            else return 'gg';
        }
    }

    const [n, m] = input[0].split(' ').map(Number);
    const edges = input.slice(1, 1 + m).map(t => t.split(' '));
    const queryCount = +input[m + 1];
    const queries = input.slice(m+2, m + 2 + queryCount).map(t => t.split(' '));

    const direction = new directory(n);
    // direction.relation('1', '2');

    edges.forEach(([p, c]) => {
        direction.makeRelation(p, c);
    })
    // console.log(direction);

    queries.forEach(([a, b]) => {
        console.log(direction.find(a, b));
    })

}

solution(input);