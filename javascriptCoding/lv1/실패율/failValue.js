class Stage {
    stage = 0;
    success = 0;
    challenger = 0;
    failure = 0;

    constructor(stage) {
        this.stage = stage;
    }

    // set success(num) {
    //     this.success = num;
    // }
    //
    get success() {
        console.log('get success call');
        return this.success;
    }
    //
    // set challenger(num) {
    //     this.challenger = num;
    // }
    // get challenger() {
    //     return this.challenger;
    // }
    //
    // set failure(num) {
    //     this.failure = num;
    // }
    // get failure() {
    //     return (this.challenger - this.success) / this.challenger;
    // }

    setFailure = () => {
        if(this.challenger == 0)
            this.failure = 0;
        this.failure = (this.challenger - this.success) / this.challenger;
    }

}


function solution(N, stages) {
    var answer = [];
    const arrObject = [];

    for(let i = 0; i < N + 1; i ++) {
        arrObject[i] = new Stage(i + 1);
    }

    for(let stage of stages) {
        for(let i = 0; i < stage; i ++) {
            arrObject[i].challenger ++;
            if(i + 1 != stage)
                arrObject[i].success ++;
        }
    }
    arrObject.pop();
    answer = arrObject.map((x) => {
        x.setFailure();
        return x;
    });

    answer.sort((a, b) => {
        if (a.failure > b.failure) {
            return -1;
        }
        if (a.failure < b.failure) {
            return 1;
        }
        // a must be equal to b
        return 0;
    })

    answer = answer.map(x => {
        return x.stage;
    })

    return answer;
}

solution(5, [2, 1, 2, 6, 2, 4, 3, 3]	);