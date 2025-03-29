package lv2.귤_고르기;

import java.util.*;

class Solution {
    public int solution(int k, int[] tangerine) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int t : tangerine) {
            counts.put(t, counts.getOrDefault(t, 0) + 1);
        }

        List<Integer> frequencyList = new ArrayList<>(counts.values());
        frequencyList.sort(Collections.reverseOrder());

        int count = 0;
        int totalTangerines = 0;
        for (int frequency : frequencyList) {
            totalTangerines += frequency;
            count++;
            if (totalTangerines >= k) {
                break;
            }
        }

        return count;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        // 테스트 케이스 1
        int k1 = 6;
        int[] tangerine1 = {1, 3, 2, 5, 4, 5, 2, 3};
        System.out.println("Test Case 1: " + sol.solution(k1, tangerine1)); // 예상 결과: 3

        // 테스트 케이스 2
        int k2 = 4;
        int[] tangerine2 = {1, 3, 2, 5, 4, 5, 2, 3};
        System.out.println("Test Case 2: " + sol.solution(k2, tangerine2)); // 예상 결과: 2

        // 테스트 케이스 3
        int k3 = 2;
        int[] tangerine3 = {1, 1, 1, 1, 2, 2, 2, 3};
        System.out.println("Test Case 3: " + sol.solution(k3, tangerine3)); // 예상 결과: 1
    }
}