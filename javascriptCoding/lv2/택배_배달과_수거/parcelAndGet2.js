const [cap, n, deliveries, pickups] = [4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]];
// result 16

// const [cap, n, deliveries, pickups] = [2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]];
// result 30

class Delivery {
    distance = 0;
    constructor(deliveries, pickups, cap) {
        this.storage = [];
        this.cap = cap;
        this.lastIndex = [];

        for(let i = 0; i < deliveries.length; i++) {
            if(deliveries[i] !== 0 || pickups[i] !== 0) {
                this.lastIndex.push(i);
            }
            this.storage.push([deliveries[i], pickups[i]]);
        }
    }

    solution() {
        while(this.lastIndex.length > 0) {
            this.distance += this.lastIndex[this.lastIndex.length-1] + 1;
            this.move(this.cap, this.cap);
        }
    }

    move(delCount, pickCount) {
        if(!this.lastIndex.length) return;
        const index = this.lastIndex.pop();
        const house = this.storage[index];

        if(house[0] >= delCount) {
            house[0] -= delCount;
            delCount = 0;
        } else {
            delCount -= house[0];
            house[0] = 0;
        }

        if(house[1] >= pickCount) {
            house[1] -= pickCount;
            pickCount = 0;
        } else {
            pickCount -= house[1];
            house[1] = 0;
        }

        if(delCount !== 0 || pickCount !== 0) {
            this.move(delCount, pickCount);
        }

        if(house[0] !== 0 || house[1] !== 0) {
            this.lastIndex.push(index);
        }
    }



    getDistance() {
        return this.distance * 2;
    }
}

function solution(cap, n, deliveries, pickups) {
    const delivery = new Delivery(deliveries, pickups, cap);
    delivery.solution();
    return delivery.getDistance();
}

console.log(solution(cap, n, deliveries, pickups));