// const [n, k, cmd] = [8, 2, ["D 2","C","U 3","C","D 4","C","U 2","Z","Z"]];
// result "OOOOXOOO"

const [n, k, cmd] = [8, 2, ["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"]];
// result "OOXOXOOO"

// class Node {
//     constructor() {
//         // this.index = index;
//         this.prev = null;
//         this.next = null;
//         this.deleted = false;
//     }
//
//     next() {
//         return this.next;
//     }
//
//     prev() {
//         return this.prev;
//     }
//
//     // deleted(bool) {
//     //     this.deleted = bool;
//     // }
// }
//
// class LinkedList {
//     constructor() {
//         this.head = null;
//         this.nowNode = null;
//         this.tail = null;
//         this.deletedStack = [];
//     }
//
//     insert() {
//         const node= new Node();
//         if(!this.head) {
//             this.head = node;
//             this.nowNode = node;
//             this.tail = node;
//         } else {
//             this.tail.next = node;
//             node.prev = this.tail;
//             this.tail = node;
//         }
//     }
//
//     delete() {
//         this.nowNode.deleted = true;
//         this.deletedStack.push(this.nowNode);
//
//         this.down(1);
//     }
//
//     ctrlZ() {
//         const node = this.deletedStack.pop();
//         node.deleted = false;
//     }
//
//     up(number, node = this.nowNode) {
//         if(number === 0) {
//             this.nowNode = node;
//             return true;
//         }
//
//         if(node.prev) {
//             if(node.prev.deleted) return this.up(number, node.prev);
//             else return this.up(number - 1, node.prev)
//         } else {
//             return false;
//         }
//     }
//
//     down(number, node = this.nowNode) {
//         if(number === 0) {
//             this.nowNode = node;
//             return true;
//         }
//
//         if(node.next) {
//             if(node.next.deleted) return this.down(number, node.next);
//             else return this.down(number - 1, node.next);
//         } else {
//             return this.up(1);
//         }
//     }
//
//     print(node = this.head, result = []) {
//         result.push(node.deleted === true ? 'X' : 'O' );
//
//         if(node.next) this.print(node.next, result);
//
//         return result;
//     }
// }
//
// function solution(n, k, cmd) {
//     const linkedList = new LinkedList();
//
//     for(let i = 0; i < n; i++) {
//         linkedList.insert();
//     }
//     linkedList.down(k);
//
//     const orders = cmd.map((command) => command.split(' '));
//
//     orders.forEach((order) => {
//         if(order[0] === 'U') linkedList.up(order[1])
//         else if(order[0] === 'D') linkedList.down(order[1])
//         else if(order[0] === 'C') linkedList.delete()
//         else linkedList.ctrlZ();
//     })
//
//     return linkedList.print().join('');
// }

class Node {
    constructor() {
        this.prev = null;
        this.next = null;
        this.deleted = false;
        this.realNext = null;
    }
}

function solution(n, k, cmd) {
    let root = null;
    let current = null;
    let deletedArr = [];

    // linked list 생성
    for(let i = 0; i < n; i ++) {
        const node = new Node();

        if(!root) {
            root = node;
            current = node;
            continue;
        }

        current.next = node;
        current.realNext = node;
        node.prev = current;
        current = node;
    }

    current = root;

    // 현재 선택으로 이동
    for(let i = 0; i < k; i ++) {
        current = current.next;
    }

    cmd.map(command => command.split(' ')).forEach(order => {
        if(order[0] === 'U') {
            for(let i = 0; i < order[1]; i++) {
                current = current.prev;
            }
        } else if(order[0] === 'D') {
            for(let i = 0; i < order[1]; i++) {
                current = current.next;
            }
        } else if(order[0] === 'C') {
            current.deleted = true;
            deletedArr.push(current);

            const prevNode = current.prev;
            const nextNode = current.next;

            current = nextNode ? nextNode : prevNode;

            if(prevNode) prevNode.next = nextNode;
            if(nextNode) nextNode.prev = prevNode;
        } else {
            const node = deletedArr.pop();
            node.deleted = false;

            if(node.prev) node.prev.next = node;
            if(node.next) node.next.prev = node;
        }
    });

    let result = '';

    while(root) {
        result += root.deleted ? 'X' : 'O';
        root = root.realNext;
    }

    return result;
}

console.log(solution(n, k, cmd));


// 시간복잡도 통과 실패 후 조정
// 해결책 두개
// linked list 비슷하게 구현해서 해결했다.