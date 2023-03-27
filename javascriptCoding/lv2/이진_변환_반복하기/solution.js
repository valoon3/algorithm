// const s = '0111010';
// const s = "110010101001";
// const s = "01110";
const s = "1111111";

function solution(s) {
  const deleteZero = (s) => {
    let result = '';

    for(let i = 0; i < s.length; i ++) {
      if(s[i] != 0) {
        result += 1;
      } else {
        zeroNum ++;
      }
    }

    return result;
  }

  const translate = (s) => {
    const length = s.length;

    return length.toString(2);
  }

  let zeroNum = 0;
  let runningTime = 0;
  while(s != 1) {
    let deletedZeroNum = deleteZero(s);
    let translatedNum = translate(deletedZeroNum);
    s = translatedNum;

    runningTime ++;
  }

  return [runningTime, zeroNum];
}

console.log(solution(s));