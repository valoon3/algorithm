const [info, edges] = [[0,0,1,1,1,0,1,0,1,0,1,1]	, [[0,1],[1,2],[1,4],[0,8],[8,7],[9,10],[9,11],[4,3],[6,5],[4,6],[8,9]]	];
// result 5
// const [info, edges] = [[0,1,0,1,1,0,1,0,0,1,0]	, [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,8],[6,9],[9,10]]	];
// result 5

class Node {
    constructor(animal) {
        this.animal = animal;
        this.picked = false;
        this.child = [];
    }

    existChild() {
        return this.child.length > 0;
    }
}

class BinaryTree {
    // 0 : 양
    // 1 : 늑대
    constructor(info, edges) {
        this.sheepResult = 0;
        this.nodes = [];
        for(let i = 0; i < info.length; i ++) {
            this.nodes.push(new Node(info[i]));
        }
        edges.forEach(([nodeIndex, childNodeIndex]) => {
            const parentNode = this.nodes[nodeIndex];
            const childNode = this.nodes[childNodeIndex];
            parentNode.child.push(childNode);
        })
    }

    dfs(sheepCount, wolfCount, _needVisited = [this.nodes[0]]) { // [0, 0, [0]]

        // 마지막 노드가 울프이면 뒤로 돌아간다.

    }
}

function solution(info, edges) {
    const binaryTree = new BinaryTree(info, edges);
    binaryTree.dfs(0, 0);
    return binaryTree.sheepResult;
}

console.log(solution(info, edges));