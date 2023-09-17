// const files = ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"];
// result ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]

const files = ["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"];
// result ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]

function solution(files) {
    let numberAndTails = {};

    // files.substring(2, files.length - 2).split('", "').forEach((file) => {
    files.forEach((file) => {
        let head = '';
        let number = '';
        let tail = '';

        let type = 'head';

        for(let i = 0; i < file.length; i ++) {
            if(type === 'head' && file[i] === '0') {
                number += file[i]
                continue;
            }

            if(!Number(file[i])) {
                if(number.length !== 0) type = 'tail';

                if(type === 'head') {
                    head += file[i];
                    continue;
                } else {
                    tail += file[i];
                    continue;
                }
            }
            else{
                if(number.length === 5) {
                    tail += file[i];
                    continue;
                } else {
                    number += file[i];
                }
            }
        }

        // 헤드가 오브젝트에 없으면
        if(!Object.keys(numberAndTails).includes(head.toUpperCase())) {
            numberAndTails[head.toUpperCase()] = [{
                head,
                number: number,
                tail,
            }];
        } else {
            numberAndTails[head.toUpperCase()].push({
                head,
                number: number,
                tail
            });
        }
    })

    let keys = Object.keys(numberAndTails);

    keys = keys.sort();
    console.log(numberAndTails);

    keys.forEach(key => {
        numberAndTails[key].sort((a,b) => Number(a.number) - Number(b.number));
    })


    // keys, numberAndTails

    const result = [];

    keys.forEach(key => {
        numberAndTails[key].forEach(all => {
            let fileName = '';
            fileName += all.head;
            fileName += all.number.toString();
            fileName += all.tail;
            result.push(fileName);
        })
    })

    return result;
}

console.log(solution(files));

console.log(isNaN(parseInt(" ")));