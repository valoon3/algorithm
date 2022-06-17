const k = 10;
const room_number = [1,3,4,1,3,1];

function solution(k, room_number) {
    let rooms = new Set();
    let answer = [];

    answer = room_number.map((value) => {
        while(rooms.has(value))
            value ++
        rooms.add(value);

        return value;
    })


    return answer;
}

solution(k, room_number);