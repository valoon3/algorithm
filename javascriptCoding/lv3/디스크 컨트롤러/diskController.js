
const jobs = [[0, 3], [1, 9], [2, 6]]; // return 9

// [작업이 요청되는 시점, 작업의 소요시간]

function solution(jobs) {

    let result = 0;
    let jobCount = jobs.length;
    let workspace = [];
    let sec = 0;

    // jobs.sort((a,b) => a[0]-b[0]);

    workspace.push(jobs.shift());

    while(jobs.length != 0 || workspace.length !== 0) {

        if(workspace.length != 0 && workspace[0]) {
            let work = workspace.shift();

            result += work[1] - work[0] + sec; // 요청부터 종료까지의

            if(work[0] > sec) {
                sec = work[1];
            } else {
                sec += work[1];
            }
        }

        while(jobs.length != 0 && jobs[0][0] <= sec) {
            workspace.push(jobs.shift());
        }
        if(workspace.length == 0) {
            workspace.push(jobs.shift());
        }


        workspace.sort((a,b) => a[1]-b[1]);
    }

    return result / jobCount;
}

function solution2(jobs) {
    let j = 0;
    let time = 0;
    let sum = 0;
    let priorityQueue = []
    jobs.sort((a,b)=>a[0]-b[0])

    while(jobs.length>j || priorityQueue.length !==0){
        if(jobs.length>j && time >= jobs[j][0]){
            priorityQueue.push(jobs[j++]);
            priorityQueue.sort((a,b)=>{
                return a[1]- b[1]
            })
            continue
        }
        if(priorityQueue.length !== 0 ){
            time += priorityQueue[0][1];
            sum += time - priorityQueue[0][0]

            priorityQueue.shift()
        } else{
            time = jobs[j][0]
        }

    }

    return Math.floor(sum/jobs.length);
};

console.log(solution(jobs));
