package lv2.완전범죄

// A도둑이 훔치면 info[i][0]개의 A에 대한 흔적을 남깁니다.
// B도둑이 훔치면 info[i][1]개의 B에 대한 흔적을 남깁니다.
// 흔적은 1~3
// 잡히는 경우 A: n개, B: m개 이상
// info: 흔적
class Solution {
    fun solution(info: Array<IntArray>, n: Int, m: Int): Int {
        val dp = Array(info.size + 1) { Array(m + 1) { Int.MAX_VALUE } }

        fun thievery(aCount: Int = 0, bCount: Int = 0, index: Int = 0): Int {
            if (aCount >= n || bCount >= m) return -1

            if (index == info.size) {
                dp[index][bCount] = Math.min(dp[index][bCount], aCount)
                return aCount
            }

            if (dp[index][bCount] < aCount) return dp[index][bCount]

            val result = ArrayList<Int>()

            val chooseBValue = thievery(aCount, bCount + info[index][1], index + 1)
            if(chooseBValue != -1) result.add(chooseBValue)

            val chooseAValue = thievery(aCount + info[index][0], bCount, index + 1)
            if(chooseAValue != -1) result.add(chooseAValue)

            dp[index][bCount] = result.minOrNull() ?: -1
            return dp[index][bCount]
        }

        thievery()

        return dp[0].filter { it != Int.MAX_VALUE || it != -1 }.minOrNull() ?: -1
    }


}