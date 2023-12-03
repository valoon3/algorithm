const [cap, n, deliveries, pickups] = [4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]];
// result 16

// const [cap, n, deliveries, pickups] = [2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]];
// result 30

function solution(cap, n, deliveries, pickups) {
    let instance = 0;
    let homes = [];

    for(let i = 0; i < n; i ++) {
        homes.push([deliveries[i], pickups[i]]);
    }

    while(homes.length > 0) {
        const lastHome = homes[homes.length-1];
        let  [deliveriesCap, pickupsCap] = [cap, cap]

        if(lastHome[0] === 0 && lastHome[1] === 0) {
            homes.pop();
            continue;
        }

        let lastHomeLength = homes.length;

        // deliveries
        for(let i = homes.length - 1; i >= 0; i --) {
            const visitHome = homes[i];

            if(visitHome[0] >= deliveriesCap) {
                visitHome[0] -= deliveriesCap;
                deliveriesCap = 0;
            } else {
                deliveriesCap -= visitHome[0];
                visitHome[0] = 0;
            }

            if(deliveriesCap === 0) break;
        }

        // pickups
        for(let i = homes.length - 1; i >= 0; i --) {
            const visitHome = homes[i];

            if(visitHome[1] >= pickupsCap) {
                visitHome[1] -= pickupsCap;
                pickupsCap = 0;
            } else {
                pickupsCap -= visitHome[1];
                visitHome[1] = 0;
            }

            if(pickupsCap === 0) break;
        }

        instance += lastHomeLength;
    }

    return instance*2;
}

console.log(solution(cap, n, deliveries, pickups));