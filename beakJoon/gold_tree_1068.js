const input = [];
require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        const [nodeCount, nodes, deleteNode] = filter(input);
        solution(nodeCount, nodes, deleteNode);
        process.exit();
    });

function filter(input) {
    const nodeCount = Number(input[0]);
    const nodes = input[1].split(' ').map(Number);
    const deleteNode = Number(input[2]);
    return [nodeCount, nodes, deleteNode];
}

function solution(nodeCount, nodes, deleteNode) {
    const arr = Array.from({ length : nodeCount }, () => []);
    let root = null;

    nodes.forEach((parent, index) => {
        if(parent === -1) {
            root = index;
            return;
        }

        if(deleteNode !== index) arr[parent].push(index);
    })

    let count = 0;

    const search = (node) => {
        if(node.length === 0) count ++;
        else {
            node.forEach(child => {
                search(arr[child]);
            });
        }
    }

    if(deleteNode === root) console.log(0);
    else {
        search(arr[root]);
        console.log(count);
    }
}