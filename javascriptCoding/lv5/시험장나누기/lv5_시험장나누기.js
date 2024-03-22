// const [k, num, links] = [3, [12, 30, 1, 8, 8, 6, 20, 7, 5, 10, 4, 1], [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [8, 5], [2, 10], [3, 0], [6, 1], [11, -1], [7, 4], [-1, -1], [-1, -1]]];
const [k, num, links] = [1, [12, 30, 1, 8, 8, 6, 20, 7, 5, 10, 4, 1], [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [8, 5], [2, 10], [3, 0], [6, 1], [11, -1], [7, 4], [-1, -1], [-1, -1]]];
// result 40
// const [k, num, links] = [1, [6, 9, 7, 5], [[-1, -1], [-1, -1], [-1, 0], [2, 1]]];
// result 27
// const [k, num, links] = [2, [6, 9, 7, 5], [[-1, -1], [-1, -1], [-1, 0], [2, 1]]];
//  result 14
// const [k, num, links] = [4, [6, 9, 7, 5], [[-1, -1], [-1, -1], [-1, 0], [2, 1]]	];
// result 9

class Node {
    constructor(name, value) {
        this.name = name; // number
        this.value = value; // number
        this.parent = null; // node
        this.left = null; // node
        this.right = null; // node
    }
}

class BinaryTree {
    constructor(num, links) {
        this.root = null;
        this.size = 0;
        this.selected = new Array(num.length).fill(false); // <boolean>

        this.map = new Array(num.length).fill(null); // <node>

        num.forEach((v, i) => {
            this.map[i] = new Node(i, v);
            this.size ++;
        })

        links.forEach(([left, right], i) => {
            const node = this.map[i];
            const leftNode = left !== -1 ? this.map[left] : null;
            const rightNode = right !== -1 ? this.map[right] : null;

            if(leftNode) {
                node.left = leftNode
                leftNode.parent = node;
            }

            if(rightNode) {
                node.right = rightNode;
                rightNode.parent = node;
            }
        })

        this.root = this.map[0];

        while(this.root.parent) {
            this.root = this.root.parent;
        }

        this.preSetting(this.root);
    }

    preSetting(node) {
        if(node.left) {
            this.preSetting(node.left);
        }
        if(node.right) {
            this.preSetting(node.right);
        }
        this.sumChild(node);
    }

    sumChild(node) {
        if(node.left) node.value += node.left.value;
        if(node.right) node.value += node.right.value;
        return node.value;
    }

    result(k) {
        if (k === 1) return this.root.value;


    }

    addSelect(k) {
        if(k === 0) return;
        let node = this.root;

        while(!this.selected[node.name]) {
            if(node.left && !this.selected[node.left.name]) {
                node = node.left;
            } else if(node.right && !this.selected[node.right.name]) {
                node = node.right;
            }
        }

        this.selected[node.name] = true;
        this.addSelect(k-1);
    }





}

function solution(k, num, links) {
    const tree = new BinaryTree(num, links);
    return tree.result(k);

}

solution(k, num, links);