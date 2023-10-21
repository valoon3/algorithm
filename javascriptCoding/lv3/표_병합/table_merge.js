const commands = ["UPDATE 1 1 menu", "UPDATE 1 2 category", "UPDATE 2 1 bibimbap", "UPDATE 2 2 korean", "UPDATE 2 3 rice", "UPDATE 3 1 ramyeon", "UPDATE 3 2 korean", "UPDATE 3 3 noodle", "UPDATE 3 4 instant", "UPDATE 4 1 pasta", "UPDATE 4 2 italian", "UPDATE 4 3 noodle", "MERGE 1 2 1 3", "MERGE 1 3 1 4", "UPDATE korean hansik", "UPDATE 1 3 group", "UNMERGE 1 4", "PRINT 1 3", "PRINT 1 4"]
// result ["EMPTY", "group"]

// const commands = [
//     "UPDATE 1 1 a",
//     "UPDATE 1 2 b",
//     "UPDATE 2 1 c",
//     "UPDATE 2 2 d",
//     "MERGE 1 1 1 2",
//     "MERGE 2 2 2 1",
//     "MERGE 2 1 1 1",
//     "PRINT 1 1",
//     "UNMERGE 2 2",
//     "PRINT 1 1"
// ];
// result ["d", "EMPTY"]

class Cell {
    constructor() {
        this.deleted = false;
        this.value = '';
    }
}

function solution(commands) {
    commands = commands.map(command => command.split(' '));
    let cell = [];
    for(let i = 0; i <= 51; i ++) {
        let row = [];
        for(let j = 0; j <= 51; j ++) {
            row.push([i, j]);
        }
        cell.push(row);
    }
    let cellValue = Array.from({ length : 51}, () => Array.from({length: 51}, () => ''));
    let answer = [];

    const update = (command) => {
        const [_, r, c, value] = command;
        let [row, col] = cell[r][c];

        while(row !== row[r][c][0] || c !== row[r][c][1]) {
            [row, col] = cell[row][col];
        }

        cellValue[row][col] = value;

        if(cellValue[r][c] !== cellValue[row][col]) {
            cellValue[r][c] = value;
            cell[r][c] = [r, c];
        } else {
            cellValue[row][col] = value;
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

        if(cellValue[r1][c1]) {
            const [r, c] = cell[r2][c2];
            const value = cellValue[r1][c1];
            cell[r][c] = cell[r1][c1];
            cellValue[r][c] = value;
        } else {
            const [r, c] = cell[r1][c1];
            const value = cellValue[r2][c2];
            cell[r][c] = cell[r2][c2];
            cellValue[r][c] = value;
        }
    }

    const unmerge = (command) => {
        const [_, r ,c] = command;
        const [row, col] = cell[r][c];
        cellValue[r][c] = cellValue[row][col];
        cellValue[row][col] = '';
        cell[r][c] = [r, c];

        for(let i = 1; i <= 50; i ++) {
            for(let j = 1; j <= 50; j ++) {
                if(cellValue[i][j] === cellValue[row][col]) {
                    cell[i][j] = [r, c];
                }
            }
        }
    }

    const print = (command) => {
        const [_, r, c] = command;
        const [p1, p2] = cell[r][c];
        const value = cellValue[p1][p2];
        if(value === '') answer.push('EMPTY');
        else answer.push(value);
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

console.log(solution(commands));