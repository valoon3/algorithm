package lv3.표_편집;

import java.util.Stack;

class Node {
    Node prev;
    Node next;
    int index;
    boolean isDeleted;

    public Node(int index) {
        this.index = index;
        this.isDeleted = false;
    }
}

class LinkedList {
    Node head;
    Node tail;
    Node current;
    Stack<Node> deletedNodes = new Stack<>();
    int size;

    public LinkedList(int n, int k) {
        // ... 초기화 (head, tail, 각 Node 연결, current 설정)
    }

    public void moveUp(int count) {
        for (int i = 0; i < count; i++) {
            if (current.prev != null) {
                current = current.prev;
            }
        }
    }

    public void moveDown(int count) {
        for (int i = 0; i < count; i++) {
            if (current.next != null) {
                current = current.next;
            }
        }
    }

    public void delete() {
        current.isDeleted = true;
        deletedNodes.push(current);

        Node prevNode = current.prev;
        Node nextNode = current.next;

        if (prevNode != null) {
            prevNode.next = nextNode;
        }
        if (nextNode != null) {
            nextNode.prev = prevNode;
            current = nextNode; // 다음 노드로 커서 이동
        } else if (prevNode != null) {
            current = prevNode; // 마지막 노드 삭제 시 이전 노드로 커서 이동
        }
        size--;
    }

    public void rollback() {
        if (!deletedNodes.isEmpty()) {
            Node restoredNode = deletedNodes.pop();
            restoredNode.isDeleted = false;

            Node prevNode = restoredNode.prev;
            Node nextNode = restoredNode.next;

            if (prevNode != null) {
                prevNode.next = restoredNode;
            }
            if (nextNode != null) {
                nextNode.prev = restoredNode;
            }
        }
    }

    public String getResult(int n) {
        StringBuilder sb = new StringBuilder();
        Node node = head;
        for (int i = 0; i < n; i++) {
            if (node != null && node.isDeleted) {
                sb.append("X");
            } else {
                sb.append("O");
            }
            if (node != null) {
                node = node.next;
            } else {
                sb.append("O"); // 실제 노드 개수보다 n이 큰 경우
            }
        }
        return sb.toString();
    }
}

public class Solution {
    public static String solution(int n, int k, String[] cmd) {
        LinkedList linkedList = new LinkedList(n, k);
        for (String c : cmd) {
            String[] parts = c.split(" ");
            String operation = parts[0];
            switch (operation) {
                case "U":
                    linkedList.moveUp(Integer.parseInt(parts[1]));
                    break;
                case "D":
                    linkedList.moveDown(Integer.parseInt(parts[1]));
                    break;
                case "C":
                    linkedList.delete();
                    break;
                case "Z":
                    linkedList.rollback();
                    break;
            }
        }
        return linkedList.getResult(n);
    }
}