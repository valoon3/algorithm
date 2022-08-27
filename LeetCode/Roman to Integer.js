// I             1 -
// V             5
// X             10 -
// L             50
// C             100 -
// D             500
// M             1000
// 900(CM) 90(XC) 9(IX) 400(CD) 40(XL) 4(IV)

// const s = "III"
// const s = "LVIII"
const s = "MCMXCIV"


var romanToInt = function(s) {
    let result = 0;
    let stack = [];
    for(let c in s) {
        stack.push(changeString(s[c]));
    }

    while(stack.length != 0) {
        let temp = stack.shift();
        if(temp >= stack[0])
            result += temp;
        else if(stack.length == 0) {
            result += temp;
        }
        else {
            result += (stack.shift() - temp);
        }


    }

    return result;


    function changeString(c) {
        switch (c) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
        }
    }
};

romanToInt(s);