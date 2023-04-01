// n : 개임 참가자 수

function solution(n,a,b) {
  let answer = 0;

  const check = (a, b) => {
    if(a>b)
      [a, b] = [b, a];

    return Math.floor(a / 2) + 1 === Math.floor(b / 2) && a + 1 === b;
  }

  const tournamentWin = (num) => {
    let winNum = Math.floor(num%2) === 0 ? 0 : 1; // 홀수이면 +1
    winNum += Math.floor(num/2);

    return winNum;
  };

  while(!check(a, b)) {
    a = tournamentWin(a);
    b = tournamentWin(b);
    answer ++;
  }

  return answer+1;
}

console.log(solution(8, 4, 7));