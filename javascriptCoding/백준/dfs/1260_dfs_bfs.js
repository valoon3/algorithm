// const [n,m,v] = [4,5,1];
// const nodes = [[1,2], [1,3], [1,4], [2,4], [3,4]];
const [n,m,v] = [5,5,3];
const nodes = [[5,4], [5,2], [1,2], [3,4], [3,1]];

// n : 노드의 개수
// m : 간선의 개수
// v : 시작 정점의 번호

function solution(n, m, v, nodes) {

  const visited = new Array(n+1).fill(false);
  let dfsAnswer = [];
  let bfsAnswer = [];

  // nodes.forEach(element => {
  //   element.sort((a, b) => a - b);
  // })

  nodes.sort((a,b) => a[1] - b[1]);

  const dfs = (nowNode) => {
    dfsAnswer.push(nowNode);
    visited[nowNode] = true;

    for(let i = 0; i < nodes.length; i ++) {
      if(nodes[i][0] === nowNode) {
        if(visited[nodes[i][1]] === true) {
          continue;
        } else {
          dfs(nodes[i][1]);
        }
      }
    }

  }

  const bfs = (nowNode) => {
    let queue = new Queue();
    queue.push(nowNode);

    while(queue.size != 0) {
      let nowNode = queue.pop();

      if(visited[nowNode] == true) {
        continue;
      }
      bfsAnswer.push(nowNode);
      visited[nowNode] = true;

      for(let i = 0; i < nodes.length; i ++) {
        if(nodes[i][0] == nowNode) {
            queue.push(nodes[i][1]);
        }
      }


    }

  }

  dfs(v);
  console.log(dfsAnswer.join(' '));
  visited.fill(false);
  bfs(v);
  console.log(bfsAnswer.join(' '));
}

class Node {
  constructor(value, back = null) {
    this.back = null; // 다음의 노드가 저장된다.
    this.value = value;
  }
}

class Queue {

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    if(this.first == null) {
      this.first = new Node(value);
      this.last = this.first;
    } else {
      this.last.back = new Node(value, this.last)
      this.last = this.last.back;
    }
    this.size = this.size + 1;
  }

  pop() {
    if(this.size === 0) {
      return undefined;
    }

    const value = this.first.value;

    if(this.first.back !== null)
      this.first = this.first.back;
    else {
      if(this.size === 1) {
        this.first = null;
        this.last = null;
      }
    }

    this.size --;

    return value;
  }

}


solution(n,m,v,nodes);


