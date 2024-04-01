const [cap, n, deliveries, pickups] = [4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]];
// result 16

// const [cap, n, deliveries, pickups] = [2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]];
// result 30

function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    let deliveriesIndex = n - 1;
    let pickupsIndex = n - 1;

    while(deliveriesIndex >= 0 || pickupsIndex >= 0) {
        let deliver_cap = 0;
        let pickup_cap = 0;

        while(deliveries[deliveriesIndex] == 0) {
            deliveriesIndex--;
        }

        while(pickups[pickupsIndex] == 0) {
            pickupsIndex--;
        }

        answer += (Math.max(deliveriesIndex, pickupsIndex) + 1) * 2;

        // do best to delivery
        for(let i = deliveriesIndex; i >= 0; i--) {
            if(deliver_cap + deliveries[i] <= cap) {
                deliver_cap += deliveries[i];
                deliveries[i] = 0;
                deliveriesIndex--;
            } else {
                deliveries[i] = deliver_cap + deliveries[i] - cap;
                deliveriesIndex = i;
                break;
            }
        }

        // do best to pickup
        for(let i = pickupsIndex; i >= 0; i--) {
            if(pickup_cap + pickups[i] <= cap) {
                pickup_cap += pickups[i];
                pickups[i] = 0;
                pickupsIndex--;
            } else {
                pickups[i] = pickup_cap + pickups[i] - cap;
                pickupsIndex = i;
                break;
            }
        }
    }

    return answer;
}
console.log(solution(cap, n, deliveries, pickups));