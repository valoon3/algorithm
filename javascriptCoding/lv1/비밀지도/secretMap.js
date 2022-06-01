const n = 6;
const arr1 = [46, 33, 33 ,22, 31, 50];
const arr2 = [27 ,56, 19, 14, 14, 10];

const resolve = (arr) => {
    return arr.map((value) => value.toString(2));
}

const getMap = (arr1, arr2) => {
    return arr1.map((value, index) => {
        return (Number(value) + Number(arr2[index])).toString();
    })

};



function solution(n, arr1, arr2) {
    var answer = [];
    const map = getMap(resolve(arr1), resolve(arr2));
    answer = map.map((numbers) => {
        let temp = '';
        if(numbers.length < n)
            for(let i = 0; i < n - numbers.length; i ++)
                temp += ' ';
        for(let c of numbers)
            temp += c == false ? " " : '#';


        return temp;
    })
    return answer;
}



console.log(getMap(resolve(arr1), resolve(arr2)));
console.log(solution(n, arr1, arr2));
console.log(["######", "###  #", "##  ##", " #### ", " #####", "### # "]);