// const [user_id, banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "abc1**"]];
const [user_id, banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"], ["*rodo", "*rodo", "******"]];
// const [user_id, banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "*rodo", "******", "******"]];

function solution(user_id, banned_id) {
  let answer = 0;
  const nodes = [];
  const bannResult = new Set();

  const checkBanId = (banId, userId) => {
    if(banId.length !== userId.length) // 길이가 다르면 다른 아이디이므로 false
      return false;

    for(let i = 0; i < banId.length; i ++) {
      if(banId[i] !== '*' && banId[i] !== userId[i])
        return false;
    }

    return true;
  }

  const bannedIdList = (banId, user_id) => {
    let result = [];

    user_id.forEach(id => {
      if(checkBanId(banId, id)) {
        result.push(id);
      }
    });

    return result;
  }

  const dfs = (index = 0, arr = []) => {

    if(index === banned_id.length) {
      bannResult.add(arr.sort().join(','));
      arr.pop();
    } else {
      for(let i = 0; banned_id.length; i ++) {
        if(arr.includes(nodes[index][i])){
          continue;
        }
        arr.push(nodes[index][i]);
        dfs(index + 1, arr);
      }

    }

    return arr;
  }



  banned_id.forEach(banId => {
    nodes.push(bannedIdList(banId, user_id));
  })

  console.log(nodes);

  dfs();


  return answer;
}

solution(user_id, banned_id);