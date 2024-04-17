const testInput = [
    "Red Alder",
    "Ash",
    "Aspen",
    "Basswood",
    "Ash",
    "Beech",
    "Yellow Birch",
    "Ash",
    'Cherry',
    'Cottonwood',
    'Ash',
    'Cypress',
    'Red Elm',
    'Gum',
    'Hackberry',
    "White Oak",
    'Hickory',
    'Pecan',
    'Hard Maple',
    'White Oak',
    'Soft Maple',
    'Red Oak',
    'Red Oak',
    'White Oak',
    'Poplan',
    'Sassafras',
    'Sycamore',
    'Black Walnut',
    'Willow',
];

function solution(input) {
    const dictionary = new Map(); // <string, int>

    const allCount = input.length;

    for(let name of input) {
        dictionary.has(name) ? dictionary.set(name, dictionary.get(name) + 1) : dictionary.set(name, 1);
    }

    const keys = [...dictionary.keys()].sort();

    keys.forEach(name => {
        const count = dictionary.get(name);
        console.log(`${name} ${Number(count / allCount * 100).toFixed(4)}`);
    })
}

// console.log(solution(testInput));

const input = [];

require('readline')
    .createInterface(process.stdin, process.stdout)
    .on('line', line => {
        input.push(line);
    })
    .on('close', () => {
        solution(input);
        process.exit();
    });