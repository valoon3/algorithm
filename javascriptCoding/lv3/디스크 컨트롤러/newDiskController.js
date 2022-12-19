const jobs = [[0, 3], [1, 9], [2, 6]]; // [입력시점, 완료시간]

class Heap {
    constructor() {
        this.storage = [];
    }

    swap = function(index1, index2) {
        [this.storage[index1-1], this.storage[index2-1]] = [this.storage[index2-1], this.storage[index1-1]];
    }

    /**
     * @num : want push number
     * @callback : to be compared        //    example a => a[0];
     * */
    push = function(num, callback) {
        this.storage.push(num);

        // a => a[0]

        let nodeIndex = this.storage.length;

        // 1번 노드가 아니라면 계속 비교한다.
        while(nodeIndex > 1) {
            let parentsIndex = Math.floor((nodeIndex) / 2);
            let [parentsNode, nowNode] = [this.storage[parentsIndex-1], this.storage[nodeIndex-1]];

            if(callback) {
                [parentsNode, nowNode] = [callback(this.storage[parentsIndex-1]), callback(this.storage[nodeIndex-1])];
            } else {
                [parentsNode, nowNode] = [this.storage[parentsIndex-1], this.storage[nodeIndex-1]];
            }

            if(nowNode < parentsNode) {
                this.swap(nodeIndex, parentsIndex);
                nodeIndex = parentsIndex;
            } else {
                return true;
            }
        }
    }

    shift = function() {
        let result = this.storage[0];

        if(this.storage.length == 1) {
            return this.storage.pop();
        }

        this.storage[0] = this.storage.pop();
        let nowNodeIndex = 1;

        while(nowNodeIndex < this.storage.length+1) {
            let [leftNodeIndex, rightNodeIndex] = [nowNodeIndex*2, nowNodeIndex*2+1];

            if(this.storage[rightNodeIndex-1]) { // left, right 둘다 있다.
                let minNodeIndex =
                    this.storage[leftNodeIndex-1] < this.storage[rightNodeIndex-1] ?
                        leftNodeIndex :
                        rightNodeIndex;

                if(this.storage[nowNodeIndex-1] > this.storage[minNodeIndex-1]) {
                    this.swap(nowNodeIndex, minNodeIndex);
                    nowNodeIndex = minNodeIndex;
                } else {
                    break;
                }

            } else if(this.storage[leftNodeIndex-1]) { // left 만 있다.
                if(this.storage[nowNodeIndex-1] > this.storage[leftNodeIndex-1]) {
                    this.swap(nowNodeIndex, leftNodeIndex);
                    nowNodeIndex = leftNodeIndex;
                } else {
                    break;
                }
            } else { // 자식 노드가 없다.
                break;
            }

        }


        return result;
    }

}

function solution(jobs) {
    const count = jobs.length;
    const heap = new Heap();
    jobs.sort((a,b) => a[0] - b[0]);

    let time = 0;
    let total = 0;
    let complete = 0;

    while(jobs.length || heap.storage.length) {
        while(jobs.length) {
            if(jobs[0][0] === time) {
                heap.push(jobs.shift());
            } else break;
        }

        if(heap.storage.length && time >= complete) {
            const task = heap.shift();
            complete = task[1] + time;
            total += complete - task[0];
        }
        time ++;
    }

    return total/count >> 0;
}

// function solution(jobs) {
//     let time = 0;
//     let waiting = 0;
//     let count = jobs.length;
//     let heap = new Heap();
//
//     jobs.sort((a,b) => a[0]-b[0]);
//
//     while(jobs.length || heap.storage.length) {
//         if(jobs[0] && jobs[0][0] <= time) {
//             heap.push(jobs.shift(), a => a[1]);
//             continue;
//         }
//
//         if(heap.storage[0] && heap.storage[0][0] <= time) {
//             let job = heap.shift();
//             time += job[1];
//             waiting += time-job[0];
//             continue;
//         }
//
//         time++;
//     }
//
//     return Math.floor(waiting/count);
// }

console.log(solution(jobs));