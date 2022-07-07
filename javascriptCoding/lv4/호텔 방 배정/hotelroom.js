const k = 10;
const room_number = [1,3,4,1,3,1];

function solution(k, room_number) {
    let rooms = new Map();
    let answer = [];

    answer = room_number.map((value) => {
        while(rooms.has(value))
            value ++
        rooms.set(value, true);

        return value;
    })

    console.log(answer);
    return answer;
}

solution(k, room_number);