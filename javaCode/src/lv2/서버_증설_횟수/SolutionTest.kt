package lv2.서버_증설_횟수

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class SolutionTest {
    private val solution = Solution()

    @Test
    fun testSolution() {
        assertEquals(7, solution.solution(intArrayOf(0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10, 0, 1, 5), 3, 5))
        assertEquals(11, solution.solution(intArrayOf(0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0, 8, 0, 0, 0), 5, 1))
        assertEquals(12, solution.solution(intArrayOf(0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1), 1, 1))
    }
 }