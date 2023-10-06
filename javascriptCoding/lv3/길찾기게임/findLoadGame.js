const roadinfo = [[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]];
// result [[7,4,6,9,1,8,5,2,3],[9,6,5,8,1,4,3,2,7]]

class Node {
    constructor(data) {
        this.x = data[0];
        this.y = data[1];
        this.nodeName = data[2];
        this.parentNode = null;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // point : [x, y, name]
    insert(node, parentNode) {
        if(this.root === null) {
            this.root = node;
            return;
        }
        if(parentNode === null || parentNode === undefined) parentNode = this.root;

        if(node.x < parentNode.x) {
            if(parentNode.left === null) {
                parentNode.left = node;
            } else {
                this.insert(node, parentNode.left);
            }
        } else if(node.x > parentNode.x) {
            if(parentNode.right === null) {
                parentNode.right = node;
            } else {
                this.insert(node, parentNode.right);
            }
        }
    }

    printPreorder(node = this.root, result = []) {
        result.push(node.nodeName);
        if(node.left !== null) this.printPreorder(node.left, result);
        if(node.right !== null) this.printPreorder(node.right, result);

        return result;
    }

    printPostorder(node = this.root, result = []) {
        if(node.left !== null) {
            this.printPostorder(node.left, result);
        }
        if(node.right !== null) {
            this.printPostorder(node.right, result);
        }
        result.push(node.nodeName);

        return result;
    }
}

function solution(roadinfo) {

    const makeBinaryTree = (roadInfo) => {
        const binaryTree = [];
        roadInfo.forEach((v, i) => v.push(i + 1));

        roadInfo.sort((a,b) => {
            if(a[1] === b[1]) {
                return a[0] - b[0];
            }
            return b[1] - a[1];
        })

        let rootNode = null;
        let parentNodes = [];
    }

    makeBinaryTree(roadinfo);

    const binaryTree = new BinaryTree();
    roadinfo.forEach(([x, y, nodeName]) => {
        binaryTree.insert(new Node([x, y, nodeName]));
    })

    return [binaryTree.printPreorder(), binaryTree.printPostorder()];
}

console.log(solution(roadinfo));