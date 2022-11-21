function solution(rc, operations) {
    let [firstCol, lastCol] = [[], []];
    let rows = [];
    let [rowLength, colLength] = [rc[0].length, rc.length];

    function init(rc) {
        const end = rowLength-1;

        rc.forEach((row) => {
            // col 설정
            firstCol.push(row[0]);
            lastCol.push(row[end]);

            // rows 설정
            rows.push(row.slice(1, end));
        })
    };

    function shiftRow() {
        firstCol.unshift(firstCol.pop());
        lastCol.unshift(lastCol.pop());
        rows.unshift(rows.pop());
    };

    function rotate() {

        rows[0].unshift(firstCol.shift());
        lastCol.unshift(rows[0].pop());
        rows[colLength-1].push(lastCol.pop());
        firstCol.push(rows[colLength-1].shift());
    }

    function getResult() {
        // let result = [];

        rows.forEach((row, idx) => {
            row.unshift(firstCol[idx]);
            row.push(lastCol[idx]);
        });

        return rows;
    }

    init(rc);

    operations.forEach(operation => {
        if(operation === 'Rotate') {
            rotate();
        }
        else if(operation === 'ShiftRow') {
            shiftRow();
        }
    });

    return getResult();
}