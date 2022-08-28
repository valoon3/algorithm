/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    let arr = [];
    for(let x of magazine) {
        arr.push(x);
    }
    for(let x of ransomNote) {
        if(arr.includes(x)){
            arr[arr.indexOf(x)] = '1';
        } else {
            return false;
        }
    }
    return true;
};
