const readline = require("readline");

class BeakReadLine {

    async readLine() {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            let input = [];

            rl.on('line', line => {
                input = line.split(' ').map(el => parseInt(el));
                rl.close();
                resolve(input);
            })
        });
    }

    async readManyRow(rowCount) {
        return new Promise(async (resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            let input = [];

            let i = 0;
            rl.on('line', line => {
                input.push(parseInt(line));
                i ++;
                if(i >= rowCount) {
                    rl.close();
                    resolve(input);
                }
            });
        });
    }

}

async function solution() {
    let rl = new BeakReadLine();

    // let temp = await rl.readLine();
    let temp = await rl.readManyRow(3);
    console.log(temp);
}

solution();