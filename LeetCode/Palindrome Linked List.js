/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

// const head = [1,2,2,1];
const head = [1,2];

var isPalindrome = function(head) {
    let arr = [];
    while(head){
        arr.push(head.val);
        head = head.next
    }
    // console.log(arr);

    while(arr.length > 1) {
        if(arr.pop() != arr.shift())
            return false;
    }
    return true;
};

console.log(isPalindrome(head));