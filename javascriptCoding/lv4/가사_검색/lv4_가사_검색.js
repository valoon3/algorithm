const [words, queries] = [["frodo", "front", "frost", "frozen", "frame", "kakao"], ["fro??", "????o", "fr???", "fro???", "pro?"]];
// result = [3, 2, 4, 1, 0]

class Node {
    constructor() {
        this.next = new Map(); // <string, Node>
        this.childCount = 0;
    }
}

class Dictionary {
    constructor() {
        this.map = new Map();
    }

    addWord(word) {
        if(!this.map.has(word.length)) {
            const headNode = new Node();
            const tailNode = new Node();
            this.map.set(word.length, [headNode, tailNode]);
        }

        let [headNode, tailNode] = this.map.get(word.length);

        for(let i = 0; i < word.length; i ++) {
            const alphabet = word[i];
            headNode = this.addAlphabet(headNode, alphabet);
        }

        for(let i = word.length - 1; i >= 0; i --) {
            const alphabet = word[i];
            tailNode = this.addAlphabet(tailNode, alphabet);
        }
    }

    addAlphabet(node, alphabet) {
        node.childCount++;
        // alphabet이 존재하면 childCount만 증가시키고 반환
        if(node.next.has(alphabet)) {
            return node.next.get(alphabet);
        } else {
            const newNode = new Node();
            node.next.set(alphabet, newNode);
            return newNode;
        }
    }

    search(word) {
        if(!this.map.has(word.length)) return 0;

        if(word[0] !== '?') {
            let [frontNode, _] = this.map.get(word.length);

            for(let i = 0; i < word.length; i ++) {
                const alphabet = word[i];
                if(alphabet === '?') return frontNode.childCount;
                else if(!frontNode.next.has(alphabet)) return 0;
                else frontNode = frontNode.next.get(alphabet);
            }
        } else {
            let [_, backNode] = this.map.get(word.length);

            for(let i = word.length - 1; i > 0; i --) {
                const alphabet = word[i];
                if(alphabet === '?') return backNode.childCount;
                else if(!backNode.next.has(alphabet)) return 0;
                else backNode = backNode.next.get(alphabet);
            }
        }
    }


}

function solution(words, queries) {
    const dictionary = new Dictionary();
    words.forEach(word => dictionary.addWord(word));

    console.log(dictionary);

    return queries.map(query => dictionary.search(query));
}

console.log(solution(words, queries));