const fs = require('fs');
const [min,max] = fs.readFileSync("./dev/stdin").toString().trim().split(' ').map(Number)

//===== false는 제곱 ㄴㄴ 수
let nono = new Array(max-min+1).fill(false);
let answer = max-min+1;  //min~max까지 개수

//===== 소수 찾기

// max 제곱근 구하기
const sqrt_max = Math.floor(Math.sqrt(max));

// 2부터 max의 제곱근까지 소수찾기
let prime = new Array(sqrt_max+1).fill(true) //true면 소수
const temp_sqrt =  Math.ceil(Math.sqrt(sqrt_max));
prime[0] = false;
prime[1] = false;
for(let i =2; i<=temp_sqrt; i++){
    if(!prime[i])continue;
    let flag = true;
    for(let j = 2; j<i; j++){
        if(i%j==0){
            flag = false;
            break;
        }
    }
    if(flag){
        for(let k = i+i; k<=sqrt_max; k+=i){
            prime[k]=false
        }
    }
}

//=== 소수*소수 배열
const prime_list = [];

prime.forEach((v,i)=>{
    if(v){
        prime_list.push(i*i)
    }
})



prime_list.forEach(v=>{

    let start_min = min;  //시작위치 찾기
    if(start_min % v != 0){ // min이 시작위치가 아니면
        start_min = (Math.floor(min/v)+1)*v;  //min보다 큰 새로운 시작위치를 찾는다
    }
    // 시작위치부터 제곱수만큼 더해 나가면서 지워준다. (에라토스테네스의 채)
    for(let i = start_min; i<=max; i+=v){
        if(!nono[i-min]){
            nono[i-min] = true;
            answer--;      // 제곱수인거 지우기
        }
    }
})

console.log(answer);