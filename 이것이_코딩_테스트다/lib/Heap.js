

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

// let heap = new Heap();
//
// heap.push([1], a => a[0]);
// heap.push([2], a => a[0]);
// heap.push([5], a => a[0]);
// heap.push([4], a => a[0]);
// heap.push([3], a => a[0]);
//
// console.log(heap.storage);
// console.log(heap.shift());
// console.log(heap.shift());
// console.log(heap.shift());
// console.log(heap.shift());
// console.log(heap.shift());

module.exports = Heap;