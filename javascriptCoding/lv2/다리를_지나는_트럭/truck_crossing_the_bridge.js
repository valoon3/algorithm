

function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    let onBridge = [];
    for(let i = 0; i < bridge_length; i ++) {
        onBridge[i] = 0;
    }
    let sum = 0;
    let truck = truck_weights.shift();;
    sum += truck;
    onBridge.shift();
    onBridge.push(truck);
    answer ++;

    while(true) {
        sum -= onBridge.shift();
        if(sum + truck_weights[0] <= weight) {
            let truck = truck_weights.shift()
            sum += truck
            onBridge.push(truck);
        } else {
            onBridge.push(0);
        }
        answer ++;

        if(truck_weights.length == 0 )
            break;
    }

    while(sum != 0){
        sum -= onBridge.shift()
        answer ++;
    }



    return answer;
}

console.log(solution(2, 10, [7,4,5,6]));