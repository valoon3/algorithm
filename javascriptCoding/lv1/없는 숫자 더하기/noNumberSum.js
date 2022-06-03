function solution(numbers) {
    var answer = 0;
    let setArr = new Set;

    for(let number of numbers) {
        setArr.add(number);
    };

    let number = [...setArr].reduce((previousValue, currentValue) => previousValue + currentValue);
    answer = 45 - number;


    return answer;
}