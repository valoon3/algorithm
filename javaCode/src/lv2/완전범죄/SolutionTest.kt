package lv2.완전범죄

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class SolutionTest {
    private val solution = Solution()

    @Test
    fun testSolution1() {
        val info = arrayOf(
            intArrayOf(1, 2),
            intArrayOf(2, 3),
            intArrayOf(2, 1)
        )
        val n = 4
        val m = 4
        assertEquals(2, solution.solution(info, n, m))
    }

    @Test
    fun testSolution2() {
        val info = arrayOf(
            intArrayOf(1, 2),
            intArrayOf(2, 3),
            intArrayOf(2, 1)
        )
        val n = 1
        val m = 7
        assertEquals(0, solution.solution(info, n, m))
    }

    @Test
    fun testSolution3() {
        val info = arrayOf(
            intArrayOf(3, 3),
            intArrayOf(3, 3)
        )
        val n = 7
        val m = 1
        assertEquals(6, solution.solution(info, n, m))
    }

    @Test
    fun testSolution4() {
        val info = arrayOf(
            intArrayOf(3, 3),
            intArrayOf(3, 3),
        )
        val n = 6
        val m = 1
        assertEquals(-1, solution.solution(info, n, m))
    }


}