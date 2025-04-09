package lv2.서버_증설_횟수

// 이용자 m
// 증설 서버 n
// 증설 서버 운영 시간 k

class Solution {
    fun solution(players: IntArray, m: Int, k: Int): Int {
        var answer: Int = 0

        // 시간별 서버의 동시접속 가능 인원
        var serverAccessUserArr = Array(players.size) { 0 }
        var serverAccessUser = m;

        for((index, playerCount) in players.withIndex()) {
            serverAccessUser += serverAccessUserArr[index]
            if(playerCount < serverAccessUser) continue

            // 증설할 서버량
            var expandServerAmount = (playerCount - serverAccessUser) / m + 1
            answer += expandServerAmount

            serverAccessUser += expandServerAmount * m

            if(index + k < players.size) {
                serverAccessUserArr[index + k] -= expandServerAmount * m
            }
        }

        return answer
    }
}
