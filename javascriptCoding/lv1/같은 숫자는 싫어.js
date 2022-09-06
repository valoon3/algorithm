const [arr1, arr2] = [[1,1,3,3,0,1,1], [4,4,4,3,3]];

function solution(arr)
{
    let result = [];
    result.push(arr.shift());

    arr.forEach(num => {
        if(result[result.length-1] !== num) {
            result.push(num)
        }
    })

    return result;
}

solution(arr1);
