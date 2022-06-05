// 바스켓의 마지막 요소 두개 검색해서 같으면 점수 리턴
const score = (basket) => {
    if(basket.length > 1 && basket[basket.length - 1] == basket[basket.length - 2]){
        basket.pop();
        basket.pop();

        return 2;
    }
    else
        return 0;
}

// 인형 꺼내기
const selectRow = (arrays, col) => {
    for(let arr of arrays) {
        if(arr[col-1] != 0){
            let dollNumber = [...arr][col-1];
            arr[col-1] = 0;
            return dollNumber;
        }
    };
    return 0;
}

function solution(board, moves) {
    var answer = 0;
    let basket = [];

    moves.forEach((move) => {
        let dolNumber = selectRow(board, move);
        if(dolNumber != 0)
            basket.push(dolNumber);
        answer += score(basket);
    })

    return answer;
}

console.log(solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]));