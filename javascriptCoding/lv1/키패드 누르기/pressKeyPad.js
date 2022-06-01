let keyPad = {
    '1': [0, 0],
    '2': [0, 1],
    '3': [0, 2],
    '4': [1, 0],
    '5': [1, 1],
    '6': [1, 2],
    '7': [2, 0],
    '8': [2, 1],
    '9': [2, 2],
    '*': [3, 0],
    '0': [3, 1],
    '#': [3, 2],
};
keyPad.__proto__.cal = function(num1, num2)  {
    return Math.abs(this[num1][0] - this[num2][0]) + Math.abs(this[num1][1] - this[num2][1]);
}


class Finger {
    left = '*';
    right = '#';
    mainHand = '';
    constructor(hand) {
        this.mainHand = hand;
    };
    pressLeft(number) {
        this.left = number.toString();

        return 'L';
    };
    pressRight(number) {
        this.right = number.toString();

        return 'R';
    };
    pressMain(number) {
        return this.mainHand == 'right' ? this.pressRight(number) : this.pressLeft(number);
    }
    get left() {
        return this.left;
    }
    get right() {
        return this.right;
    }

}

function solution(numbers, hand) {
    var answer = '';

    const finger = new Finger(hand);

    for(let number of numbers) {
        if (number == '1' || number == '4' || number == '7'){
            answer += finger.pressLeft(number);
        }
        else if (number == '3' || number == '6' || number == '9') {
            answer += finger.pressRight(number);
        }
        else {
            if(keyPad.cal(number, finger.right) > keyPad.cal(number, finger.left)) {
                answer += finger.pressLeft(number);
            }
            else if(keyPad.cal(number, finger.right) < keyPad.cal(number, finger.left)) {
                answer += finger.pressRight(number);
            }
            else {
                answer += finger.pressMain(number);
            }
        }
    }

    return answer;
}

console.log(solution(	[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"));