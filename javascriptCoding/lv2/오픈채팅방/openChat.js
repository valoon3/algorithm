// const record = ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"];
//
// function sCutter(s) {
//     return s.map((value) => value.split(' '));
// }
//
// class User{
//     constructor(arr) {
//         this.action = arr[0];
//         this.id = arr[1];
//         this.nickname = arr[2];
//     }
// }
//
//
// function solution(record) {
//     let arr = sCutter(record);
//
//     let actions = arr.map((arr) => new User(arr));
//     let result = [];
//
//     for(let action of actions) {
//         if(action.action == 'Enter'){
//             result.forEach(value => {
//                 if(value.id == action.id)
//                     value.nickname = action.nickname;
//             })
//             result.push(action);
//         }
//         else if(action.action == 'Change'){
//             result.forEach(value => {
//                 if(value.id == action.id)
//                     value.nickname = action.nickname;
//             })
//         }
//         else if(action.action == 'Leave'){
//             result.forEach(value => {
//                 if(value.id == action.id)
//                     return action.nickname = value.nickname;
//
//             });
//             result.push(action);
//         }
//     }
//     return result.map((user) => {
//         if(user.action == 'Enter')
//             return `${user.nickname}님이 들어왔습니다.`;
//         else
//             return `${user.nickname}님이 나갔습니다.`;
//     });
// }
//
// console.log(solution(record));
//
//

function solution(record) {
    const userInfo = {};
    const action = [];
    const stateMapping = {
        'Enter': '님이 들어왔습니다.',
        'Leave': '님이 나갔습니다.'
    }

    record.forEach((v) => {
        const [state, id, nick] = v.split(' ');

        if(state !== "Change") {
            action.push([state, id]);
        }

        if(nick) {
            userInfo[id] = nick;
        }
    })

    return action.map(([state, uid]) => {
        return `${userInfo[uid]}${stateMapping[state]}`;
    })
}