// const files = ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"];
// result ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]

const files = ["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"];
// result ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]



function solution(files) {
    const dictionary = new Map();

    const arr = files.map((file, index) => {
        const reg = /(\D+)(\d+)(.*)/;
        const [_, head, number, tail] = file.match(reg);

        const upperCase = head.toUpperCase();
        return { name: file, head: upperCase, number: Number(number), tail, index };
    })

    return arr.sort((a,b) => {
        if (a.head > b.head) {
            return 1;
        } else if (a.head < b.head) {
            return -1;
        } else {
            return a.number - b.number;
        }
    }).map(file => file.name);

    // console.log(arr);
}

console.log(solution(files));