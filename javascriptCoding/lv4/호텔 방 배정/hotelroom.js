const k = 10;
const room_number = [1,3,4,1,3,1]; // result [1,3,4,2,5,6]

function solution(k, room_number) {
    const rooms = new Map;
    let answer = [];

    const findRoom = (roomNumber) => {
        if(!rooms.has(roomNumber)) {
            rooms.set(roomNumber, roomNumber+1);
            return roomNumber;
        }

        const nextRoom = findRoom(rooms.get(roomNumber));
        rooms.set(roomNumber, nextRoom + 1);
        return nextRoom;
    }

    room_number.forEach((roomNumber, index) => {
        const roomN = findRoom(roomNumber);
        answer.push(roomN);
    })

    console.log(answer);

    return answer;
}

solution(k, room_number);