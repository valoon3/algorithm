// const commands = ["UPDATE 1 1 menu", "UPDATE 1 2 category", "UPDATE 2 1 bibimbap", "UPDATE 2 2 korean", "UPDATE 2 3 rice", "UPDATE 3 1 ramyeon", "UPDATE 3 2 korean", "UPDATE 3 3 noodle", "UPDATE 3 4 instant", "UPDATE 4 1 pasta", "UPDATE 4 2 italian", "UPDATE 4 3 noodle", "MERGE 1 2 1 3", "MERGE 1 3 1 4", "UPDATE korean hansik", "UPDATE 1 3 group", "UNMERGE 1 4", "PRINT 1 3", "PRINT 1 4"]
// result ["EMPTY", "group"]

const commands = [
    "UPDATE 1 1 a",
    "UPDATE 1 2 b",
    "UPDATE 2 1 c",
    "UPDATE 2 2 d",
    "MERGE 1 1 1 2",
    "MERGE 2 2 2 1",
    "MERGE 2 1 1 1",
    "PRINT 1 1",
    "UNMERGE 2 2",
    "PRINT 1 1"
];
// result ["d", "EMPTY"]

function solution(commands) {
    commands = commands.map(command => command.split(' '));
    let cell = [];
    for(let i = 0; i <= 51; i ++) {
        let row = [];
        for(let j = 0; j <= 51; j ++) {
            row.push({ parent: [], child: [], point: [i, j] });
        }
        cell.push(row);
    }
    let cellValue = Array.from({ length : 51}, () => Array.from({length: 51}, () => ''));
    let answer = [];
    const map = new Map();

    const findRootCell = (r, c) => {
        let cellPointer = cell[r][c];

        while(cellPointer.parent.length) {
            const [pr, pc] = cellPointer.parent[0];
            cellPointer = cell[pr][pc];
        }

        return cellPointer;
    }

    const update = (command) => {
        const [_, r, c, value] = command;

        // 참조하고 있는 좌표
        let rootCell = findRootCell(r, c);

        const [rootR, rootC] = rootCell.point;
        cellValue[rootR][rootC] = value;

        if(map.has(value)) {
            const cellArray = map.get(value);
        }
    }

    const replace = (command) => {
        const [_, value1, value2] = command;
        for(let i = 1; i <= 50; i ++) {
            for(let j = 1; j <= 50; j ++) {
                if(cellValue[i][j] === value1) cellValue[i][j] = value2;
            }
        }
    }

    const merge = (command) => {
        const [_, r1, c1, r2, c2] = command;
        if(r1 === r2 && c1 === c2) return;

        let p1 = findRootCell(r1, c1);

        let value = cellValue[p1.point[0]][p1.point[1]];
        if(value) {
            cell[r1][c1].child.push([r2, c2]);
            cell[r2][c2].parent.push([r1, c1]);
        } else {
            cell[r2][c2].child.push([r1, c1]);
            cell[r1][c1].parent.push([r2, c2]);
        }

        // if(cellValue[p1.point[0]][p1.point[1]]) {
        //     let p2 = cell[r2][c2];
        //     cellValue[p2.point[0]][p2.point[1]] = '';
        //     p2.parent.push(p1.point);
        //     p1.child.push(p2.point);
        // } else {
        //     let p2 = findRootCell(r2, c2);
        //     cellValue[p1.point[0]][p1.point[1]] = '';
        //     p1.parent.push(p2.point);
        //     p2.child.push(p1.point);
        // }
    }

    const unmerge = (command) => {
        const [_, r ,c] = command;
        let rootCell = findRootCell(r, c);
        let value = cellValue[rootCell.point[0]][rootCell.point[1]];

        deleteChildConnect(rootCell);
        cellValue[r][c] = value;
    }

    function deleteChildConnect(parentCell) {
        parentCell.parent = [];
        while(parentCell.child.length) {
            const [cr, cc] = parentCell.child.pop();
            const childCell = cell[cr][cc];
            deleteChildConnect(childCell);
        }
    }

    const print = (command) => {
        const [_, r, c] = command;
        let rootCell = findRootCell(r, c);
        let [pr, pc] = rootCell.point;

        cellValue[pr][pc] ? answer.push(cellValue[pr][pc]) : answer.push('EMPTY');
    }

    commands.forEach(command => {
        switch (command[0]) {
            case 'UPDATE':
                if(command.length === 3) replace(command);
                else update(command);
                break;
            case 'MERGE':
                merge(command);
                break;
            case 'UNMERGE':
                unmerge(command);
                break;
            case 'PRINT':
                print(command);
                break;
            default:
                break;
        }
    })

    return answer;
}

function solution2(commands) {
    const answer = [];
    const table = new Array(51).fill().map(_ => new Array(51).fill());
    for (let i = 0; i < 51; i++) {
        for (let j = 0; j < 51; j++) {
            table[i][j] = [0, 'EMPTY'];
        }
    }
    let groupNum = 1;
    for (const command of commands) {
        const [com, ...rest] = command.split(' ');
        if (com === 'UPDATE') {
            if (rest.length === 3) {
                const [r, c, value] = rest;
                updateOne(r * 1, c * 1, value, table);
            }
            else {
                const [value1, value2] = rest;
                updateAll(value1, value2, table);
            }
        }
        else if (com === 'MERGE') {
            groupNum = merge(rest, groupNum, table) ?  groupNum + 1 : groupNum;
        }
        else if (com === 'UNMERGE') {
            const [r, c] = rest.map(Number);
            const [group, temp] = table[r][c];
            unMerge(group * 1, table);
            table[r][c][1] = temp;
        }
        else {
            const [r, c] = rest.map(Number);
            answer.push(table[r][c][1]);
        }
    }
    return answer;
}
function updateOne(r, c, value, table) {
    const group = table[r][c][0] * 1;
    table[r][c][1] = value;
    if (group !== 0) {
        for (let i = 1; i < 51; i++) {
            for (let j = 1; j < 51; j++) {
                if (table[i][j][0] === group) {
                    table[i][j][1] = value;
                }
            }
        }
    }
}
function updateAll(value1, value2, table) {
    for (let i = 1; i < 51; i++) {
        for (let j = 1; j < 51; j++) {
            if (table[i][j][1] === value1) {
                table[i][j][1] = value2;
            }
        }
    }
}
function merge(rest, group, table) {
    const [r1, c1, r2, c2] = rest.map(Number);
    const [g1, v1] = table[r1][c1];
    const [g2, v2] = table[r2][c2];
    let value = 'EMPTY';
    if (g1 !== 0 && g2 !== 0 && g1 === g2) {
        return false;
    }
    if (v1 === 'EMPTY' && v2 !== 'EMPTY') {
        value = v2;
    }
    else {
        value = v1;
    }
    table[r1][c1] = [group, value];
    table[r2][c2] = [group, value];

    for (let i = 1; i < 51; i++) {
        for (let j = 1; j < 51; j++) {
            if ((g1 !== 0 && table[i][j][0] === g1) || (g2 !== 0 && table[i][j][0] === g2) ) {
                table[i][j] = [group, value];
            }
        }
    }
    return true;
}
function unMerge(group, table) {
    if (group === 0) {
        return;
    }

    for (let i = 1; i < 51; i++) {
        for (let j = 1; j < 51; j++) {
            if (table[i][j][0] === group) {
                table[i][j] = [0, 'EMPTY'];
            }
        }
    }
}


console.log(solution(commands));