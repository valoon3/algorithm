/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let list = [];
    let temp = head;
    while(head) {
        list.push(head.val);
        head = head.next;
    }

    let i = 0;
    while(i < parseInt(list.length/2)) {
        temp = temp.next;
        i++;
    }
    console.log(temp);

    return temp;

};