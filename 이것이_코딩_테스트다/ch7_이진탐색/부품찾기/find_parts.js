const array = [8,3,7,9,2];
const wants = [5,7,9];

function solution(array, wants) {

    let start = 0;
    let end = array.length-1;

    let binary_search = function(array, target, start, end) {
        let middle = parseInt((start+end)/2);

        if(start > end) {
            return false;
        }

        if(target < array[middle]) {
            end = middle-1;
            return binary_search(array, target, start, end);
        } else if(target > array[middle]) {
            start = middle + 1;
            return binary_search(array, target, start, end);
        } else if(target == array[middle]) {
            return true;
        }
    }

    array.sort((a,b) => a-b);

    wants.forEach(want => console.log(binary_search(array, want, start, end)));

}

solution(array, wants);