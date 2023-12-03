const [cap, n, deliveries, pickups] = [4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]];
// result 16

// const [cap, n, deliveries, pickups] = [2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]];
// result 30

function solution(cap, n, deliveries, pickups) {
    let instance = 0;

    while(n > 0) {
        if(deliveries[n-1] === 0 && pickups[n-1] === 0) {
            deliveries.pop();
            pickups.pop();
            n --;
            continue;
        }

        let  [deliveriesCap, pickupsCap] = [cap, cap];

        // deliveries
        for(let i = deliveries.length - 1; i >= 0; i --) {
            if(deliveries[i] !== 0) {
                if(deliveries[i] >= deliveriesCap) {
                    deliveries[i] -= deliveriesCap;
                    deliveriesCap = 0;
                } else {
                    deliveriesCap -= deliveries[i];
                    deliveries[i] = 0;
                }
            }


            if(pickups[i] !== 0) {
                if(pickups[i] >= pickupsCap) {
                    pickups[i] -= pickupsCap;
                    pickupsCap = 0;
                } else {
                    pickupsCap -= pickups[i];
                    pickups[i] = 0;
                }
            }

            if(deliveriesCap === 0 && pickupsCap === 0) break;
        }

        instance += n;
    }

    return instance*2;
}

console.log(solution(cap, n, deliveries, pickups));